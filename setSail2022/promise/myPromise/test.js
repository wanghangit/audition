const MyPromise = require('./Promise');

function testNormal() {
    // 这个时候将promise定义一个p1，然后返回的时候返回p1这个promise
    const p1 = promise.then(value => {
        console.log(1)
        console.log('resolve', value)
        //    throw new Error('haha1')
        return 11
    }, (err) => {
        console.log(err.message)
    })

    // 运行的时候会走reject
    p1.then(value => {
        console.log(2)
        console.log('resolve', value)
    }, reason => {
        console.log(3)
        console.log(reason.message)
    })

    promise.then((res) => {
        console.log('resolve2', res)
    }, (err) => {
        console.log('reject2', err)
    })

    promise.then((res) => {
        console.log('resolve3', res)
    }, (err) => {
        console.log('reject3', err)
    })
}

function testNoParams() {
    const promise = new MyPromise((resolve, reject) => {
        // throw new Error('haha')
        reject(new Error('haha'));
        resolve('success')

    })
    promise.then().then().then().then(res => console.log(res), err => console.log(err))
}

function testStaticResolve() {
    MyPromise.resolve().then(() => {
        return MyPromise.resolve(4)
    }).then(res => {
        console.log(res)
    })
}



// testNoParams();
// testStaticResolve();

Promise.resolve(2).then((res) => {
    console.log(res)
    return res;
}).finally(() => {

}).then((res) => {
    console.log(res+'finally')
})