window.onload = function(){
  var dom = document.querySelector(".parent")
  var dfsList = []
  this.dfs(dom, dfsList)
  this.console.log(dfsList)
  this.bfs(dom)
}

/**
 * 利用递归实现深度遍历
 * @param {*} dom 
 * @param {*} nodeList 
 */
function dfs(dom, nodeList = []){
  const children = dom.children
  nodeList.push(dom)
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if(child.children){
      dfs(child, nodeList)
    } 
  }
}

/**
 * 利用队列实现广度遍历
 * @param {*} dom 
 */
function bfs(dom){
  var queue = []
  var nodes = []
  nodes.push(dom)
  queue.push(dom)
  while(queue.length){
    var cur = queue.shift()
    const children = cur.children
    for (let i = 0; i < children.length; i++) {
      queue.push(children[i])
      nodes.push(children[i])
    }
  }
  console.log(nodes)
}