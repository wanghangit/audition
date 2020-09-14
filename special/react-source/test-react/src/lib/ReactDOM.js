import { scheduleRoot } from './schedule'
const { ROOT_FIBER } = require("./constants");


/**
 * 渲染组件的入口方法
 * @param {*} element 
 * @param {*} container 
 */
function render(element, container){
  const rootFiber = {
    tag: ROOT_FIBER,
    stateNode: container, // 对于原生组件指向dom实例
    props: {children: [element]}
  }
  scheduleRoot(rootFiber)
}

export default {
  render
}