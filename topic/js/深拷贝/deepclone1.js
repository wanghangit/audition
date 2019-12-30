/**
 * 深拷贝的第一个版本
 * 简单的深度遍历复制
 * 有很多问题没有解决
 * 原型的拷贝，循环引用，暴栈的问题
 * @param {*} source 
 */
function deep1(source){
  if(!isObject(source)){
    return source
  }
  if(isArray(source)){
    let array = new Array(source.length)
    for (let index = 0; index < source.length; index++) {
      array[index] = deep1(source[index])
    }
    return array
  }
  if(isPlainObject(source)){
    let obj = {}
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        obj[key] = deep1(source[key])
      }
    }
    return obj
  }
}
