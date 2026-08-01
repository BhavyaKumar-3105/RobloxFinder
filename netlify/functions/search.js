exports.handler = async (event, context) => {
  const query = event.queryStringParameters?.q;

  if (!query) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Query parameter 'q' is required" }),
    };
  }

  try {
    // Official Roblox discovery search endpoint
    const robloxUrl = `https://games.roblox.com/v1/games/list?model.keyword=${encodeURIComponent(query)}&model.maxRows=10`;

    const response = await fetch(robloxUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
    });

    // Fallback response handling
    if (!response.ok) {
      console.error("Roblox returned status:", response.status);
      return {
        statusCode: response.status,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: `Roblox API HTTP ${response.status}` }),
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
    console.error("Serverless execution error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to query Roblox API", details: error.message }),
    };
  }
};