const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

const ajax1 = () =>
  timeout(2000).then(() => {
    console.log("1");
    return 1;
  });

const ajax2 = () =>
  timeout(1000).then(() => {
    console.log("2");
    return 2;
  });

const ajax3 = () =>
  timeout(2000).then(() => {
    console.log("3");
    return 3;
  });

/**
 *
 * @param {Array} ajaxArray
 */
const mergePromise = (ajaxArray) => {
  // return new Promise((resolve, reject) => {
  //   let result = [];
  //   let len = ajaxArray.length;
  //   let index = 0;
  //   let curAjax;
  //   function next() {
  //     if (index < len) {
  //       curAjax = ajaxArray[index];
  //       curAjax().then((data) => {
  //         result.push(data);
  //         index++;
  //         if (index < len) {
  //           next();
  //         } else {
  //           resolve(result);
  //         }
  //       });
  //     }
  //   }
  //   next();
  // });
  let promise = ajaxArray.map()
};

mergePromise([ajax1, ajax2, ajax3]).then((data) => {
  console.log("done");
  console.log(data);
});
