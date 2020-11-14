function add(a,b,c){
  return a+b+c
}

function curry(fn){
  return inner = function(){
    const arg = [].slice.call(arguments)
    if(arg.length === fn.length){
      return fn.apply(null, arg)
    }else{
      return function(...args){
        return inner(...args, ...arg)
      }
    }
  }
}

const addCurry = curry(add)
console.log(addCurry(1)(2)(3))