function debounce(fn,time){
  var timer = null
  return function(){
    if(!timer){
      clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, time)
    }
  }
}

function throttle(fn,time){
  var canUse = true
  return function(){
    if(canUse){
      canUse = false
      setTimeout(() => {
        fn.apply(fn, arguments)
        canUse = true
      },time)
    }
  }
}

function test1(){
  console.log('test debounce')
}
function test2(){
  console.log('test throttle')
}

(function(){
  var testdebounce = debounce(test1, 2000)
  var testthrottle = throttle(test2, 2000)
  setInterval(() => {
    testdebounce()
    testthrottle()
  }, 20)
})()