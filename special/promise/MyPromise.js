const { reject } = require("./MyPromise2");

const Pending = "Pending";
const Fulfilled = "Fulfilled";
const Rejected = "Rejected";

function MyPromise(callback) {
  var that = this
  this.status = Pending;
  this.value = null;
  this.reason = null;
  this.fulfilledCallbackList = [];
  this.rejectCallbackList = [];
  try {
    callback(resolve, reject);
  } catch (error) {
    this.reason = error;
    reject(error);
  }
  function resolve(value) {
    if (that.status === Pending) {
      that.status = Fulfilled;
      that.value = value;
      that.fulfilledCallbackList.forEach((callback) => {
        callback(that.value);
      });
    }
  }
  function reject(reason) {
    if (that.status === Pending) {
      that.status = Rejected;
      that.reason = reason;
      that.rejectCallbackList.forEach((callback) => {
        callback(that.reason);
      });
    }
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError("return same promise"));
  }
  if (x === null) {
    resolve(x);
  }
  if (x instanceof MyPromise) {
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject);
    }, reject);
  } else if (typeof x === "object" || typeof x === "function") {
    try {
      var then = x.then;
    } catch (error) {
      reject(error);
    }

    if (typeof then === "function") {
      var called = false;
      try {
        then.call(
          x,
          function (y) {
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } catch (error) {
        if (called) return;
        reject(error);
      }
    } else {
      resolve(x);
    }
  } else {
    resolve(x);
  }
}

/**
 * 先校验类型如果不是函数onFulfilled直接返回原值onRejected抛出相同的原因
 * @param {*} onFulfilled
 * @param {*} onRejected
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var that = this
  var realOnFulfilled = onFulfilled;
  if (typeof realOnFulfilled !== "function") {
    realOnFulfilled = function(value){
      return value;
    };
  }
  var realOnRejected = onRejected;
  if (typeof realOnRejected !== "function") {
    realOnRejected = function(reason) {
      if (reason instanceof Error) {
        throw reason;
      } else {
        throw new Error(reason);
      }
    };
  }
  if (that.status === Fulfilled) {
    var promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onFulfilled !== "function") {
            resolve(that.value);
          } else {
            var x = realOnFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
    return promise2;
  } else if (that.status === Rejected) {
    var promise2 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (typeof onRejected !== "function") {
            reject(that.reason);
          } else {
            var x = realOnRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error);
        }
      }, 0);
    });
    return promise2;
  } else {
    var promise2 = new MyPromise((resolve, reject) => {
      that.fulfilledCallbackList.push(() => {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(that.value);
            } else {
              var x = realOnFulfilled(that.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
      that.rejectCallbackList.push(() => {
        setTimeout(() => {
          try {
            if (typeof onRejected !== "function") {
              reject(that.reason);
            } else {
              var x = realOnRejected(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0);
      });
    });
    return promise2;
  }
};

MyPromise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected)
};

MyPromise.deferred = function () {
  var result = {};
  result.promise = new MyPromise(function (resolve, reject) {
    result.resolve = resolve;
    result.reject = reject;
  });
  return result;
};

MyPromise.resolve = function (parameter) {
  if (parameter instanceof MyPromise) {
    return parameter;
  }

  return new MyPromise(function (resolve) {
    resolve(parameter);
  });
}

MyPromise.reject = function (reason) {
  return new MyPromise(function (resolve, reject) {
    reject(reason);
  });
}

module.exports = MyPromise;

var promise1 = new MyPromise((resolve, reject) => {
  throw new Error("212")
  resolve(11);
});
var promise2 = new MyPromise((resolve, reject) => {
  reject("error");
});
promise1.catch((err) => {
  console.log(err);
}).then((v) => {
  console.log(v)
});

// promise2.then(
//   (v) => {
//     console.log(v);
//   },
//   (err) => {
//     console.log(err);
//   }
// );
