/*
 * @Author: wanghan 
 * @Date: 2022-04-09 15:09:42 
 * @Last Modified by: wanghan
 * @Last Modified time: 2022-04-09 15:12:15
 * 防抖方法，用户在输入停止一段时间后执行回调，比较明显的就是输入框
 */

function debounce(fn, delay) {
    let timer = null;
    return function(){
        clearTimeout(timer);
        const context = this;
        timer = setTimeout(function(){
            fn.apply(context, arguments);
        }, delay);
    }
}
