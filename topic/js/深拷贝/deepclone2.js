/**
 * 还没有解决暴栈的问题
 * @param {*} source 
 * @param {*} map 
 */
function deep2(source, map = new WeakMap()){
  // 基本数据类型直接返回
  if(!isObject(source)){
    return source
  }
  // 使用map解决循环引用的问题，如果拷贝过直接返回
  if(map.has(source)){
    return map.get(source)
  }
  // 初始化拷贝的对象
  let target
  if(isArray(source)){
    target = new Array(source.length)
    map.set(source, target)
    for (let index = 0; index < source.length; index++) {
      target[index] = deep2(source[index], map)
    }
    return target
  }
  if(isPlainObject(source)){
    // 先检查对象是否有原型继承有的话继承原型
    target = isProperty(source) ? {} : Object.create(source.__proto__)
    map.set(source, target)
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        target[key] = deep2(source[key], map)
      }
    }
    return target
  }
}