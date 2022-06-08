const PENDING = 'PENDING';
const FULFILLED = 'FULLILLED';
const REJECTED = 'REJECTED';

class MyPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = null;
        this.error = null;
        this.fulfillCallbacks = [];
        this.rejectCallbacks = [];
        try {
            executor(this.resolve, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise((resolve, reject) => {
            resolve(value);
        })
    }
    static reject(error) {
        return new MyPromise((resolve, reject) => {
            reject(error);
        })
    }
    resolve = (value) => {
        if (this.status === PENDING) {
            this.status = FULFILLED;
            this.value = value;
            this.fulfillCallbacks.forEach(callback => callback(value));
        }
    }
    reject = (error) => {
        if (this.status === PENDING) {
            this.status = REJECTED;
            this.error = error;
            this.rejectCallbacks.forEach(callback => callback(error));
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error };
        const promise2 = new MyPromise((resolve, reject) => {
            if (this.status === FULFILLED) {
                // 必须要在微任务或宏任务中执行
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }

                })
            } else if (this.status === REJECTED) {
                queueMicrotask(() => {
                    try {
                        const x = onRejected(this.error)
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                })
            } else {
                this.fulfillCallbacks.push((value) => {
                    queueMicrotask(() => {
                        try {
                            const x = onFulfilled(value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    })
                });
                this.rejectCallbacks.push((error) => {
                    queueMicrotask(() => {
                        try {
                            const x = onRejected(error);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error);
                        }
                    })
                });
            }
        })
        return promise2;
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('Chaining cycle detected for promise'))
    }
    if (typeof x === 'object' || typeof x === 'function') {
        if (x === null) {
            return reslove(x);
        }
        let then;
        try {
            then = x.then;
        } catch (error) {
            reject(error);
        }
        if(typeof then === 'function') {
            let called = false;
            try {
                then.call(x, y => {
                    if(called) {return}
                    called = true;
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if(called) {return}
                    called = true;
                    reject(r)
                })
            } catch (error) {
                if (called) return;
                reject(error)
            }
      
        }else{
            resolve(x);
        }

    } else {
        resolve(x);
    }
    // if (x instanceof MyPromise) {
    //     x.then(resolve, reject)
    // } else {
    //     resolve(x);
    // }
}


MyPromise.deferred = function () {
    var result = {};
    result.promise = new MyPromise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    })
    return result;
}
module.exports = MyPromise;