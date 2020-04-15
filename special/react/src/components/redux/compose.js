function f1() {
  console.log('f1')
}

function f2() {
  console.log('f2')
}

function f3() {
  console.log('f3')
}

function compose(...args) {
  if (args.length === 0) {
    return function () {
      console.log('empty')
    }
  } else if (args.length === 1) {
    return args[0]
  } else {
    return args.reduce((prev, cur) => {
      console.log(prev);
      return (...arg) => cur(prev(...arg))
    })
  }
}

compose(f1, f2, f3)()