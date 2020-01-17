const isObject = result => typeof result === 'object' && result !== null

/**
 * 实现一个bind方法
 * @param {Object} obj
 * 1. 方法要返回一个新的函数bound
 * 2. 新的函数this上下文要绑定到传入的obj
 * 3. 调用的时候传入的参数，保留和最终调用bound时的参数合并
 * 4. 还需要对bound执行new实例化进行处理
 */
function myBind(obj) {
  // 先进行类型校验
  if (typeof this !== "function") {
    throw new Error(this + "is not a function");
  }
  var self = this
  // 获取生层函数时传入的其他参数
  var argWrapper = [].slice.call(arguments, 1)

  function bound(){
    // 获取内层函数执行时获取的参数
    var argInner = [].slice.call(arguments)
    var args = argWrapper.concat(argInner)
    // 这里判断是不是通过new操作符调用
    if(this instanceof bound){
      // 实现原型的继承
      if(self.prototype){
        function Empty(){}
        Empty.prototype = self.prototype
        bound.prototype = new Empty()
      }
      var result = self.apply(this, args)
      if(isObject(result) || typeof result === 'function'){
        return result
      }
      return this
    }else{
      self.apply(obj, args)
    }

  }
  return bound
};

Function.prototype.myBind = myBind

/**测试代码 */
var obj = {
  name: 'xiaoming',
  age: 18
}
function person(a,b){
  console.log(this)
  console.log(a, b)
  this.a = a;
  this.b = b;
}
var bindFn1 = person.myBind(obj, 'a')
bindFn1('b')
console.log(new bindFn1())


