import ReactDOM from '../components/kReact/ReactDOM'
import React from '../components/kReact'
import "../less/my_react.less"

function FuncCmp(props) {
  return <div >
    这是一个Function组件 {
      props.name
    } </div>
}

class ClassCmp extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return ( < div >
      这是一个FClass组件 {
        this.props.name
      } </div>)
  }
}

  const $app = document.querySelector("#app")
  ReactDOM.render(<div>
    <div className="border" onClick={() => {console.log('div')}}> 这是原生节点 </div> 
    <FuncCmp name = "test">
    </FuncCmp><ClassCmp name = "test1" ></ClassCmp>
    {
      [1,2,3].map(item => {
        return <FuncCmp key={item} name={item}/>
      })
    }
  </div>, $app)