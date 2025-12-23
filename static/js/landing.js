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

 if (response.ok) {
  clearInterval(pollTimer);
  warmMsg.textContent = "Server ready. You can start using the tool.";
  startBtn.textContent = "Ready";
  startBtn.disabled = true;
}

});
