import { VueOptions } from './types'
import { query } from './utils/dom'
import { Compile } from './compile';

export default class Vue{
  $el: Element;
  $options: VueOptions
  constructor(options:VueOptions){
    this.init(options)
  }
  init(options:VueOptions){
    this.$options = options
    this.initState()
    this.$mount()
  }
  $mount() {
    const options = this.$options
    const $el = query(options.el) // 获取传入的dom元素
    if(!options.render){ // 判断有没有render方法，经过webpack处理的是有的
      let template = options.template
      if(!template && $el){ // 如果没有模版直接获取dom当作模版
        template = $el.outerHTML;
      }
      const compile = new Compile(template, {})
    }


  }
  initState() {
    this.initData()
  }
  initData(){
    if(this.$options.data){
      
    }
  }
}