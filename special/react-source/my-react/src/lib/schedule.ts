import React from '../lib/React'
import { FiberRoot, Fiber, ReactElement, RObject } from "./type";
import { TAG_ROOT, PLACEMENT, TEXT_ELEMENT, TAG_TEXT, TAG_HOST, UPDATE, DELETION, TAG_CLASS_COMPONENT, TAG_FUNCTION_COMPONENT } from "./constants";
import { createDom, updateDOM } from "./util";
import { UpdateQueue, Update } from "./UpdateQueue";

let nextUnitOfWork: Fiber | null | FiberRoot = null; // 当前工作的fiber对象
let workInProgressRoot: FiberRoot | null = null; // 当前正在工作的root
let currentRoot: FiberRoot | null = null; // 页面上显示的root也就是上一次更新完成的root
let deletions: Array<Fiber> = []; // 每次render阶段收集的要删除的effect
let workProgressFiber: Fiber | null = null; // hooks使用指向当前正在工作的fiber
let hookIndex = 0; //

/**
 * 对当前root执行工作
 * @param fiberRoot 
 */
export function scheduleRoot(fiberRoot?: FiberRoot) {
  if (currentRoot && currentRoot.alternate) {// 至少经历了2次渲染
    workInProgressRoot = currentRoot.alternate
    workInProgressRoot.alternate = currentRoot
    if (fiberRoot) {
      workInProgressRoot.props = fiberRoot.props
    }
  } else if (currentRoot) {
    if (fiberRoot) {
      fiberRoot.alternate = currentRoot;
      workInProgressRoot = fiberRoot;
    } else {
      workInProgressRoot = {
        ...currentRoot,
        alternate: currentRoot
      }
    }
  } else {
    if (fiberRoot) {
      workInProgressRoot = fiberRoot;
    }
  }
  nextUnitOfWork = workInProgressRoot;
  if (workInProgressRoot) {
    workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null;
  }
  // workLoop({timeRemaining: ()=>{return 10}});
  window.requestIdleCallback(workLoop, { timeout: 500 })
}

/**
 * 开启工作循环，每一步执行一个fiber节点的对比，在当前帧有空闲时间时执行
 * @param deadline 当前渲染帧的信息
 */
function workLoop(deadline: any) {
  let shouldYeild = false;
  while (nextUnitOfWork && !shouldYeild) {// 有可工作单元，并且当前帧有空余时间
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork) // 执行当前工作对象并且返回下一个要执行的对象
    shouldYeild = deadline.timeRemaining() < 1; // 当前帧是否还有空闲
  }
  if (!nextUnitOfWork) {// 如果不存在工作单元说明遍历完成了
    // complteRoot();
    console.log('commit start')
    console.log(workInProgressRoot);
    commitRoot()
    currentRoot = workInProgressRoot
    workInProgressRoot = null;
  } else {// 存在工作单元说明，当前帧没有空闲了，在下一帧继续工作
    window.requestIdleCallback(workLoop, { timeout: 500 })
  }
}

function performUnitOfWork(currentFiber: Fiber | FiberRoot): Fiber | null {
  console.log(currentFiber.type)
  beginWork(currentFiber)
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    complteUnitOfWork(currentFiber as Fiber) // 没有子节点说明当前节点完成了diff
    if (currentFiber.sibling) {
      return currentFiber.sibling
    }
    currentFiber = (currentFiber as Fiber).return as Fiber;
  }
  return null;
}

function complteUnitOfWork(fiber: Fiber) { // 需要更新当前节点的effect链
  const returnFiber = fiber.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) { // 父节点还没有effect元素
      returnFiber.firstEffect = fiber.firstEffect
    }
    if (fiber.lastEffect) { // 当前有effect向上传递
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = fiber.firstEffect;
      }
      returnFiber.lastEffect = fiber.lastEffect;
    }
    const effecttag = fiber.effectTag;
    if (effecttag) {
      if (!!returnFiber.lastEffect) { // 当前父节点已经有effect直接插入
        returnFiber.lastEffect.nextEffect = fiber;
      } else {
        returnFiber.firstEffect = fiber
      }
      returnFiber.lastEffect = fiber;
    }
  }
}
/**
 * commit阶段，完成对work阶段收集的effect进行处理
 */
function commitRoot() {
  deletions.forEach(commitWork);
  deletions.length = 0;
  let currentEffect = workInProgressRoot?.firstEffect
  while (currentEffect) {
    commitWork(currentEffect);
    currentEffect = currentEffect.nextEffect;
  }

}

function commitWork(fiber: Fiber) {
  if (!fiber) {
    return
  }
  let returnFiber = fiber.return;
  while (returnFiber?.tag !== TAG_TEXT && returnFiber?.tag !== TAG_HOST && returnFiber?.tag !== TAG_ROOT) { // 函数组件不是实际dom节点，需要找到挂载点
    returnFiber = returnFiber?.return
  }
  const returnDOM = returnFiber?.stateNode;
  const effectTag = fiber.effectTag;
  if (effectTag === PLACEMENT) {
    let nextFiber = fiber
    while (nextFiber && nextFiber.tag !== TAG_TEXT && nextFiber.tag !== TAG_HOST) { // 函数组件不是实际dom节点，需要找到挂载点
      nextFiber = nextFiber?.child as Fiber
    }
    returnDOM?.appendChild(nextFiber.stateNode as HTMLElement);
  } else if (effectTag === UPDATE) {
    if (fiber.tag === TAG_TEXT) {
      if (fiber.alternate?.props.text !== fiber.props.text) {
        (fiber.stateNode as Text).textContent = fiber.props.text
      }
    } else {
      updateDOM(fiber.stateNode as HTMLElement, fiber.alternate?.props as RObject, fiber.props)
    }
  } else if (effectTag === DELETION) {
    returnDOM?.removeChild(fiber.stateNode as HTMLElement);
  }
}

