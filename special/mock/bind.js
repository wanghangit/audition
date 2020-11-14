Function.prototype.bind1 = function (context) {
  if (!context) {
    context = window || global;
  }
  const args = Array.prototype.slice.call(arguments, 1);
  var self = this; // 保存方法引用
  function fbound() {
    const bindArgs = Array.prototype.slice.call(arguments);
    self.apply(this instanceof self ? this : context, args.concat(bindArgs));
  }
  fbound.prototype = Object.create(this.prototype);
  return fbound;
};
/**************test *********/
var value = 2;

var foo = {
  value: 1,
};

function bar(name, age) {
  this.habit = "shopping";
  console.log(this.value);
  console.log(name);
  console.log(age);
}

bar.prototype.friend = "kevin";

var bindFoo = bar.bind1(foo, "daisy");

var obj = new bindFoo("18");
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
