import { hot } from 'react-hot-loader/root'
import React, { Component, createContext } from 'react'
import { Provider } from './context'
import Parent from './Parent'

const store = {
  name: 'xiaoming',
  age: 18
}
class App extends Component {
  constructor() {
    super()
  }
  render() {
    return <>
      {/* 注册全局store */}
      <Provider value={store}> 
        <Parent />
      </Provider>
    </>
  }
}

export default hot(App)