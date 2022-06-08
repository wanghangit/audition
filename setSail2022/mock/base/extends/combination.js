/**
 * 组合式继承
 * 在子类中调用父类的构造函数，解决了父类不能初始化的问题，各自变量也不用共享，可以存在实例上
 * 问题是调用了2次父类的实例化方法new了2次
 */

function Animal(name,age){
    this.name = name;
    this.age = age;
    this.likes = [];
}
Animal.prototype = {
    constructor: Animal,
    eat: function(){
        console.log(this.name+' is eating')
    }
}

function Dog(name, age){
    Animal.call(this, name, age);
}

Dog.prototype = new Animal();

const d1 = new Dog('d1', 2);
const d2 = new Dog('d2', 3);
d1.likes.push('eat');
d2.likes.push('run')
console.log(d1.likes)
console.log(d2.likes)
d1.eat();