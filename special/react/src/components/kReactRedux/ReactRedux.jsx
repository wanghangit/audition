import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import Test from './Test'
import { Provider } from './index'
import store from './store'

class App extends Component{
  constructor(){
    super()
  }
  componentDidMount(){

  }
  render(){
    return <Provider store={store}>
      <Test></Test>
    </Provider>
  }
}

export default hot(App)