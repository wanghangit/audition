const PENDING = "PENDING";
const FULFILLED = "FULFILLED";
const REJECTED = "REJECTED";
const isFunction = (fn) => typeof fn === "function";
const isPromise = (p) => p instanceof MyPromise;
const isObject = (o) => typeof o === "object" && o !== null;
const isTherable = (p) => (isObject(p) || isFunction(p)) && p.then;

function MyPromise(callback) {
  const self = this;
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  this.fulfilledCallbacks = [];
  this.rejectedCallBack = [];
  function resolve(value) {
    if (self.state !== PENDING) return;
    self.state = FULFILLED;
    self.value = value;
    self.fulfilledCallbacks.forEach((fn) => {
      fn(self.value);
    });
  }
  function reject(reason) {
    if (self.state !== PENDING) return;
    self.state = REJECTED;
    self.reason = reason;
    self.rejectedCallBack.forEach((fn) => {
      fn(self.reason);
    });
  }

  try {
    callback(resolve, reject);
  } catch (error) {
    this.reason = error;
    reject(error);
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let onFulfilledisFunc = isFunction(onFulfilled);
  let onRejectedisFunc = isFunction(onRejected);
  if (!onFulfilledisFunc) {
    onFulfilled = (value) => value;
  }
  if (!onRejectedisFunc) {
    onRejected = (reason) => {
      throw reason;
    };
  }
  const self = this;
  var promise = new MyPromise((resove, reject) => {
    if (self.state === PENDING) {
      self.fulfilledCallbacks.push(() => {
        runWithTimeoutAndTry(() => {
          var x = onFulfilled(self.value);
          resolvePromise(promise, x, resove, reject);
        }, reject);
      });
      self.rejectedCallBack.push(() => {
        runWithTimeoutAndTry(() => {
          var x = onRejected(self.reason);
          resolvePromise(promise, x, resove, reject);
        }, reject);
      });
    } else if (self.state === FULFILLED) {
      runWithTimeoutAndTry(() => {
        var x = onFulfilled(self.value);
        resolvePromise(promise, x, resove, reject);
      }, reject);
    } else {
      runWithTimeoutAndTry(() => {
        var x = onRejected(self.reason);
        resolvePromise(promise, x, resove, reject);
      }, reject);
    }
  });
  return promise;
};

MyPromise.prototype.catch = function (fn) {
  return this.then(null, fn);
};

MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value;
  } else {
    return new MyPromise(function (resolve) {
      resolve(value);
    });
  }
};

MyPromise.reject = function (err) {
  return new MyPromise(function (resolve, reject) {
    reject(err);
  });
};

MyPromise.prototype.all = function (list) {
  var promise = new MyPromise(function (resolve, reject) {
    var count = list.length;
    var num = 0;
    var result = [];
    if (count === 0) {
      resolve(result);
      return;
    }
    list.forEach((p, i) => {
      MyPromise.resolve(p).then(
        (value) => {
          num++;
          result[i] = value;
          if (num === count) {
            resolve(result);
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

MyPromise.prototype.race = function (list) {
  return new MyPromise((resolve, reject) => {
    var count = list.length;
    if (count === 0) {
      resolve();
      return;
    }
    list.forEach((p) => {
      MyPromise.resolve(p).then(
        (value) => {
          resolve(value);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
};

MyPromise.prototype.allSettled = function (list) {
  return new MyPromise((resove, reject) => {
    var count = list.length;
    var result = [];
    var num = 0;
    if (count === 0) {
      return resove(result);
    }
    list.forEach((p, i) => {
      MyPromise.resolve(p).then(
        (value) => {
          num++;
          result[i] = {
            status: "fulilled",
            value: value,
          };
          if (num === count) {
            resove(result);
          }
        },
        (err) => {
          num++;
          result[i] = {
            state: "rejected",
            reason: err,
          };
          if (num === count) {
            resove(result);
          }
        }
      );
    });
  });
};

MyPromise.prototype.finally = function (fn) {
  return this.then(
    (value) => {
      return MyPromise.resolve(fn()).then(() => {
        return value;
      });
    },
    (err) => {
      return MyPromise.resolve(fn()).then(() => {
        return err;
      });
    }
  );
};

function resolvePromise(promise, result, resolve, reject) {
  if (promise === result) {
    const reason = new TypeError("same promise");
    return reject(reason);
  }
  if (isPromise(result)) {
    return result.then(function (y) {
      resolvePromise(promise, y, resolve, reject);
    });
  } else if (result === null) {
    return resolve(null);
  } else if (isTherable(result)) {
    try {
      var then = result.then;
      if (isFunction(then)) {
        let called = false;
        then.call(
          result,
          function (y) {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function (err) {
            if (called) return;
            called = true;
            reject(err);
          }
        );
      } else {
        resolve(result);
      }
    } catch (error) {
      if (called) return;
      reject(error);
    }
  } else {
    resolve(result);
  }
}

function runWithTimeoutAndTry(fn, reject) {
  setTimeout(() => {
    try {
      fn();
    } catch (error) {
      reject(error);
    }
  }, 0);
}

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

module.exports = MyPromise;
