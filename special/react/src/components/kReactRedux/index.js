import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import ReduxTest from './ReduxTest'
import ReactReduxTest from './ReactReduxTest'
import { Provider } from 'react-redux'
import store from './store'

class App extends Component{
  constructor(){
    super()
  }
  componentDidMount(){

  }
  render(){
    return <Provider store={store}>
      <ReactReduxTest></ReactReduxTest>
    </Provider>
  }
}

export default hot(App)