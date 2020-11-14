Function.prototype.apply = function (context, arr) {
  if (!context) {
    context = window || global;
  }
  if (typeof context !== "object" || typeof context !== "function") {
    context = new Object(context);
  }
  context.fn = this;
  var args = [];
  for (let i = 0; i < arguments.length; i++) {
    args.push(`arr[${i}]`);
  }
  var result = eval(`context.fn(${args.join(",")})`);
  delete context.fn;
  return result;
};

function test(a, b) {
  console.log(a, b);
  console.log(this.name);
}

test.apply({ name: "outer" }, ["m", "n"]);
