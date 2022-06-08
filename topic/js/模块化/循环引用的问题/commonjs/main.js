var a = require('./a.js');
var b = require('./b.js');
console.log(a.done,b.done,b.hello, a.hello);

var a1 = require('./a.js');
var b1 = require('./b.js');
console.log(a1.done,b1.done,b.hello, a.hello);