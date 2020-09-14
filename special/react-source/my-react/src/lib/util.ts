import { Fiber, RObject } from "./type";
import { TAG_HOST, TAG_TEXT } from "./constants";

export function isString(obj: any): boolean {
  return typeof obj === 'string';
}

export function createDom(fiber: Fiber) {
  const tag = fiber.tag;
  if (tag === TAG_HOST) {
    let stateNode = document.createElement(fiber.type as string)
    updateDOM(stateNode, {}, fiber.props)
    return stateNode;
  } else if (tag === TAG_TEXT) {
    return document.createTextNode(fiber.props.text)
  }
  return null;
}

export function updateDOM(dom: HTMLElement, oldProps: RObject, newProps: RObject) {
  for (const key in oldProps) {
    if (key !== 'children') {
      if (key in newProps) { // 更新属性
        updateProps(dom, key, newProps[key])
      } else { // 删除属性
        removeProps(dom, key)
      }
    }
  }
  for (const key in newProps) {
    if (key !== 'children') {
      if (!(key in oldProps)) { // 实际上是新增属性
        updateProps(dom, key, newProps[key])
      }
    }
  }
}

function updateProps(dom: HTMLElement, key: string, value: any) {
  if(/^on/.test(key)){
    // @ts-ignore
    dom[key.toLowerCase()] = value
  }else if(key === 'className'){
    dom.setAttribute('class', value)
  }else{
    dom.setAttribute(key, value);
  }

}

function removeProps(dom: HTMLElement, key: string) {
  dom.removeAttribute(key);
}
