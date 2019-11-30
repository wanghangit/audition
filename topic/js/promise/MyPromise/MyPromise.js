const { warn, nextId, PROMISE_ID } = require("./util")

const PENDING = void 0;
const FULFFILLED = 1;
const REJECTED = 2;

class MyPromise{
  /**
   * 传入function构造promise
   * @param {*} resolver 
   */
  constructor(resolver){
    this[PROMISE_ID] = nextId()
    this._result = this._state = undefined
    this._subscribers = []
    typeof resolver !== 'function' && warn("MyPromise arguments must be a function")
    this instanceof MyPromise ? init(this, resolver) : warn("must use new create MyPromise")
  }
  init(promise, resolver){
    try {
      resolver(function resolvePromise(value){
        resolve(promise, value)
      },function rejectPromise(reason){
        reject(promise, reason)
      })
    } catch (error) {
      reject(error)
    }
  }
}

/**
 * 私有的resolve触发fulffill状态的方法
 * @param {*} promise 
 * @param {*} value 
 */
function resolve(promise, value){
  let then
  if(objectOrFunction(value)){
    // TODO
    try {
      then = value.then      
    } catch (error) {
      reject(error)
    }
  }else{
    fulffill(promise, value)
  }
}

/**
 * 私有的reject触发reject状态的方法
 * @param {*} promise 
 * @param {*} reason 
 */
function reject(promise, reason){

}

/**
 * 执行订阅事件的方法
 * @param {*} promise 
 */
function publish(promise){
  let { _subscribers, _state } = promise
  if(_subscribers.length === 0) return
  let child, callback, detail = promise._result
  for (let i = 0; i < _subscribers.length; i+=3) {
    child = _subscribers[i]
    callback = _subscribers[i+_state]
    if(child){
      invokeCallback(_state, child, callback, detail)
    }else{
      callback(detail)
    }
  }
  promise._subscribers.length = 0;
}

function fulffill(promise, value){
  /**状态更改是不可逆的 */
  if(promise._state !== PENDING){
    return
  }
  promise._result = value
  promise._state = FULFFILLED
  if(promise._subscribers.length!==0){
    async(publish, value)
  }
}

function invokeCallback(state, child, callback, detail){

}
console.log(new MyPromise(11))