function beginWork(currentFiber: Fiber | FiberRoot) {
  const tag = currentFiber.tag;
  if (tag === TAG_ROOT) { // 当前是root节点时
    updateFiberRoot(currentFiber as FiberRoot);
  } else if (tag === TAG_HOST) {
    updateFiberHost(currentFiber as Fiber);
  } else if (tag === TAG_TEXT) {
    updateFiberText(currentFiber as Fiber);
  } else if (tag === TAG_CLASS_COMPONENT) {
    updateClassComponent(currentFiber as Fiber)
  } else if (tag === TAG_FUNCTION_COMPONENT) {
    updateFunctionComponent(currentFiber as Fiber)
  }
}


/**
 * 对root节点进行更新
 * @param fiber 
 */
function updateFiberRoot(fiber: FiberRoot) {
  const children = fiber.props.children;
  reconcileChildren(fiber, children);
}

function updateFiberHost(fiber: Fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber);
  }
  reconcileChildren(fiber, fiber.props.children)
}

function updateFiberText(fiber: Fiber) {
  if (!fiber.stateNode) {
    fiber.stateNode = createDom(fiber);
  }
}

function updateClassComponent(fiber: Fiber) {
  if (!fiber.stateNode) {
    // @ts-ignore
    fiber.stateNode = new fiber.type(fiber.props);
    if (fiber.stateNode) {
      (fiber.stateNode as RObject).internalFiber = fiber
    }
  }
  let stateNode = fiber.stateNode as RObject
  stateNode.state = fiber.updateQueue?.forceUpdate(stateNode.state)
  const newChildren = stateNode.render()
  reconcileChildren(fiber, [newChildren])
}

function updateFunctionComponent(fiber: Fiber) {
  workProgressFiber = fiber
  hookIndex = 0
  workProgressFiber.hooks = []
  // @ts-ignore
  const newChildren = [fiber?.type(fiber.props)]
  reconcileChildren(fiber, newChildren)
}

/**
 * 对当前fiber的chlidren进行diff
 * oldFiber为链表，newChildren为数组
 * @param currentFiber 
 * @param newChildren 
 */
function reconcileChildren(currentFiber: Fiber | FiberRoot, newChildren: Array<ReactElement>) {
  let index = 0;
  let len = newChildren.length;
  let oldFiber = (currentFiber.alternate && currentFiber.alternate.child) || null;
  let prevChild: Fiber | null = null;
  while (index < len || oldFiber) {
    let newChild = newChildren[index];
    let type = newChild && newChild.type;
    let sameType = oldFiber && oldFiber.type === type;
    let newFiber: Fiber | null = null;
    let tag; // 根据jsx的type类型生成tag标记
    if (type === TEXT_ELEMENT) {
      tag = TAG_TEXT
    } else if (typeof type === 'string') {
      tag = TAG_HOST
    } else if (typeof type === 'function' && (type as any).isReactComponent) {
      tag = TAG_CLASS_COMPONENT
    } else if (typeof type === 'function') {
      tag = TAG_FUNCTION_COMPONENT
    }
    if (!tag) return
    if (sameType) {// 如果相同更新节点
      if (oldFiber?.alternate) { // 如果有节点可以复用
        newFiber = oldFiber.alternate
        newFiber.props = newChild.props
        newFiber.alternate = oldFiber
        newFiber.effectTag = UPDATE
        newFiber.nextEffect = null;
        newFiber.firstEffect = null;
        newFiber.lastEffect = null;
        newFiber.updateQueue = oldFiber.updateQueue || new UpdateQueue()
      } else {
        newFiber = {
          type: newChild.type as string,
          tag: tag,
          alternate: oldFiber,
          stateNode: oldFiber?.stateNode || null,
          effectTag: UPDATE,
          props: newChild.props,
          updateQueue: oldFiber?.updateQueue || new UpdateQueue(),
          return: currentFiber as Fiber
        }
      }

    } else {// 不相同
      if (newChild) {
        newFiber = {
          type: newChild.type as string,
          tag: tag,
          alternate: oldFiber,
          stateNode: null,
          effectTag: PLACEMENT,
          props: newChild.props,
          return: currentFiber as Fiber,
          updateQueue: new UpdateQueue()
        }
      }
      if (oldFiber) {
        oldFiber.effectTag = DELETION;
        deletions.push(oldFiber)
      }
    }
    if (index === 0) { // 第一次比较维护父子关系
      currentFiber.child = newFiber
    } else { // 不是第一次维护兄弟关系
      /* tslint:disable */
      prevChild && (prevChild.sibling = newFiber)
    }
    prevChild = newFiber; // 由于有兄弟关系要维护这里留给下一次对比使用
    if (oldFiber) {
      oldFiber = oldFiber?.sibling || null; // 维护链表指针关系
    }
    index++; // 数组索引同时增加
  }
}

export function useReducer(reducer: Function|null, initValue:RObject){
  let newHooks:any = workProgressFiber?.alternate && workProgressFiber.alternate.hooks && workProgressFiber.alternate.hooks[hookIndex]
  if(newHooks){
    newHooks.state = newHooks.updateQueue.forceUpdate(newHooks.state)
  }else{
    newHooks = {
      state: initValue,
      updateQueue: new UpdateQueue()
    }
  }
  const dispatch = (action:any) => {
    newHooks.updateQueue.enqueueState(new Update(reducer ? reducer(newHooks.state, action) : action))
    scheduleRoot()
  }
  if(workProgressFiber && workProgressFiber.hooks){
    workProgressFiber.hooks[hookIndex++] = newHooks
  }
  console.log(newHooks)
  return [newHooks.state, dispatch]
}