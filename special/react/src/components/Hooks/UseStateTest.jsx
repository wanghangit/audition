import React, { useState, useEffect } from "react";

export default function () {
  const [count, setCount] = useState(0);
  const [counter, setCounter] = useState({ a: 1, b: 2 });
  useEffect(() => {
    document.title = 'The count is'+count
    console.log(count)
    let timer = setInterval(() => {
      console.log('interval'+count)
    }, 1000)
    return () => {
      console.log('clear',count)
      clearInterval(timer)
    }
  }, [count])
  function add() {
    counter.b = 4
    setCounter(counter)
  }
  return (
    <>
      <div>count:{count}</div>
      <div>counter:{counter.b}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
      <button onClick={add}>add1</button>
    </>
  );
}
