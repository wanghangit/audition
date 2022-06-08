// @ts-check
var a = 10;
function test(){
    var a = 20;
    console.log(a);
    console.log(this.a);
}
var obj = {
    a: 30,
    test
}

test()
obj.test();
// ​func();
// ​obj.func()