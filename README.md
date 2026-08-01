# 🎮 Roblox Game Explorer

A simple, responsive web application that allows users to search for Roblox games using the official public Roblox API. Built with plain HTML, CSS, and JavaScript, and deployed using Netlify Serverless Functions to handle API requests safely without CORS issues.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)

---

## ✨ Features

* **Instant Game Search**: Find Roblox games by entering keywords (e.g., *Obby*, *Tycoon*, *Simulator*).
* **Serverless Proxy**: Uses a Netlify Function (`search.js`) to bypass browser CORS restrictions and fetch data directly from Roblox.
* **Public API Integration**: No API keys or authentication required.
* **Clean Dark-Themed UI**: Built with custom, modern CSS.
* **Direct Links**: Click on any game card to go directly to its official Roblox place page.

---

## 📁 Project Structure

```text
RobloxFinder/
├── netlify/
│   └── functions/
│       └── search.js      # Serverless function acting as CORS proxy to Roblox API
├── public/
│   ├── index.html         # Frontend user interface
│   ├── script.js          # Client-side JavaScript handling search & UI rendering
│   └── style.css          # App styling (Dark Theme)
├── .gitignore             # Excluded files for version control
├── package.json           # Node configuration & scripts
└── README.md              # Project documentation
🛠️ How It Works
User Request: The user enters a search term in the frontend (public/index.html).

Serverless Function Call: script.js sends a request to /.netlify/functions/search?q=KEYWORD.

Roblox API Call: The Netlify serverless function (netlify/functions/search.js) fetches public search results from https://games.roblox.com/v1/games/list.

Data Display: The function returns the raw JSON back to the frontend, which dynamically populates game cards on the page.

🚀 Local Development
To run this project locally with Netlify serverless function support:

Clone the repository:

Bash
git clone [https://github.com/BhavyaKumar-3105/RobloxFinder.git](https://github.com/BhavyaKumar-3105/RobloxFinder.git)
cd RobloxFinder
Install Netlify CLI globally (if not already installed):

Bash
npm install -g netlify-cli
Start the local development server:

Bash
netlify dev
Open your browser and navigate to http://localhost:8888.

🌐 Deployment
This app is designed to be seamlessly deployed on Netlify:

Link your GitHub repository to Netlify.

Set the following build configurations:

Publish directory: public

Build command: (Leave blank)

Click Deploy Site. Netlify automatically detects and sets up the serverless function in netlify/functions/.
