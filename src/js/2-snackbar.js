import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  createPromise(delay, state)
    .then(delayValue => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delayValue}ms`,
        position: 'topRight',
      });
    })
    .catch(delayValue => {
      iziToast.error({
        message: `❌ Rejected promise in ${delayValue}ms`,
        position: 'topRight',
      });
    });

  form.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
