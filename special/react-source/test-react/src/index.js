import React from "./lib/React";
import ReactDOM from "./lib/ReactDOM";
import Counter from './components/Counter'
import "./index.css"

console.log((<Counter/>).type)
ReactDOM.render(<Counter/>, document.querySelector("#root"))
// let element = (
//   <div id="A1">
//     A1
//     <div id="B1">
//       B1
//       <div id="C1">C1</div>
//       <div id="C2">C2</div>
//     </div>
//     <div id="B2">B2</div>
//   </div>
// );
// console.log(element)
// ReactDOM.render(element, document.getElementById("root"));

// document.querySelector("#btn1").addEventListener("click", function(){
//   let element = (
//     <div id="A1">
//       A1-new1
//       <div id="B1">
//         B1-new1
//         <div id="C1">C1-new1</div>
//         <div id="C2">C2-new1</div>
//       </div>
//       <div id="B2">B2-new1</div>
//     </div>
//   );
//   console.log(element)
//   ReactDOM.render(element, document.getElementById("root"));
// })

// document.querySelector("#btn2").addEventListener("click", function(){
//   let element = (
//     <div id="A1">
//       A1-new2
//       <div id="B1">
//         B1-new2
//         <div id="C1">C1-new2</div>
//         <div id="C2">C2-new2</div>
//       </div>
//       {/* <div id="B2">B2-new1</div> */}
//     </div>
//   );
//   console.log(element)
//   ReactDOM.render(element, document.getElementById("root"));
// })
