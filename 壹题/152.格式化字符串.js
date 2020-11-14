// 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。
// 示例一: 'abc' --> {value: 'abc'}
// 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

function normalize(str){
  const arr = str.split(/[\[\]]/g).filter(Boolean)
  var result = {}
  var cur
  for (let i = 0; i < arr.length; i++) {
    if(i!==0){
      cur.children ={}
      cur.children.value = arr[i]
      cur = cur.children
    }else{
      result.value = arr[i]
      cur = result
    }
  }
  return result
}

console.log(normalize("[abc[bcd[def]]]"))