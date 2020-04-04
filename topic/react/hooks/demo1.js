import React, {useState,useEffect} from 'react'

export default function Demo(){
  const [count,add] =useState(0)
  const [name, setName] = useState("xiaoming")
    // 相当于 componentDidMount 和 componentDidUpdate:
    useEffect(() => {
      // 使用浏览器的 API 更新页面标题
      document.title = `You clicked ${count} times`;
    },[count]);
  return <>
    <p>{count}</p>
    <div onClick={() => {add(count+1)}}>add</div>
  </>
}