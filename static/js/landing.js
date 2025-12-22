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

  // Wake backend (fire-and-forget)
  fetch(`${BACKEND_URL}/health`, { mode: "no-cors" }).catch(() => {});

  // Redirect explicitly to tool UI
  setTimeout(() => {
    window.location.href = `${BACKEND_URL}/`;
  }, 6000);
});
