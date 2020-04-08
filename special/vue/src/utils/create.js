import Vue from 'vue'

/**
 * 创建一个组件挂载到body上
 */
export function create(Component, props){
  // 创建实例
  const vm = new Vue({
    render(h){
      return h(Component, {props})
    }
  }).$mount()

  const component = vm.$children[0]
  console.log(component, vm)
  document.body.appendChild(vm.$el)
  component.remove = () => {
    document.body.removeChild(vm.$el)
    component.$destroy()
  }
  return component
}