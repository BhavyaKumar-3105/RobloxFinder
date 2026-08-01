export async function handler(event) {
  const query = event.queryStringParameters.q || '';

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Search query parameter "q" is required.' }),
    };
  }

  try {
    const robloxRes = await fetch(
      `https://games.roblox.com/v1/games/list?keyword=${encodeURIComponent(query)}`
    );

    if (!robloxRes.ok) {
      throw new Error(`Roblox API responded with status ${robloxRes.status}`);
    }

    const data = await robloxRes.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}