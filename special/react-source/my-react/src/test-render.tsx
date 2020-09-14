import React from './lib/React';
import ReactDOM from './lib/ReactDOM';
import "./index.css"

let element = (
  <div id="A1" className="wrapper">
    A1
    <div id="B1" className="wrapper">
      B1
      <div id="C1" className="wrapper">C1</div>
      <div id="C2" className="wrapper">C2</div>
    </div>
    <div id="B2" className="wrapper">B2</div>
  </div>
);
console.log(element)

ReactDOM.render(
  element,
  document.getElementById('root')
);

const btn1 = document.getElementById('btn1')
const btn2 = document.getElementById('btn2')
const btn3 = document.getElementById('btn3')

btn1?.addEventListener('click',function(){
  let element1 = (
    <div id="A1" className="wrapper">
      A1-new1
      <div id="B1" className="wrapper">
        B1-new1
        <div id="C1" className="wrapper">C1-new1</div>
        <div id="C2" className="wrapper">C2-new1</div>
      </div>
      <div id="B2" className="wrapper">B2-new1</div>
    </div>
  );
  ReactDOM.render(
    element1,
    document.getElementById('root')
  );
})
btn2?.addEventListener('click',function(){
  let element2 = (
    <div id="A1" className="wrapper">
      A1-new2
      <div id="B1" className="wrapper">
        B1-new2
        <div id="C1" className="wrapper">C1-new2</div>
        <div id="C2" className="wrapper">C2-new2</div>
      </div>
      {/* <div id="B2" className="wrapper">B2-new1</div> */}
    </div>
  );
  ReactDOM.render(
    element2,
    document.getElementById('root')
  );
})
btn3?.addEventListener('click',function(){
  let element = (
    <div id="A1" className="wrapper">
      A1
      <div id="B1" className="wrapper">
        B1
        <div id="C1" className="wrapper">C1</div>
        <div id="C2" className="wrapper">C2</div>
      </div>
      <div id="B2" className="wrapper">B2</div>
    </div>
  );
  console.log(element)
  
  ReactDOM.render(
    element,
    document.getElementById('root')
  );
})