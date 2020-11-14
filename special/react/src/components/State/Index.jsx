import React, { Component } from "react";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
      counter: 0,
    };
  }
  componentDidMount() {
    // this.setState((prevState) => {
    //   return {number:prevState.number+1}
    // })
    // this.setState((prevState) => {
    //   return {number:prevState.number+1}
    // })
    this.setState({
      number: this.state.number + 1,
    });
    this.setState({
      number: this.state.number + 1,
    });
  }
  addNumber = () => {
    this.setState({
      number: this.state.number + 1,
    });
    this.setState({
      number: this.state.number + 1,
    });
  }
  render() {
    return (
      <div>
        number:{this.state.number}
        <button onClick={() => {this.state.counter = this.state.counter+1}}>add</button>
        <button onClick={this.addNumber}>less</button>
        <p>counter:{this.state.counter}</p>
      </div>
    );
  }
}

export default Index;
