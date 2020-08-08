import React, { Component } from 'react'

class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      number: 0
    }
  }
  componentDidMount(){
    // this.setState((prevState) => {
    //   return {number:prevState.number+1}
    // })
    // this.setState((prevState) => {
    //   return {number:prevState.number+1}
    // })
    this.setState({
      number: this.state.number+1
    })
    this.setState({
      number: this.state.number+1
    })
  }
  render(){
  return <div>{this.state.number}</div>
  }
}

export default Index
