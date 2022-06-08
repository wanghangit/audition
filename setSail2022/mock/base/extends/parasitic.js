/**
 * 寄生式继承，相对来说比较好的解决方案，减少了多次实例化父类带来的性能开销，改为实例化一个空函数
 * 只是完成了原型的改写
 */

function createObject(o) {
    function F(){};
    F.prototype = o;
    return new F();
}

function inherit(Parent, Child) {
    const f= createObject(Parent.prototype);
    Child.prototype = f;
    Child.prototype.constructor = Child;
}