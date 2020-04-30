import React, { Component } from 'react'
import { connect } from './index'

class App extends Component {
  constructor() {
    super()
  }
  componentDidMount() {

  }
  render() {
    return <>
      <p>count: {this.props.counter}</p>
      <button onClick={this.props.add}>add</button>
      <button onClick={this.props.minus}>minus</button>
      <button onClick={this.props.async}>asyncAdd</button>
    </>
  }
}


export default connect(
  state => {
    return {
      counter: state
    }
  },
  {
    add() {
      return {
        type: 'add'
      }
    },
    minus() {
      return {
        type: 'minus'
      }
    },
    async: () => dispatch => {
      setTimeout(() => {
        dispatch({ type: 'add' })
      }, 1000)
    }
  }
) (App)

