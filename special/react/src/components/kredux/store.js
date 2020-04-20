import { createStore, applyMiddleware } from './kredux'

function countReducer(state=0,action){
  switch(action.type){
    case 'add':
      return state+1
    case 'minus':
      return state-1
    default :
      return state
  }
}


function logger({dispatch, getState}){
  return dispatch => action => {
    console.log(`${action.type}执行了`)
    console.log(`state is ${getState()}`)
    return dispatch(action)
  }
}
export default createStore(countReducer, applyMiddleware(logger))