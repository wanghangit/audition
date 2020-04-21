import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import logger from 'redux-logger'

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

export default createStore(countReducer, applyMiddleware(logger, reduxThunk))