/**
 * 实现一个new 操作符
 * @param {*} fn 
 * 1. 在堆中创造一个新的对象
 * 2. 原型继承自函数fn
 * 3. 执行函数的方法
 * 4. 判断返回的类型是不是Object，Function，Date，等对象类型，如果是就返回如果不是就返回this
 */
function createNew(fn) {
  if (typeof fn !== "function") {
    throw new Error("fn is not a function");
  }
  // 创建一个全新的对象，原型继承
  var obj = Object.create(fn.prototype);
  // 获取参数
  var args = Array.prototype.slice.call(arguments, 1);
  // 执行并绑定this
  var result = fn.apply(obj, args);
  // 判断是否有返回
  if (
    (typeof result === "object" && result !== null) ||
    typeof result === "function"
  ) {
    result;
  }
  return obj;
}

/**测试 */
function Person() {
  this.name = "xiaoming";
  return function() {};
}
console.log(new Person());
console.log(createNew(Person));
