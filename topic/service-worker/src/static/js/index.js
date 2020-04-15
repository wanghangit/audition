window.addEventListener("load", function(){
  if('serviceWorker' in navigator){
    console.log(navigator)
    navigator.serviceWorker.register("/sw.js", {scope: '/'}).then((register) => {
      console.log('注册成功'+register)
    }, (err) => {
      console.log('注册失败'+err)
    })
  }
})
