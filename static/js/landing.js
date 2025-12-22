/*************************************************
 * Single City Weather Tool – Landing Script
 * Reliable Render Free Version
 *************************************************/

const BACKEND_URL = "https://single-city-weather-backend-1.onrender.com";

const startBtn = document.getElementById("startBtn");
const warmMsg = document.getElementById("warmMsg");

let started = false;

startBtn.addEventListener("click", () => {
  if (started) return;
  started = true;

  startBtn.textContent = "Starting…";
  startBtn.disabled = true;
  warmMsg.textContent = "Waking the analysis engine…";

  // Fire-and-forget request to wake backend
  fetch(`${BACKEND_URL}/health`, { mode: "no-cors" }).catch(() => {});

  // Redirect after fixed delay (most reliable on Render Free)
  setTimeout(() => {
    window.location.href = BACKEND_URL;
  }, 6000); // 6 seconds is enough to wake Render
});
