const throttle = (fn, time = 50) => {
  let flag = true;
  return (args) => {
    if (flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, time);
  };
};
