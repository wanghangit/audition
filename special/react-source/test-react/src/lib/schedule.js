import { setProps } from "../util/dom";
import { UpdateQueue, Update } from "./UpdateQueue";

const {
  ROOT_FIBER,
  element_Text,
  TAG_TEXT,
  TAG_HOST,
  PLACMENT,
  DELETION,
  UPDATE,
  TAG_CLASS,
  TAG_FUNCTION
} = require("./constants");

let nextUnitOfWork = null; // 下一个工作单元
let workInProgressRoot = null; // 指向当前工作的rootFiber
let currentRoot = null; // 渲染成功后当前的树
let deletions = [] // 删除的节点纪录下来
let workProgressFiber = null // 正在工作的fiber
let hooksIndex = 0 // hooks的索引

/**
 * 开始调度rootFiber
 * root具有双缓存机制
 * @param {*} root
 */
export function scheduleRoot(root) {
  if(currentRoot && currentRoot.alternate){ // 至少经历过2次渲染
    workInProgressRoot = currentRoot.alternate
    workInProgressRoot.alternate = currentRoot;
    if(root) {
      workInProgressRoot.props = root.props;
    }
  }else if(currentRoot){ // 第二次渲染
  // if(currentRoot){
    if(root){
      root.alternate = currentRoot
      workInProgressRoot = root;
    }else{
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  }else{ // 首次渲染
    workInProgressRoot = root;
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
  nextUnitOfWork = workInProgressRoot;
  window.requestIdleCallback(workLoop, { time: 500 });
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // 当前帧是否还有空闲
  }
  console.log(nextUnitOfWork, workInProgressRoot)
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log(`render completed`);
    console.log(workInProgressRoot);
    commitRoot();
    currentRoot = workInProgressRoot
    workInProgressRoot = null
  } else {
    window.requestIdleCallback(workLoop, { time: 500 });
  }
}

function commitRoot() {
  deletions.forEach(commitWork) // 删除节点
  let currentfiber = workInProgressRoot.firstEffect;
  while (currentfiber) {
    commitWork(currentfiber);
    currentfiber.effectTag = null
    currentfiber = currentfiber.nextEffect;
  }
  deletions.length = 0
}

function commitWork(fiber) {
  if(!fiber) return
  let returnFiber = fiber.return;
  while(returnFiber.tag !== TAG_HOST && returnFiber.tag!==TAG_TEXT && returnFiber.tag!==ROOT_FIBER){
    returnFiber = returnFiber.return
  }
  const returnFiberDOM = returnFiber.stateNode
  if (fiber.effectTag === PLACMENT) {
    let nextFiber = fiber
    while(nextFiber && nextFiber.tag!==TAG_HOST && nextFiber.tag!==TAG_TEXT){
      nextFiber = nextFiber.child
    }
    returnFiberDOM.appendChild(nextFiber.stateNode);
  }else if(fiber.effectTag === DELETION){
    commitDELETION(fiber, returnFiberDOM)
    // returnFiberDOM.removeChild(fiber.stateNode)
  }else if(fiber.effectTag === UPDATE){
    if(fiber.type === element_Text){
      if(fiber.alternate.props.text !== fiber.props.text){
        fiber.stateNode.textContent = fiber.props.text
      }
    }else{
      if(fiber.tag === TAG_CLASS){
        return fiber.effectTag = null;
      }
      updateDOM(fiber.stateNode, fiber.alternate.props, fiber.props)
    }
  }
  fiber.effectTag = null;
}

function commitDELETION(fiber, returnDOM){
  if(fiber.tag==TAG_HOST || fiber.tag==TAG_TEXT){
    returnDOM.removeChild(fiber.stateNode)
  }
}

/**
 * 对当前fiber执行操作
 * @param {*} fiber
 */
function performUnitOfWork(fiber) {
  beginWork(fiber); // 对当前fiber进行对比更新
  if (fiber.child) { // 先对子元素进行更新
    return fiber.child;
  }
  while (fiber) {
    completeUnitOfWork(fiber);// 没有子节点说明当前节点完成了对比
    if (fiber.sibling) { // 返回当前节点的兄弟节点
      return fiber.sibling;
    }
    fiber = fiber.return; // 没有兄弟节点直接返回父节点
  }
}
/**
 * 完成对比后处理effect
 * @param {*} fiber 
 */
function completeUnitOfWork(fiber) {
  const returnFiber = fiber.return;
  if (returnFiber) {
    // 将effect向上传递
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = fiber.firstEffect;
    }
    if (fiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = fiber.firstEffect; // 父节点链接当前的第一个节点
      }
      returnFiber.lastEffect = fiber.lastEffect;
    }
    // 维护最底层的effect
    const effectTag = fiber.effectTag;
    if (effectTag) {
      if (!!returnFiber.lastEffect) {
        // 不是第一个副作用，链接到下一个
        returnFiber.lastEffect.nextEffect = fiber;
      } else {
        // 第一个初始化
        returnFiber.firstEffect = fiber;
      }
      returnFiber.lastEffect = fiber;
    }
  }
}

/**
 * 开始当前fiber的工作
 * 创建dom,子fiber
 * @param {*} fiber
 */
function beginWork(fiber) {
  if (fiber.tag === ROOT_FIBER) {
    updateHostRoot(fiber);
  } else if (fiber.tag === TAG_TEXT) {
    updateHostText(fiber);
  } else if (fiber.tag === TAG_HOST) {
    updateHostElement(fiber);
  }else if(fiber.tag === TAG_CLASS){
    updateHostClass(fiber)
  }else if(fiber.tag === TAG_FUNCTION){
    updateHostFunction(fiber)
  }else{
    debugger
  }
}

