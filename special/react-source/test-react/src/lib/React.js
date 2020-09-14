import { element_Text } from "./constants";
import { Update, UpdateQueue } from "./UpdateQueue";
import { scheduleRoot, useReducer, useState } from "./schedule";

/**
 * 创建reactElement元素
 * @param {*} type 组件类型
 * @param {*} config 组件配置
 * @param  {...any} children 组件子元素
 */
function createElement(type, config, ...children) {
  delete config.__self;
  delete config.__source;
  return {
    type,
    props: {
      ...config,
      children: children.map((c) =>
        typeof c === "object"
          ? c
          : {
              type: element_Text,
              props: { text: c, children: [] },
            }
      ),
    },
  };
}

class Component {
  constructor(props) {
    this.props = props;
    this.updateQueue = new UpdateQueue(); // updateQueue实际是在fiber对象上的
  }
  setState(payload) {
    const update = new Update(payload);
    this.internalFiber.updateQueue.equeueState(update);
    scheduleRoot();
  }
}

Component.prototype.isReactComponent = {};

export default {
  createElement,
  useReducer,
  useState,
  Component,
};
