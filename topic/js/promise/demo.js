new Promise((resolve, reject) => {
  console.log("promise1");
  resolve();
})
  .then(() => {
    console.log("then11");
    new Promise((resolve, reject) => {
      console.log("promise2");
      resolve();
    })
      .then(() => {
        console.log("then21");
      })
      .then(() => {
        console.log("then22");
      });
  })
  .then(() => {
    console.log("then12");
  });
// promise1->then11->promise2->then21->then12->then22
// 主要考察then中函数的执行时机，then和resolve谁先触发谁执行异步callback