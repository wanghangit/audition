/**
 * 创建reactElement元素
 * @param {*} type 组件类型 
 * @param {*} config 组件配置 
 * @param  {...any} children 组件子元素
 */
function createElement(type, config, ...children){
  return {
    type,
    props: {
      ...config,
      children
    }
  }
}

export default {
  createElement
}