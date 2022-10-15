// const isCancel = true;
// new Promise<void>((resolve, reject) => {
//   resolve();
// })
//   .then(() => {
//     console.log(123);
//     return Promise.resolve();
//   })
//   .then(() => {
//     console.log(456);
//     if (isCancel) {
//       return Promise.reject(new Error('Canceled'));
//     } else {
//       return Promise.reject(new Error('Error'));
//     }
//   })
//   .then(() => {
//     console.log(789);
//   })
//   .catch((error) => {
//     if (error.message !== 'Canceled') {
//       return Promise.reject(error);
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

import createCancellablePromise from './CancellablePromise';

let isCancel = false;

createCancellablePromise(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(456);
    }, 3 * 1000);
  }),
  () => isCancel,
  5 * 1000
)
  .then((resp) => {
    console.log('resp', resp);
  })
  .catch((error) => {
    console.error(error);
  });

setTimeout(() => {
  isCancel = true;
}, 6 * 1000);
