let idTimer = 0;
const stopButton = document.querySelector('button[data-stop]');
const startButton = document.querySelector('button[data-start]');
const body = document.body;

function btnOnStartClick(e) {
  e.target.disabled = true;
  idTimer = setInterval(() => {
    body.style.backgroundColor = goRandomHexColor();
  }, 1500);
}

function btnOnStopClick() {
  startButton.disabled = false;
  clearInterval(idTimer);
}

function goRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', btnOnStartClick);
stopButton.addEventListener('click', btnOnStopClick);

// =========================================
