Function.prototype.call2 = function (context) {
  // 修正context指向
  if (!context) {
    context = window || global;
  }
  if (typeof context !== "object" || typeof context !== "function") {
    context = new Object(context);
  }
  // 先增加fn上的方法
  context.fn = this;
  // 拼接参数
  var args = [];
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`);
  }
  // 执行方法
  var result = eval(`context.fn(${args.join(",")})`);
  // 删除引用
  delete context.fn;
  // 返回结果
  return result;
};

function test(a, b) {
  console.log(a, b);
  console.log(this.name);
}

test.call2({ name: "outer" }, "m", "n");
