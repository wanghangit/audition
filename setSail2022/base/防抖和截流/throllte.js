/* 
 * @Author: wanghan 
 * @Date: 2022-04-09 15:07:49 
 * @Last Modified by: wanghan
 * @Last Modified time: 2022-04-09 15:11:08
 * 比较全面的节流方法，第一次可以延迟执行，
 * 当下一个任务已经超过delay时间时立即执行，相对来说保证1段时间内有任务在执行
 */


function throttle(fn, delay){
    let start = Date.now();
    let timer = null;
    return function(){
        const cur = Date.now();
        const remainTime = delay- (cur - start);
        const context = this;
        clearTimeout(timer);
        if(remainTime<0){
            fn.apply(context, arguments);
            startTime = Date.now();
        }else{
            timer = setTimeout(function(){
                fn.apply(context, arguments);
                startTime = Date.now();
            }, remainTime);
        }
    }
}