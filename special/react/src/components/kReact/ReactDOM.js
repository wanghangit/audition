function render(vnode, container){
  console.log(vnode, container)
  mount(vnode, container)
}

function mount(vnode, container){
  const { vType, props } = vnode
  if(!vType){
    mountTextNode(vnode, container)
  }else if(vType === 1){
    mountHTMLNode(vnode, container)
  }else if(vType===2){
    mountClassNode(vnode, container)
  }else if(vType===3){
    mountFuncNode(vnode, container)
  }
}

function mountTextNode(vnode, container){
  const text = document.createTextNode(vnode)
  container.appendChild(text)
}
function mountHTMLNode(vnode, container){
  const { type, props} = vnode
  const element = document.createElement(type)
  const {children, ...rest} = props
  children.map(item=>{
    if(Array.isArray(item)){
      item.map(c => {
        mount(c, element)
      })
    }else{
      mount(item, element)
    }
  })
  Object.keys(rest).forEach(item => {
    if(item === 'className'){
      element.setAttribute('class', rest[item])
    }
    if(item.slice(0,2) === 'on'){
      element.addEventListener(item.slice(2).toLowerCase(), rest[item])
    }
  })
  container.appendChild(element)
}
function mountClassNode(vnode, container){
  const { type, props } = vnode
  const Cmp = new type(props)
  const node = Cmp.render()
  mount(node, container)
}
function mountFuncNode(vnode, container){
  const { type, props } = vnode
  const node = type(props)
  mount(node, container)
}



export default {
  render
}