function updateHostFunction(fiber){
  workProgressFiber = fiber;
  hooksIndex = 0
  workProgressFiber.hooks = [] 
  const newChildren = [fiber.type(fiber.props)]
  reconcileChildren(fiber,newChildren)
}

function updateHostClass(fiber){
  if(!fiber.stateNode){
    fiber.stateNode = new fiber.type(fiber.props)
    fiber.stateNode.internalFiber = fiber
    fiber.updateQueue = new UpdateQueue()
  }
  fiber.stateNode.state = fiber.updateQueue.forceUpdate(fiber.stateNode.state)
  let newElement = fiber.stateNode.render()
  const newChildren = [newElement]
  reconcileChildren(fiber, newChildren)
}

/**
 * 更新rootFiber节点
 * @param {*} fiber
 */
function updateHostRoot(fiber) {
  let nextChildren = fiber.props.children;
  reconcileChildren(fiber, nextChildren);
}

/**
 * 更新文本节点
 * @param {*} fiber
 */
function updateHostText(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDOM(fiber);
  }
}

/**
 * 更新原生节点
 * @param {*} fiber
 */
function updateHostElement(fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDOM(fiber);
  }
  let newChildren = fiber.props.children;
  reconcileChildren(fiber, newChildren);
}

function createDOM(fiber) {
  const tag = fiber.tag;
  if (tag === TAG_TEXT) {
    return document.createTextNode(fiber.props.text);
  } else if (tag === TAG_HOST) {
    let stateNode = document.createElement(fiber.type);
    updateDOM(stateNode, {}, fiber.props);
    return stateNode;
  }
}

function updateDOM(dom, oldProps, newProps) {
  setProps(dom, oldProps, newProps);
}

/**
 * 调和子元素
 * 旧的fiber是一个链表
 * 新的children是一个数组
 * @param {*} currentFiber
 * @param {[]} nextChildren
 */
function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0; // 新的children的索引
  let oldFiber = currentFiber.alternate && currentFiber.alternate.child;
  if(oldFiber){
    oldFiber.firstEffect = oldFiber.nextEffect = oldFiber.lastEffect = null
  }
  let prevChild; // 上一个fiber 
  while (newChildIndex < newChildren.length || oldFiber) {
    const newChild = newChildren[newChildIndex];
    let tag,
      type = newChild && newChild.type;
    let newFiber;
    const sameType = oldFiber && newChild && oldFiber.type === newChild.type;
    if (type === element_Text) {
      tag = TAG_TEXT;
    } else if (typeof type === "string") {
      tag = TAG_HOST;
    }else if(typeof type === "function" && type.prototype.isReactComponent){
      tag = TAG_CLASS
    }else if(typeof type === "function"){
      tag = TAG_FUNCTION
    }else{
      alert(111)
    }

    if(sameType){ // 相同类型可以复用
      if(oldFiber && oldFiber.alternate){ // 已经更新过有fiber可以复用
        newFiber = oldFiber.alternate;
        newFiber.alternate = oldFiber;
        newFiber.props = newChild.props;
        newFiber.effectTag = UPDATE;
        newFiber.nextEffect = null;
        newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue()
      }else{
        newFiber = {
          tag: oldFiber.tag,
          type: oldFiber.type,
          alternate: oldFiber,
          props: newChild.props,
          stateNode: oldFiber.stateNode,
          return: currentFiber,
          updateQueue: oldFiber.updateQueue || new UpdateQueue(),
          effectTag: UPDATE, // 更新
          // firstEffect: null, // 当前节点孩子第一个
          // lastEffect: null, // 当前节点孩子最后一个
          // nextEffect: null, // 当前节点下一个副作用
        }
      }
    }else{ // 类型不同需要重新创建
      if(newChild){
        newFiber = {
          tag,
          type,
          alternate: null,
          props: newChild.props,
          stateNode: null,
          return: currentFiber,
          updateQueue: new UpdateQueue(),
          effectTag: PLACMENT, // 新建
          firstEffect: null, // 当前节点孩子第一个
          lastEffect: null, // 当前节点孩子最后一个
          nextEffect: null, // 当前节点下一个副作用
        };
      }
      if(oldFiber){
        oldFiber.effectTag = DELETION;
        deletions.push(oldFiber);
      }
    }
    if (newChildIndex === 0) {
      // 第一个元素维护父子关系
      currentFiber.child = newFiber;
    } else {
      // 其他的维护兄弟间关系,最后一个不用维护
      prevChild.sibling = newFiber;
    }
    prevChild = newFiber;
    if(oldFiber){
      oldFiber = oldFiber.sibling; // 指针向后移动
    }
    newChildIndex++;
  }
}

export function useReducer(reducer, initialValue) {
  let newHooks = workProgressFiber.alternate && workProgressFiber.alternate.hooks && workProgressFiber.alternate.hooks[hooksIndex];
  if(newHooks){ // 第二次渲染
    newHooks.state = newHooks.updateQueue.forceUpdate(newHooks.state)
  }else{
    newHooks = {
      state: initialValue,
      updateQueue: new UpdateQueue()
    }
  }
  const dispatch = (action) => {
    newHooks.updateQueue.equeueState(new Update(reducer ? reducer(newHooks.state, action) : action))
    scheduleRoot()
  }
  workProgressFiber.hooks[hooksIndex++] = newHooks
  console.log(newHooks)
  return [newHooks.state, dispatch]
}

export function useState(state){
  return useReducer(null, state);
}
