async function async1(){
    console.log("async1 start");
    await Promise.resolve();
    console.log("async1 end");
}
setTimeout(()=> {
    console.log("setTimeouut");
}, 0)
async1();
console.log('start');
Promise.resolve().then(() => {
    console.log("promise")
});