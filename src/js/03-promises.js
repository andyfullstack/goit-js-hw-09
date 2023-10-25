import Notiflix from 'notiflix';

function makethePromise(position, delay) {
  return new Promise((resolve, reject) => {
    const isResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (isResolve) {
       
        resolve({ position, delay });
      } else {
        
        reject({ position, delay });
      }
    }, delay);
  });
}

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', evt => {
  evt.preventDefault();
  const firstDelay = parseInt(evt.target.elements.delay.value);
  const stepDelay = parseInt(evt.target.elements.step.value);
  const total = parseInt(evt.target.elements.amount.value);

  for (let i = 0; i < total; i++) {
    const currentDelay = firstDelay + i * stepDelay;
    makethePromise(i + 1, currentDelay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});
