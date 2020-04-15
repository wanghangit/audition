var number = 2;
var obj = {
  number: 4,
  /*匿名函数自调*/
  fn1: (function() {
    var number;
    this.number *= 2; //4

    number = number * 2; //NaN
    number = 3;
    return function() {
      var num = this.number;
      this.number *= 2; //6
      console.log(num);
      number *= 3; //9
      console.log(number);
    };
  })(),

  db2: function() {
    this.number *= 2;
  }
};

var fn1 = obj.fn1;

console.log(number);

fn1();

obj.fn1();

console.log(window.number);

console.log(obj.number);

