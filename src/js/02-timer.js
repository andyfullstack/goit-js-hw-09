import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import Notiflix from 'notiflix';

const startButton = document.querySelector('button[data-start]');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');

startButton.disabled = true;
let targetTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      startButton.disabled = true;
      Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
      targetTime = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

startButton.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startButton.disabled = true;
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = targetTime - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      return;
    }
    const { days, hours, minutes, seconds } = convertToMsec(deltaTime);

    const formatTimeDays = addZero(days);
    const formatTimeHours = addZero(hours);
    const formatTimeMinutes = addZero(minutes);
    const formatTimeSeconds = addZero(seconds);

    timerDays.textContent = formatTimeDays;
    timerHours.textContent = formatTimeHours;
    timerMinutes.textContent = formatTimeMinutes;
    timerSeconds.textContent = formatTimeSeconds;
  }, 1000);
}

function convertToMsec(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return value.toString().padStart(2, '0');
}
