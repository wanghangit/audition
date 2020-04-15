# React

## Hooks

### useState

提供了函数组件，存贮状态的能力,可以用第二个返回值直接修改状态

```jsx
function () {
  const [count, setCount] = useState(0);
  return (
    <>
      <div>count:{count}</div>
      <button onClick={() => setCount(count + 1)}>add</button>
    </>
  );
}
```

### useEffect

在使用函数组件我们可能请求，可能会做一些和状态无关的操作，这就需要副作用，也就是我们修改dom之后的副作用。这个方法相当于3个生命周期方法`componentDidMount，componentDidUpdate,componentWillUnmount`。在初始化和dom更新后还有修改时都会调用。

```jsx
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
```

比如像上边这样，我可以在初始化，和dom更新完毕后调用，返回一个函数会在组件卸载时自动调用，这里做一些清除逻辑。
这里还有一个问题，有些时候我不想在任何更新后都触发，useEffect还有一个参数是一个*依赖数组*，我们可以传入`[count]`,表示在count更新后才触发，传空数组就表示不依赖任何数据。这个相当与`componentDidUpdate`里的优化逻辑跳过一些代码执行，使用起来更方便，更容易梳理代码

