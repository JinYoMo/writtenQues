//实现Promise代码
//定义常量 有利于复用且有代码提示
const PENDING = 'pending'; //等待
const FULFILLED = 'fulfilled'; //成功
const REJECTED = 'rejected'; //失败

class MyPromise {
    //执行器 立即执行
    //用构造函数constructor来接收这个执行器executor
    constructor(executor) {
        //执行器错误捕获
        try {
            executor(this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    };
    //定义实例属性
    //promise 状态 默认为等待状态
    status = PENDING;
    //成功之后的值
    value = undefined;
    //失败后的原因
    reason = undefined;
    //成功回调(异步多次调用then方法) 调用一次then successCallback=undifined
    successCallback = [];
    //失败回调(异步多次调用then方法) 调用一次then failCallback=undifined
    failCallback = [];
    //resolve reject 判断状态 更改状态 保存值 异步情况则需要判断成功/失败回调函数是否存在 存在则调用
    resolve = value => { //将resolve reject定义为箭头函数目的是为了让这个函数内部的this指向这个类的实例对象，就是指向promise对象
        //如果状态不是等待 阻止程序向下执行 一旦状态确定不可更改
        if (this.status !== PENDING) return;
        //将状态更改为成功
        this.status = FULFILLED;
        //保存成功之后的值
        this.value = value;
        //判断成功回调是否存在 如果存在 调用
        // this.successCallback && this.successCallback(this.value);
        while (this.successCallback.length) this.successCallback.shift()();
    };
    reject = reason => {
        //如果状态不是等待 阻止程序向下执行 一旦状态确定不可更改
        if (this.status !== PENDING) return;
        //将状态更改为失败
        this.status = REJECTED;
        //保存失败后的原因
        this.reason = reason;
        //判断失败函数是否存在 如果存在 调用
        // this.failCallback && this.failCallback(this.reason);
        while (this.failCallback.length) this.failCallback.shift()();
    };
    //then方法被定义在原型对象中
    then(successCallback, failCallback) {
        //then方法参数变为可选参数 then方法的状态会向下传递
        successCallback = successCallback ? successCallback : value => value;
        failCallback = failCallback ? failCallback : reason => { throw reason };
        //实现链式调用 then方法需要返回新的promise
        let promise2 = new MyPromise((resolve, reject) => { //执行器立即执行
            //判断状态 将成功的值和失败的原因传给成功和失败的回调函数
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value); //拿到上一个then回调函数的返回值x 将返回值传递给下一个then的回调函数
                        //判断x的值是普通值还是promise对象
                        //如果是普通值 直接调用resolve 
                        //如果是promise对象 查看promise对象返回的结果
                        //再根据promise对象返回的结果 决定调用resolve 还是调用reject
                        resolvePromise(promise2, x, resolve, reject) //promise2在同步情况下获取不到，因为当前promise2还未定义好，因此解决方法为在异步代码中执行，等全部同步代码执行完毕后再执行，此时promise2已创建好就可以获取到了
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = failCallback(this.reason); //拿到上一个then回调函数的返回值x 将返回值传递给下一个then的回调函数
                        //判断x的值是普通值还是promise对象
                        //如果是普通值 直接调用resolve 
                        //如果是promise对象 查看promise对象返回的结果
                        //再根据promise对象返回的结果 决定调用resolve 还是调用reject
                        resolvePromise(promise2, x, resolve, reject) //promise2在同步情况下获取不到，因为当前promise2还未定义好，因此解决方法为在异步代码中执行，等全部同步代码执行完毕后再执行，此时promise2已创建好就可以获取到了
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            } else {
                //等待
                //将成功回调和失败回调存储起来 调用一次then this.successCallback=successCallback this.failCallback=failCallback
                //异步多次调用then
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value); //拿到上一个then回调函数的返回值x 将返回值传递给下一个then的回调函数
                            //判断x的值是普通值还是promise对象
                            //如果是普通值 直接调用resolve 
                            //如果是promise对象 查看promise对象返回的结果
                            //再根据promise对象返回的结果 决定调用resolve 还是调用reject
                            resolvePromise(promise2, x, resolve, reject) //promise2在同步情况下获取不到，因为当前promise2还未定义好，因此解决方法为在异步代码中执行，等全部同步代码执行完毕后再执行，此时promise2已创建好就可以获取到了
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });
                this.failCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason); //拿到上一个then回调函数的返回值x 将返回值传递给下一个then的回调函数
                            //判断x的值是普通值还是promise对象
                            //如果是普通值 直接调用resolve 
                            //如果是promise对象 查看promise对象返回的结果
                            //再根据promise对象返回的结果 决定调用resolve 还是调用reject
                            resolvePromise(promise2, x, resolve, reject) //promise2在同步情况下获取不到，因为当前promise2还未定义好，因此解决方法为在异步代码中执行，等全部同步代码执行完毕后再执行，此时promise2已创建好就可以获取到了
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });
            };
        });
        return promise2;
    };
    //all方法为静态方法 用static声明
    static all(array) {
        let result = [];
        let index = 0;
        return new MyPromise((resolve, reject) => {
            //将值放入结果数组中
            //问题：for循环一瞬间执行完，在执行for循环时参与了异步操作，要等待所有的异步操作全部执行完成才能调用resolve方法结束all方法的状态;
            //解决：当添加值的个数与数组长度相等，执行resolve;避免存在异步操作未执行完就将结果打印出来
            function addData(key, value) {
                result[key] = value;
                index++;
                //所有异步操作均执行完成
                if (index === array.length) {
                    resolve(result);
                }
            };
            for (let i = 0; i < array.length; i++) {
                let current = array[i];
                //current为MyPromise的一个实例 表明current是一个promise对象
                //若为promise对象，先去执行这个promise对象，执行后若为成功状态，则将成功后返回的值添加到结果数组中;若为失败状态，直接调用rejected,让promise.all的状态是失败的(有一个失败便为失败)
                if (current instanceof MyPromise) {
                    current.then(value => addData(i, value), reason => reject(reason));
                } else {
                    //current为普通值
                    addData(i, array[i]);
                }
            }
        })
    };
    static resolve(value) {
        //promise 对象 则直接返回promise对象
        if (value instanceof MyPromise) return value;
        //普通值 包裹在新创建的promise对象中返回
        return new MyPromise(resolve => resolve(value));
    }
}

function resolvePromise(promise2, x, resolve, reject) {
    //如果当前promise.then方法返回的对象promise2，与成功/失败回调函数返回的x相等的话，即自己返回自己，返回错误提示，并阻止向下执行
    if (promise2 === x) {
        return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
    }
    if (x instanceof MyPromise) {
        //promise对象
        // x.then(value=>{resolve(value)},reason=>{reject(reason)})
        x.then(resolve, reject); //查看promise状态 并且把状态传递给下一个promise对象
    } else {
        //普通值
        resolve(x) //直接将返回值传递给下一个promise对象
    }
}
module.exports = MyPromise; //对MyPromise类进行导出 在node环境下 使用CommonJS的模块规范进行导出