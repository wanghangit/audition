import React, { Component } from 'react'
import store from './store'

export default class App extends Component{
  constructor(){
    super()
    console.log(store)
  }
  componentDidMount(){
    store.subscribe(() => {
      this.forceUpdate()
    })
  }
  render(){
    return <>
      <p>{store.getState()}</p>
      <button onClick={() => store.dispatch({type: 'add'})}>add</button>
    </>
  }
}

