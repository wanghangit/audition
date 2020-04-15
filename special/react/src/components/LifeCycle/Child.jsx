import React, { Component } from 'react'

class Child extends Component {
  constructor(props) {
    super(props)
    console.log(this.props)
    this.state = {
      count: 0
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    //根据nextProps和prevState计算出预期的状态改变，返回结果会被送给setState,不能访问this，只做单纯的计算用来修改state
    console.log('getDerivedStateFromProps')
    console.log(nextProps, prevState)
    return prevState.count < 5 ? null : { count: 1 }
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('#enter getSnapshotBeforeUpdate');
    return 'foo';
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate:snapshot' + snapshot)

  }
  componentWillUnmount() {
    console.log('componentWillUnmount')
  }
  add = () => {
    this.setState(function (preState, preProps) {
      return {
        count: preState.count + 1
      }
    })
    console.log(this.state.count)
  }
  render() {
    const { count } = this.state
    console.log('render count:' + count)
    return <>
      <div>{count}</div>
      <button onClick={this.add}>btn</button>
    </>
  }
}

export default Child