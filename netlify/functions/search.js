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
    // Route through RoProxy to bypass datacenter IP rate-limits (429)
    const robloxUrl = `https://games.roproxy.com/v1/games/list?keyword=${encodeURIComponent(query)}&maxRows=20`;

    const response = await fetch(robloxUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`RoProxy API Error [${response.status}]:`, errorText);

      return {
        statusCode: response.status,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          error: `Roblox proxy responded with status ${response.status}`,
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