/*************************************************
 * Single City Weather Tool – Landing Script
 * Purpose: Handle Render backend cold start
 *
 * 🔴 ONLY CHANGE THIS VALUE AFTER DEPLOYMENT
 *************************************************/

// 👉 REPLACE THIS WITH YOUR RENDER BACKEND URL
// Example:
// const BACKEND_URL = "https://single-city-weather-backend.onrender.com";

const BACKEND_URL = "https://single-city-weather-backend-1.onrender.com";

/*************************************************
 * DO NOT EDIT BELOW THIS LINE
 *************************************************/

const HEALTH_URL = `${BACKEND_URL}/health`;
const TARGET_URL = `${BACKEND_URL}/`;

const startBtn = document.getElementById("startBtn");
const warmMsg = document.getElementById("warmMsg");

let polling = false;
let attempts = 0;
let pollTimer = null;

const CHECK_INTERVAL_MS = 2500;   // 2.5 seconds
const MAX_ATTEMPTS = 200;         // ~8 minutes

function startPolling() {
  polling = true;
  attempts = 0;

  startBtn.textContent = "Starting…";
  startBtn.disabled = true;
  warmMsg.textContent = "Waking the analysis engine…";

  checkHealth();
  pollTimer = setInterval(checkHealth, CHECK_INTERVAL_MS);
}

function resetUI() {
  polling = false;
  startBtn.textContent = "Start";
  startBtn.disabled = false;
}

function checkHealth() {
  attempts++;

  fetch(HEALTH_URL, { method: "GET", cache: "no-store" })
    .then(response => {
      if (response.ok) {
        clearInterval(pollTimer);
        warmMsg.textContent = "Server ready — redirecting…";

        setTimeout(() => {
          window.location.href = TARGET_URL;
        }, 600);
      }
    })
    .catch(() => {
      if (attempts >= MAX_ATTEMPTS) {
        clearInterval(pollTimer);
        warmMsg.textContent =
          "Server is still starting. Please click Start to try again.";
        resetUI();
      }
    });
}

// Button click handler
startBtn.addEventListener("click", () => {
  if (!polling) {
    startPolling();
  }
});

// Auto-redirect if backend is already awake
fetch(HEALTH_URL, { method: "GET", cache: "no-store" })
  .then(response => {
    if (response.ok) {
      window.location.href = TARGET_URL;
    }
  })
  .catch(() => {
    // Backend likely sleeping — ignore
  });
