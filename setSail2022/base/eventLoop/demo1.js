async function async1(){
    console.log("async1 start");
    await async2();
    console.log("async1 end");
}
async function async2(){
    console.log("async2 start");
}
console.log('start');
setTimeout(()=> {
    console.log("setTimeouut");
}, 0)
async1();
new Promise((resolve, reject) => {
    console.log("promise1")
    resolve()
}).then(() => {
    console.log("promise2")
})
console.log('end');






// start
// async1 start
// async2 start
// promise1
// end
// async1 end
// promise2
// setTimeout