import { ReactElement } from "react";
import { TAG_ROOT } from "./constants";
import { FiberRoot } from "./type";
import { scheduleRoot } from "./schedule";

/**
 * 渲染的入口方法
 * @param element 
 * @param container 
 */
function render(element:ReactElement,container: HTMLElement|null){
  const fiberRoot: FiberRoot = { // 生成fiberRoot根元素
    type: TAG_ROOT,
    stateNode: container,
    tag: TAG_ROOT,
    props: {
      children: [element]
    }
  }
  scheduleRoot(fiberRoot);
}

export default{
  render
}