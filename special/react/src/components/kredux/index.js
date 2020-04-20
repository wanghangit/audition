import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import store from './store'

class App extends Component{
  constructor(){
    super()
  }
  componentDidMount(){
    console.log(store.getState())
    store.subscribe(() => {
      this.forceUpdate()
      console.log(store.getState())
    })
  }
  render(){
    return <>
      <p>my_redux</p>
      <p>{store.getState()}</p>
      <button onClick={() => {store.dispatch({type:'add'})}}>add</button>
    </>
  }
}

export default hot(App)