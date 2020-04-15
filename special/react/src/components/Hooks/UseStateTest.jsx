import React, { useState, useEffect } from "react";

export default function () {
  const [count, setCount] = useState(0);
  useEffect(() => {
    document.title = 'The count is'+count
    console.log(count)
    let timer = setInterval(() => {
      console.log('interval'+count)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  })
  return (
    <>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </>
  );
}
