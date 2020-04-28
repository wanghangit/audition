function createElement(type,props,...children){
  console.log(arguments)
  if(!props){
    props = {}
  }
  props.children = children
  let vType// 1.原生组件 2.class组件 3.函数式组件
  if(typeof type === 'string'){
    vType=1
  }else if(typeof type === 'function'){
    type.isReactComponent ? vType=2 : vType=3
  }
  return {
    type,
    props,
    vType
  }
}

class Component{
  static isReactComponent = {}
  constructor(props){
    this.props = props
  }
}

export default{
  Component,
  createElement
}