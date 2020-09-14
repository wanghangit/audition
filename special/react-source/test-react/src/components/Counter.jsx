import React from "../lib/React";

export default class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      number: 0
    }
  }
  add = () => {
    this.setState({
      number: this.state.number+1
    })
  }
  render(){
    const { number } = this.state
    return <div>
      <span>{number}</span>
      <button onClick={this.add}>add</button>
    </div>
  }
}
// const ADD = "ADD";
// function reducer(state, action) {
//   switch (action.type) {
//     case ADD:
//       return { count: state.count + 1 };
//     default:
//       return state;
//   }
// }
// export default function (props) {
//   const [countState, dispatch] = React.useReducer(reducer, { count: 0 });
//   const [number, setNumber] = React.useState({count:0});
//   return (
//     <div>
//          <div>
//       <span>{number.count}</span>
//       <button
//         onClick={() => {
//           setNumber({count: number.count+1})
//         }}
//       >
//         add
//       </button>
//     </div>
//          <div>
//       <span>{countState.count}</span>
//       <button
//         onClick={() => {
//           dispatch({ type: ADD });
//         }}
//       >
//         add
//       </button>
//     </div>
//     </div>
 
//   );
// }
