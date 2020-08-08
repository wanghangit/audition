import React, { useMemo, useState, memo } from 'react'

const Counter = memo(function Counter(props){
  console.log('render')
  return <>
    <p>count: {props.count}</p>
  </>
})

function App(){
  const onClick = () => {}
  const [count, setCount] = useState(0)
  const double = useMemo(() => {
    return count*2
  }, [count===3])
  return <>
    <Counter count={double} onClick={onClick}></Counter>
    <p>double:{double}</p>
    <button onClick={() => {setCount(count+1)}}>add</button>
  </>
}

export default App
