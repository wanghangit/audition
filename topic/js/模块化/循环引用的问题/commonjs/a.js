exports.done = false;

var b = require('./b.js');

exports.hello = false;

console.log(`在a中b.done的值为：`+b.done);//true

exports.done = true;