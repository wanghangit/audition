Object.prototype.a = 'obj'
Function.prototype.b = 'func'

var parent = function(){}

var child = new parent()
console.log(parent.a,parent.b)
console.log(child.a, child.b)