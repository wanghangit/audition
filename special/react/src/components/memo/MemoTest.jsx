import React, { Component } from "react";
import Memo from "./Memo.jsx";

class MemoTest extends Component {
  state = { time: 0 };
  componentDidMount() {
    setInterval(() => {
      this.setState({
        time: this.state.time + 1,
      });
    }, 1000);
  }
  render() {

    return (
      <div>
        {this.state.time}
        <Memo></Memo>
      </div>
    );
  }
}

export default MemoTest;
