import { hot } from 'react-hot-loader/root'
import React, { Component } from 'react'
import Article from '../components/Article'

class App extends Component{
  constructor(){
    super()
  }
  render(){
    return <>
      <Article/>
    </>
  }
}

export default hot(App)