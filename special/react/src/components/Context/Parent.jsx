import React, { Component } from 'react'
import Child from '../LifeCycle/Child'
import { Consumer } from './context'

class Parent extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <>
      {/* 在使用值的地方使用服务组件包裹注册进props */}
      <Consumer>{ctx => <Child {...ctx} />}</Consumer>
    </>
  }
}

export default Parent