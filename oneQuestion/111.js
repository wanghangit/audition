function t(obj) {
  var res = {};
  Object.keys(obj).forEach((key) => {
    var tmp = [];
    if (typeof obj[key] === "object") {
      t1(obj[key], [key]);
    } else {
      res[key] = obj[key];
    }
  });
  return res;
  function t1(obj, tmp) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === "object") {
        tmp.push(key);
        t1(obj[key], tmp);
        tmp.pop();
      } else {
        res[tmp.join(".")] = obj[key];
      }
    });
  }
}

var entry = {
  a: {
    b: {
      c: {
        dd: "abcdd",
      },
    },
    d: {
      xx: "adxx",
    },
    e: "ae",
  },
};

console.log(t(entry))