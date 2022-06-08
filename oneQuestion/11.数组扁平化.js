/**
 * 已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];

function makeArray(array){
  var result = []
  var set = new Set()
  make(array, result, set)
  result.sort((a,b) => a-b)
  return result
}
function make(array, result,set){
  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if(Array.isArray(element)){
      make(element, result, set)
    }else{
      if(!set.has(element)){
        set.add(element)
        result.push(element)
      }
    }
  }
}

console.log(makeArray(arr))