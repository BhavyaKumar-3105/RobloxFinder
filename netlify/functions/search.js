export async function handler(event, context) {
  const query = event.queryStringParameters?.q;

  if (!query) {
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Query parameter 'q' is required" }),
    };
  }

  try {
    // apis.roblox.com/search-api/omni-search is the live endpoint Roblox's own
    // site uses for game search. Routed through RoProxy since Netlify's
    // datacenter IPs get rate-limited (429) hitting Roblox directly.
    const robloxUrl = `https://apis.roproxy.com/search-api/omni-search?searchQuery=${encodeURIComponent(query)}&pageType=all`;

    const response = await fetch(robloxUrl, {
      method: "GET",
      headers: { "Accept": "application/json" },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Roblox API Error [${response.status}]:`, errorText);
      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: `Roblox API responded with status ${response.status}`,
          details: errorText,
        }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Serverless execution exception:", error);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        error: "Failed to connect to Roblox API via proxy",
        message: error.message,
      }),
    };
  }
}