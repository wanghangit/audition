function deep3(source) {
  // 基本数据类型直接返回
  if (!isObject(source)) {
    return source;
  }
  // 采用弱引用，可以保证在下一次垃圾回收时map可以被回收省去了手动回收的过程
  const map = new WeakMap();
  // 初始化拷贝对象
  if (isArray(source)) {
    root = [];
  } else if (isPlainObject(source)) {
    root = isProperty(source) ? {} : Object.create(source.__proto__);
  }
  // 初始化一个栈
  const nodeList = [{ parent: root, key: undefined, data: source }];
  while(nodeList.length>0){
    const node = nodeList.pop()
    const { parent,key,data } = node
    let target = parent
    if(typeof key !== 'undefined'){
      target = parent[key]
      // 初始化拷贝对象
      if (isArray(data)) {
        target = parent[key] = [];
      } else if (isPlainObject(source)) {
        target = parent[key] = isProperty(source) ? {} : Object.create(source.__proto__);
      }
    }
    if(isObject(data)){
      let t = map.get(data)
      if(t){
        parent[key] = t
        continue
      }
      map.set(data, target)
    }else{
      parent[key] = data
    }
    if(isArray(data)){
      for (let i = 0; i < data.length; i++) {
        if(isObject(data[i])){
          nodeList.push({
            parent: target,
            key: i,
            data: data[i]
          })
        }else{
          target[i] = source
        }
      }
    }else{
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          if(isObject(data[key])){
            nodeList.push({
              parent: target,
              key: key,
              data: data[key]
            })
          }else{
            target[key] = data[key]
          }
        }
      }
    }
  }
  return root;
}
