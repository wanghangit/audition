/**
 * vue的配置项
 */
export interface VueOptions extends BaseObject {
  el: string,
  data: Object | Function,
  template?: string,
  render?: Function,
}

/**
 * 基于对象扩展的一种基本对象，可以赋值任何值
 */
export interface BaseObject extends Object {
  [key: string]: any
}

/**
 * 抽象语法树的结构
 */
export interface ASTElement extends BaseObject {
  type: number,
  tag: string,
  attrsList: BaseObject[],
  attrsMap: BaseObject,
  rawAttrsMap: BaseObject,
  parent: ASTElement,
  children: []
}