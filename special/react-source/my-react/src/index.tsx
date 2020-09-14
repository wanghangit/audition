import React from './lib/React';
import ReactDOM from './lib/ReactDOM';
import Counter from './components/Counter'
import CounterFn from './components/CounterFn'
// import "./test-render"
// console.log(<Counter/>)
ReactDOM.render(<CounterFn />, document.getElementById("root"))

