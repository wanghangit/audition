import React from '../lib/React'
import { UpdateQueue } from "./UpdateQueue";

export interface RObject extends Object{
  [key:string]: any;  
}

export interface props{
  children: any[],
  [key:string]: any
}

export interface FiberRoot {
  type: symbol,
  tag: symbol,
  props: props,
  alternate?: FiberRoot,
  stateNode: HTMLElement | null,
  firstEffect?: Fiber| null,
  lastEffect?:Fiber| null,
  nextEffect?: Fiber| null,
  child?: Fiber,
  sibling?: Fiber,
}

export interface Fiber{
  type: string | Function | React.Component,
  tag: symbol,
  child?: Fiber| null,
  sibling?: Fiber|null,
  return?: Fiber|null,
  alternate: Fiber|null,
  firstEffect?: Fiber| null,
  lastEffect?:Fiber| null,
  nextEffect?: Fiber| null,
  stateNode: HTMLElement|null|Text|RObject,
  effectTag: symbol,
  updateQueue?: UpdateQueue,
  hooks?:any[]
  props: props
}
export interface ReactElement{
  type: string|symbol|Function,
  props: props,
}
export default {
  
}