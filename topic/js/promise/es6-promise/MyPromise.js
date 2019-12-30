const { warn, nextId, PROMISE_ID, noop, isFunction } = require("./util")

/**promise的三种状态 */
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
    this instanceof MyPromise ? this.init(this, resolver) : warn("must use new create MyPromise")
  }
  /**
   * 同步执行promise初始化代码
   * @param {*} promise 
   * @param {*} resolver 
   */
  init(promise, resolver){
    try {
      /**同步调用并注入resolve和reject参数 */
      resolver(function resolvePromise(value){
        resolve(promise, value)
      },function rejectPromise(reason){
        reject(promise, reason)
      })
    } catch (error) {
      reject(error)
    }
  }
  then(onResolve, onReject){
    const child = new MyPromise(noop)
    if(this._state){
      const callback = arguments[this._state - 1]
      async(() => {
        invokeCallback(this._state, child, callback, this._result)
      })
    }else{
      subscribe(this, child, onResolve, onReject)
    }
    return child
  }
}

/**
 * 私有的resolve触发fulffill状态的方法
 * @param {*} promise 
 * @param {*} value 
 */
function resolve(promise, value){
  let then
  if(promise === value){
    warn("return value not equal self")
    return
  }
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

function objectOrFunction(){
  return false
}

/**
 * 私有的reject触发reject状态的方法
 * @param {*} promise 
 * @param {*} reason 
 */
function reject(promise, reason){
  if(promise._state !== PENDING) return
  promise._state = REJECTED
  promise._result = reason
  async(publishRejection, promise)
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

function publishRejection(promise){
  if(promise._onerror){
    promise._onerror(promise._result)
  }
  publish(promise)
}
/**基于成功的回调修改状态并且修改状态和成功的值 */
function fulffill(promise, value){
  /**状态更改是不可逆的 */
  if(promise._state !== PENDING){
    return
  }
  promise._result = value
  promise._state = FULFFILLED
  /**如果有订阅函数则执行异步方法触发 */
  if(promise._subscribers.length!==0){
    async(publish, promise)
  }
}

/**
 * 执行callback函数
 * @param {*} state 
 * @param {*} promise 
 * @param {*} callback 
 * @param {*} detail 
 */
function invokeCallback(state, promise, callback, detail){
  let hasCallback = isFunction(callback), value, error, successed = true;
  if(hasCallback){
    try {
      value = callback(detail)
    } catch (e) {
      error = e
      successed = false
    }
    if(promise === value){
      reject(promise, "promise not return self")
      return
    }
  }else {
    value = detail
  }
  if(promise._state !== PENDING){

  }else if(hasCallback && successed){
    resolve(promise, value)
  }else if(!successed){
    reject(promise, error)
  }else if(state === FULFFILLED){
    fulffill(promise, value)
  }else if(state === REJECTED){
    reject(promise, value)
  }

}

function subscribe(parent, child, onResolve, onReject){
  let { _subscribers } = parent,
      { length } = _subscribers
  parent._onerror = null
  _subscribers[length] = child
  _subscribers[length+1] = onResolve
  _subscribers[length+2] = onReject
  if(length===0 && parent._state){
    async(publish, parent)
  }
}
/**异步处理部分 */
/**用来存放异步任务的队列 */
const queue = new Array(1000)
let len = 0, scheduleFlush;
const isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';
const BrowserMutationObserver = typeof window !== 'undefined' && window.MutationObserver
const isWorker = typeof MessageChannel !== 'undefined'

/**
 * 用队列控制每多一个异步方法就往队列里推入
 * @param {*} callback 
 * @param {*} promise 
 */
function async(callback, promise){
  queue[len] = callback
  queue[len+1] = promise
  len+=2
  if(len === 2){
    scheduleFlush()
  }
}

/**在node环境使用的异步事件 */
function useNextTick(){
  return () => process.nextTick(flush)
}

function useMutationObserver(){
  let i = 0
  const observer = new MutationObserver(flush)
  const node = document.createTextNode('')
  observer.observe(node, {characterData: true})

  return () => {
    node.data = (i = ++i % 2)
  }
}

function useMessageChannel(){
  const channel = new MessageChannel()
  channel.port1.onmessage = flush
  return () => {
    channel.port2.postMessage(0)
  }
}

function useSetTimeout(){
  return () => setTimeout(flush, 0)
}

function flush(){
  for (let i = 0; i < len; i+=2) {
    const callback = queue[i]
    const arg = queue[i+1]
    callback(arg)
    queue[i] = undefined
    queue[i+1] = undefined
  }
  len = 0
}

/**针对不同的环境不同的异步处理方法，优先使用微任务 */
if(isNode){
  scheduleFlush = useNextTick()
}else if(BrowserMutationObserver){
  scheduleFlush = useMutationObserver()
}else if(isWorker){
  scheduleFlush = useMessageChannel()
}else{
  scheduleFlush = useSetTimeout()
}

module.exports = MyPromise

