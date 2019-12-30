const MyPromise = require("./MyPromise")

const p1 = new MyPromise(function(resolve, reject){
  console.log(`new1`)
  resolve(1)
})
var p2 = p1.then((v) => {
  console.log(`p1${v}`)
  // return new MyPromise(function(resolve){
  //   resolve(3)
  // })
})
// var p3 = p2.then((v) => console.log(`p2${v}`))