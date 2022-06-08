# Proxy&Reflect

## Proxy

1. 可以代理属性
2. proxy 实例也可以作为原型使用
3. 第三个参数 receiver 指向调用当前属性的原对象
4. **不能对 this 进行正确处理，this 指向 handler 对象**

## Reflect

1. 新的对象设置特性会在 Reflect 上增加
2. Reflec.set()成功失败会返回 boolean 值，不会报错
3. object 操作变成函数调用例如

    ```javascript
    // 老写法
    "assign" in Object; // true
    // 新写法
    Reflect.has(Object, "assign"); // true
    ```

4. 与 Proxy 方法一一对应
5. 如果 name 属性部署了读取函数（getter），则读取函数的 this 绑定 receiver。

    ```javascript
    var myObject = {
        foo: 1,
        bar: 2,
        get baz() {
            return this.foo + this.bar;
        },
    };
    var myReceiverObject = {
        foo: 4,
        bar: 4,
    };
    Reflect.get(myObject, "baz", myReceiverObject); // 8
    ```
