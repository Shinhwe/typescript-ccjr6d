const createCancellablePromise = async <T>(
  promise: Promise<T>,
  cancelToken?: () => boolean,
  timeout = 0
) => {
  let _cancelToken =
    typeof cancelToken === 'function' ? cancelToken : () => false;
  const _createCancellablePromise = promise.then((resp) => {
    if (_cancelToken() === true) {
      return Promise.reject(new Error('Canceled'));
    }
    return Promise.resolve(resp);
  });
  if (timeout > 0) {
    let timer = null;
    const _timeoutPromise = new Promise((_, reject) => {
      timer = setTimeout(() => {
        reject(new Error('Timeout'));
      }, timeout);
    });
    return Promise.race([_timeoutPromise, _createCancellablePromise])
      .catch((error) => {
        if (error.message === 'Timeout') {
          _cancelToken = () => true;
        }
        return Promise.reject(error);
      })
      .finally(() => {
        clearTimeout(timer);
      });
  } else {
    return _createCancellablePromise;
  }
};

export default createCancellablePromise;
