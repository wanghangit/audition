/**
 * 输出是什么
 */
console.log(["1","2","3"].map(parseInt))

// [1,NAN,NAN]

// 其实map会传递2个参数所以会是这个结果