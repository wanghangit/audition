import React from '../lib/React'
import { RObject } from '../lib/type'

export default class Counter extends React.Component{
  constructor(props:RObject){
    super(props)
    this.state = {
      count: 12
    }
  }
  add = () => {
    this.setState({
      count: this.state.count+1
    })
  }
  render(){
    return <div>
      <span>{this.state.count}</span>
      <button onClick={this.add}>add</button>
    </div>
  }
}