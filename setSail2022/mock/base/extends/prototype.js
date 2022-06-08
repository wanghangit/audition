/**
 * 最基本的继承方式，原型继承，直接将原型指向父级的一个实例
 * 缺点: 原型属性共享，父级的构造函数没有执行
 */

function Person(name){
    this.name = name;
}
Person.prototype = {
    constructor: Person, // 必须要重写
    eat: function(){
        console.log(this.name+'eating');
    },
    foods: ['apple', 'orange']
}

function A(age){
    this.age = age;
}

A.prototype = new Person();

const a = new A(18);
const a2 = new A(19);
console.log(a.foods)
a.foods.push('banana');
console.log(a.foods);
console.log(a2.foods)