exports.done = false;

var a = require('./a.js');

console.log(`在b中a.done的值为：`+a.done); //false
console.log(`在b中a.hello的值为：`+a.hello);//undefined

exports.done = true;