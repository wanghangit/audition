import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import Child from './Child'

class App extends Component{
  constructor(){
    super()
  }
  render(){
    return <>
      <Child></Child>
    </>
  }
}

export default hot(App)