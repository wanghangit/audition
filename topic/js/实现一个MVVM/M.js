const isDirect = /v-([^-]+?)/ // 判断是不是指令
const isBind = /\{\{([0-9a-zA-Z.])*?\}\}/

/**
 * 实现一个双向绑定的基础类
 * 也是一个入口方法
 */
class M {
  constructor(options){
    this.$el = this.query(options.el)
    this.$data = options.data
    this.compile()
  }
  /**
   * 获取dom元素
   * @param {*} el 
   */
  query(el){
    if(!el){
      throw new Error("options must has el")
    }
    if(typeof el === "string"){
      return document.querySelector(el)
    }
    if(el.nodeType === 1){
      return el
    }
    new Error("el is error")
  }
  /**
   * 在内存中获取node对象
   */
  compile(){
    new Compile(this)
  }
}

/**
 * 用来做模版编译
 */
class Compile{
  constructor(m){
    let $el = m.$el
    // 首先将node节点转化为内存中的片段
    let node = document.createDocumentFragment()
    let curElement
    while(curElement = $el.firstChild){
      node.appendChild(curElement)
    }
    // 将模版中的数据解析出来
    node.childNodes.forEach((dom) => {
      console.log(dom)
      this.transformNode(dom, m)
    })
    //  

  }
  transformNode(node, m){
    if(isElementNode(node)){

    }else if(isTextNode(node)){
      let value = node.nodeValue
      console.log(value)
      let match = value.match(isBind)
      console.log(match)
    }
  }
}

// 判断是否是dom节点元素
function isElementNode(node){
  return node.nodeType === 1
}

// 判断是否是Text节点
function isTextNode(node){
  return node.nodeType === 3
}
