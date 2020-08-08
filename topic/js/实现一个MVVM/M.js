const isDirect = /v-([^-]+?)/; // 判断是不是指令
const isBind = /\{\{([0-9a-zA-Z\.]*)\}\}/;
const isPlainObject = (obj) => obj && typeof obj === "object";

/**
 * 实现一个双向绑定的基础类
 * 也是一个入口方法
 */
class M {
  constructor(options) {
    this.$el = this.query(options.el);
    this.$data = options.data;
    this.observe(this.$data);
    this.proxyData();
    this.compile();
  }
  proxyData() {
    Object.keys(this.$data).forEach((key) => {
      Object.defineProperty(this, key, {
        get() {
          return this.$data[key];
        },
        set(newVal) {
          this.$data[key] = newVal;
        },
      });
    });
  }
  observe(obj) {
    if (isPlainObject(obj)) {
      Object.keys(obj).forEach((key) => {
        if (isPlainObject(obj[key])) {
          this.observe(obj[key]);
        } else {
          this.defineReactive(obj, key, obj[key]);
        }
      });
    }
  }
  defineReactive(obj, key, val) {
    const dep = new Dep(this, key);
    Object.defineProperty(obj, key, {
      get() {
        console.log(`${val}被劫持了`);
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          console.log(`${val}更新了`);
          val = newVal;
          dep.notify();
        }
      },
    });
  }
  /**
   * 获取dom元素
   * @param {*} el
   */
  query(el) {
    if (!el) {
      throw new Error("options must has el");
    }
    if (typeof el === "string") {
      return document.querySelector(el);
    }
    if (el.nodeType === 1) {
      return el;
    }
    new Error("el is error");
  }
  /**
   * 在内存中获取node对象
   */
  compile() {
    new Compile(this);
  }
}

/**
 * 用来做模版编译
 */
class Compile {
  constructor(m) {
    this.vm = m;
    this.$el = m.$el;
    const node = this.node2Fragment();
    this.compileFragment(node);
    this.$el.appendChild(node);
  }
  node2Fragment() {
    // 首先将node节点转化为内存中的片段
    let node = document.createDocumentFragment();
    let curElement;
    const $el = this.$el;
    while ((curElement = $el.firstChild)) {
      node.appendChild(curElement);
    }
    return node;
  }
  compileFragment(nodes) {
    Array.from(nodes.childNodes).forEach((node) => {
      var text = node.nodeValue;
      if (isElementNode(node)) {
        this.compileElement(node);
      } else if (isTextNode(node) && isBind.test(text)) {
        this.compileText(node, RegExp.$1.trim());
      }
      if (node.childNodes && node.childNodes.length > 0) {
        this.compileFragment(node);
      }
    });
  }
  compileElement(node) {}
  compileText(node, exp) {
    compileUtil.text(node, this.vm, exp);
  }
}

function getVal(vm, exp) {
  let val;
  if (exp.indexOf(".") > -1) {
    let expArray = exp.split(".");
    val = expArray.reduce((prev, cur) => {
      return prev[cur];
    }, vm);
  } else {
    val = vmp[exp];
  }
  return val;
}
const updater = {
  textUpdater: function (node, value) {
    node.nodeValue = value;
  },
};
const compileUtil = {
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, "text");
  },
  bind: function (node, vm, exp, dir) {
    const updaterFn = updater[dir + "Updater"];
    updaterFn && updaterFn(node, getVal(vm, exp));
    new Watcher(vm,exp, function (val, oldVal) {
      updaterFn && updaterFn(node, val, oldVal);
    });
  },
};

// 判断是否是dom节点元素
function isElementNode(node) {
  return node.nodeType === 1;
}

// 判断是否是Text节点
function isTextNode(node) {
  return node.nodeType === 3;
}

class Watcher {
  constructor(vm, exp, cb) {
    this.vm = vm;
    this.exp = exp;
    this.cb = cb;
    this.depids = {};
    if (typeof expOrFn === "function") {
      this.getter = expOrFn;
    } else {
      this.getter = this.parseGetter(exp.trim());
    }
    this.value = this.get();
  }
  get() {
    const oldDep = Dep.target;
    Dep.target = this;
    var value = this.getter.call(this.vm, this.vm);
    Dep.target = oldDep;
    return value;
  }
  run() {
    const value = this.get();
    const oldValue = this.value;
    if (value !== oldValue) {
      this.value = value;
      this.cb.call(this.vm, value, oldValue);
    }
  }
  update() {
    this.run();
  }
  addDep(dep) {
    if (!this.depids[dep.id]) {
      dep.addWatcher(this);
      this.depids[dep.id] = dep;
    }
  }
  parseGetter(exp) {
    if (/[^\w.$]/.test(exp)) return;
    var exps = exp.split(".");
    return function (obj) {
      for (var i = 0, len = exps.length; i < len; i++) {
        if (!obj) return;
        obj = obj[exps[i]];
      }
      return obj;
    };
  }
}

class Dep {
  static target;
  static id = 0;
  constructor(vm, key) {
    this.deps = [];
    this.vm = vm;
    this.key = key;
    this.id = Dep.id++;
  }
  addWatcher(dep) {
    this.deps.push(dep);
  }
  depend() {
    Dep.target.addDep(this);
  }
  notify() {
    this.deps.forEach((dep) => {
      dep.update && dep.update();
    });
  }
}
