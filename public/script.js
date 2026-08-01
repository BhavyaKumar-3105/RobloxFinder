const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const gamesGrid = document.getElementById('gamesGrid');
const statusMessage = document.getElementById('statusMessage');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') performSearch();
});

async function performSearch() {
  const query = searchInput.value.trim();
  if (!query) return;

  gamesGrid.innerHTML = '';
  statusMessage.textContent = 'Searching Roblox games...';

  try {
    const response = await fetch(`/.netlify/functions/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to fetch results');

    const data = await response.json();
    const games = data.games || data.data || [];

    statusMessage.textContent = '';

    if (games.length === 0) {
      statusMessage.textContent = 'No games found. Try a different keyword.';
      return;
    }

    games.forEach((game) => {
      const card = document.createElement('div');
      card.className = 'game-card';

      const playerCount = game.playerCount ?? game.placeVisits ?? 0;
      const gameName = game.name || game.title || 'Untitled Game';
      const placeId = game.placeId || game.rootPlaceId;

      card.innerHTML = `
        <div>
          <div class="game-title">${escapeHtml(gameName)}</div>
          <div class="game-meta">👥 Players: ${playerCount.toLocaleString()}</div>
        </div>
        ${
          placeId
            ? `<a href="https://www.roblox.com/games/${placeId}" target="_blank" class="play-link">View on Roblox ↗</a>`
            : ''
        }
      `;

      gamesGrid.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    statusMessage.textContent = 'Error loading games. Please try again.';
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}