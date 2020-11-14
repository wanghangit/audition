const debounce = (fn, time=50) => {
  var timer = null
  return (...args) => {
    if(timer){
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
    },time)
  }
}