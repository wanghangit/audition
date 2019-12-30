const toString = Object.prototype.toString;
const isArray = value => toString.call(value) === "[object Array]";
const isPlainObject = value => toString.call(value) === "[object Object]";
const isObject = value => {
  return (
    value !== null && typeof value === 'object'
  );
};
// 检查是否有原型链继承
const isProperty = value => {
  return value.__proto__ === Object.prototype;
};
function createData(w, h){
  let data = {}
  let temp = data
  for (let i = 0; i < w; i++) {
    temp = temp.data = {}
    for (let j = 0; j < h; j++) {
      temp[j] = j
    }
  }
  return data
}