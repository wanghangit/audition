/**
 *
 * @param {Function} fn
 * @param  {...any} args
 */
function myNew(fn, ...args) {
  var obj = {};
  obj.__proto__= fn.prototype;
  var result = fn.apply(obj, args);
  if (typeof result === "object" && result !== null) {
    return result;
  } else {
    return obj;
  }
}

/************test */

Person.prototype.common = 'common'
function Person(name, age) {
  this.name = name;
  this.age = age;
  // return {
  //   name: 'test',
  //   age: 12
  // }
}


// const p  = new Person("xiaoming", 12)
const p = myNew(Person, "xiaoming", 12);
console.log(p.name, p.age, p.common);
// p.say()
