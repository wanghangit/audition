const toString = Object.prototype.toString
const isType = (type) => (obj) => toString.call(obj).slice(8,-1) === type
const isPlainObject = isType("Object")
const isArray = isType("Array")
const isDate = isType("Date")
const isObject = (obj) => obj !== null && typeof obj === 'object'
const hasPrototype = (obj) => (Object.getPrototypeOf(obj) !== Object.prototype)

function clone(source){
  if(!isObject(source)){
    return source
  }
  const map = new WeakMap();
  let root;
  if(isArray(source)){
    root = []
  }else{
    root = hasPrototype(source) ? Object.create(source.__proto__) : {}
  }
  const stack = [{parent: root, key: undefined, data:source}]
  while(stack.length>0){
    var cur = stack.pop()
    const {parent, key, data} = cur
    let res = parent
    if(key!==undefined){
      if(isArray(data)){
        res = parent[key] = []
      }else{
        res = parent[key] = hasPrototype(data) ? Object.create(data.__proto__) : {}
      }
    }
    if(!isObject(data)){
      res[key] = data
      return
    }
    if(map.has(data)){
      parent[key] = map.get(data)
      continue
    }else{
      map.set(data, res)
    }
    if(isArray(data)){
      data.forEach((value, index) => {
        if(isObject(value)){
          stack.push({
            parent: res,
            key: index,
            data: value
          })
        }else{
          res[i] = value
        }
      })
    }else{
      Object.keys(data).forEach((key) => {
        var value = data[key]
        if(isObject(value)){
          stack.push({
            parent: res,
            key,
            data: value
          })
        }else{
          res[key] = value
        }
      })
    }
  }
  return root;
}