const PENDING = 0;
const RESLOVED = 1;
const REJECTED = 2;

/**
 * 初始化一个promise
 * @param {Function} fnc
 */
function MyPromise(fnc) {
  if (typeof fnc !== "function") {
    console.warn(`param is not a function`);
    return;
  }
  this.result = null; // 存贮promise执行后的结果
  this.status = PENDING; // 存贮promise的状态
  this.resloveCallback = []; // 存贮reslove的回调方法
  this.rejectCallback = []; // 存贮reject的回调方法
  initPromise(this, fnc); // 执行传入的方法
}

/**
 * 由于需要对传入的函数传递2个参数，同时又要保留对this实例的引用，放在原型链中就暴露了方法
 * 放在内联函数中每个实例化又增加了内存占用，故采用这种传参数的方式，传递this引用
 * @param {*} promise
 * @param {*} fnc
 */
function initPromise(promise, fnc) {
  try {
    fnc(
      function reslovePromise(value) {
        reslove(promise, value);
      },
      function rejectPromise(reason) {
        reject(promise, reason);
      }
    );
  } catch (error) {
    reject(promise, error);
  }
}

/**
 * 进入reslove状态也就是成功状态时的方法,
 * 用户手动调用，并执行then中添加的callback方法
 * @param {*} promise
 * @param {*} value
 */
function reslove(promise, value) {
  if (promise.status !== PENDING) {
    return;
  }
  // 维护状态和结果
  promise.status = RESLOVED;
  promise.result = value;
  // 执行回调
  promise.resloveCallback.forEach(fnc => {
    fnc(value);
  });
}

/**
 * 进入reject状态也就是失败状态时的方法
 * @param {*} promise
 * @param {*} reason
 */
function reject(promise, reason) {
  if (promise.status !== PENDING) {
    return;
  }
  promise.status = REJECTED;
  promise.result = reason;
  promise.rejectCallback.forEach(fnc => {
    fnc(value);
  });
}

MyPromise.prototype.then = function(onResolve, onReject) {
  const { status, result } = this
  const self = this
  let x,promise2

  // then中传入的必须是函数，如果不是需要我们纠正为默认方法
  // 比如promise.then().then().then((v) => console.log(v))
  // 我们在then中不去传入函数需要将promise决议的值向后传递
  onResolve = typeof onResolve === 'function' ? onResolve : function(value){return value}
  onReject = typeof onReject === 'function' ? onReject : function(reason){return reason}
  // 根据不同的状态进入不同的处理
  if(status === PENDING){
    // 如果当前promise还没被决议，直接将then中的两个方法放入队列，等代决议后执行
    return promise2 = new MyPromise(function(reslove, reject){
      self.resloveCallback.push(function(value){
        try {
          x = onResolve(value)
          if(x instanceof MyPromise){
            x.then(reslove, reject)
          }
        } catch (error) {
          reject(error)
        }
      })
      self.rejectCallback.push(function(reason){
        try {
          x = onReject(reason)
          if(x instanceof MyPromise){
            x.then(reslove, reject)
          }
        } catch (error) {
          reject(error)
        }
      })
    })
    
  }else if(status === RESLOVED){
    // 如果状态已经被决议，那么直接返回并执行then中的方法
    return promise2 = new MyPromise(function(reslove, reject){
      try {
        x = onResolve(result)
        // 如果返回了一个新的Promise，直接取这个promise的结果
        if(x instanceof MyPromise){
          x.then(reslove, reject)
        }
        reslove(x)
      } catch (error) {
        reject(error)
      }
    })
  }else{
    return promise2 = new MyPromise(function(reslove, reject){
      try {
        x = onReject(result)
        if(x instanceof MyPromise){
          x.then(reslove, reject)
        }
      } catch (error) {
        reject(error)
      }
    })
  }
};

MyPromise.prototype.catch = function(onReject){
  return this.then(null, onReject)
}
