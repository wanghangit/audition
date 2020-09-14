import { RObject, ReactElement, Fiber } from "./type";
import { isString } from "./util";
import { TEXT_ELEMENT } from "./constants";
import { Update } from "./UpdateQueue";
import { scheduleRoot, useReducer } from "./schedule";

/**
 * 根据babel编译jsx后的方法生成reactElement对象，深度递归的生成一个element树
 * @param type 
 * @param config 
 * @param children 
 */
function createElement(type:string, config: RObject,...children:Array<ReactElement>): ReactElement{
  delete config.__self; // 删除编译无用的对象
  delete config.__source;
  return {
    type: type,
    props: {
      ...config,
      children: children.map((c) => {
        return typeof c !== 'object' ? { // 为了统一text格式
          type: TEXT_ELEMENT,
          props: {
            text: c,
            children:[]
          }
        } : c
      })
    }
  }
}

class Component{
  static isReactComponent: boolean = true
  props: RObject;
  internalFiber?: Fiber;
  state: RObject;
  refs: any;
  context: any;
  constructor(props: RObject){
    this.props = props
    this.state = {}
    this.context = null
    this.refs = null
  }
  setState(payload:RObject|Function){
    let update  = new Update(payload)
    this.internalFiber?.updateQueue?.enqueueState(update)
    scheduleRoot()
  }
  forceUpdate(){

  }
}

export default {
  createElement,
  Component,
  useReducer
}