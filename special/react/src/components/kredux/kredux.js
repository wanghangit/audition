/**
 * 
 * @param {*} reducer 
 * @param {*} enhancer 增强器用来增强功能提供插件功能 
 */
export function createStore(reducer, enhancer) {
  if(enhancer && typeof enhancer === 'function'){
    return enhancer(createStore)(reducer)
  }
  let currentState = undefined;
  let listeners = []

  function getState() {
    return currentState
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)
    listeners.map(cb => cb())
  }

  function subscribe(fn) {
    listeners.push(fn)
  }

  dispatch({type: '@init'})
  return {
    getState,
    dispatch,
    subscribe
  }
}

export function applyMiddleware(...middlewares){
  return createStore => {
    return (...args) => {
      const store = createStore(...args)
      const midApi = {
        getState: store.getState,
        dispatch: store.dispatch
      }
      const chain = middlewares.map((mid) => mid(midApi))
      const dispatch = compose(...chain)(store.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}


function compose(...args) {
  if (args.length === 0) {
    return function () {
      console.log('empty')
    }
  } else if (args.length === 1) {
    console.log(args)
    return args[0]
  } else {
    return args.reduce((prev, cur) => {
      console.log(prev);
      return (...arg) => cur(prev(...arg))
    })
  }
}