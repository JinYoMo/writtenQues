// 手写Promise
/**
 * 1.Promise就是一个类，在执行这个类的时候，需要传递一个执行器进去，执行器会立即执行
 * 2.Promise中有三种状态 分别为 fulfilled 成功 rejected 失败 pending 等待
 *   pending => fulfilled
 *   pending => rejected
 *   一旦状态确定就不可更改
 * 3.resolve和reject函数是用来更改状态的
 *   resolve: fulfilled
 *   reject: rejected
 * 4.then方法内部做的事情就是判断状态 如果状态是成功 调用成功的回调函数 如果状态是失败 调用失败的回调函数 then方法是被定义在原型对象中的
 * 5.then成功回调有一个参数 表示成功之后的值 then失败回调有一个参数，表示失败后的原因
 * 6.在执行器当中加入异步代码时，异步代码没有立即执行，而是等待2s执行 then方法要立即执行 判断当前状态 由于未调用resolve reject，当前状态一定是pending等待的
 *   此刻不知道是成功还是失败，因此不能直接调用成功/失败的回调函数 需要在then方法中将其存储起来 直到调用resolve/reject时在调用相应的回调函数
 * 7.同一个promise下面的then方法是可以被多次调用的，当状态变为成功或者失败时，多次所对应的回调函数是要依次被调用的;分为同步和异步 同步情况下已有状态，可依此调用 异步情况下then方法中的成功/失败的回调函数以数组的形式存储 直到调用resolve/reject时循环调用相应的回调函数
 * 8.promise下面的then方法是可以被链式调用的 后面then方法的回调函数拿到的值是上一个then方法回调函数的返回值 第一步:实现链式调用，即then方法返回一个新的promise对象 第二步：将上一个then方法的回调函数的返回值传递给下一个then方法的回调函数。
 * 9.链式调用promise下面的then方法时，在then方法的回调函数当中是可以返回promise对象的;但是有一种情况例外，then方法回调当中是不可以返回当前then方法它所返回的promise对象的，否则就会发生promise对象的循环调用，程序会报错
 * 10.捕获执行器当中的错误，可在构造函数中增加try/catch方法来捕获;捕获then方法中的错误，可在then方法返回的promise中使用try/catch方法来捕获
 * 11.then方法的两个参数为可选参数，可以不传递参数;不传递参数时,promise的状态会依次向后传递，会一直传递给有回调函数的then方法
 * 12.Promise.all方法解决异步并发问题，允许我们按照异步代码调用的顺序得到异步代码执行的结果;Promise.all方法接收一个数组作为参数,这个数组中可以是任何值，包括普通值和Promise对象
 *    这个数组当中值的顺序一定是得到的结果的顺序;Promise.all方法返回值也是Promise对象，可继续链式调用then方法；在all方法当中的Promise对象如果状态都是成功的，那么all方法最后的结果也是成功的，如果有一个结果是失败的，那么all方法最后的结果也是失败的
 *    调用方式为类.all方法,all方法一定是静态方法
 * 13.Promise.resolve方法作用是将给定的值转换为Promise对象，也就是说Promise.resolve方法的返回值就是一个promise对象
 *   判断给定值是普通值还是promise对象：若为普通值，在返回的promise对象当中会包裹给定的这个值，并将创建出来的promise对象作为resolve方法的返回值;若为promise对象，会将此promise对象直接作为resolve方法的返回值，通过then拿到该promise对象的返回值
    
 */

//导入MyPromise
const MyPromise = require('./myPromise');
let promise = new MyPromise((resolve, reject) => { //传递执行器 立即执行 这个回调函数就是这个执行器
    // throw new Error('executor error'); //抛出一个executor执行器错误
    //同步代码
    // resolve('同步成功'); //直接调用某个函数 调用的是普通函数 这个函数里的this指向window或者undifined
    reject('同步失败');
    //加入异步代码
    // setTimeout(() => {
    //     // resolve('异步成功');
    //     reject('异步失败');
    // }, 2000);
});
//promise.then方法多次调用
// promise.then(value => {
//     console.log(value);
// }, reason => {
//     console.log(reason);
// });
// promise.then(value => {
//     console.log(value);
// }, reason => {
//     console.log(reason);
// });
// promise.then(value => {
//     console.log(value);
// }, reason => {
//     console.log(reason);
// });
// //promise.then方法链式调用 返回值为普通值
// promise.then(value => {
//     console.log(value);
//     return 100; //返回值为成功回调的返回值
// }, reason => {
//     console.log(reason)
//     return 200; //返回成功则会进入到then的成功回调,返回失败则进入到then的失败回调
// }).then(value => {
//     console.log(value, 22); //200 22
// }, reason => {
//     console.log(reason)
// });
// //promise.then方法链式调用 返回值为promise对象
// function other() {
//     return new MyPromise((resolve, reject) => {
//         resolve('other'); //resolve1('other');测试
//     });
// }
// promise.then(value => {
//     console.log(value);
//     return other(); //返回值为成功回调的返回值
// }, reason => {
//     console.log(reason)
//     return other(); //返回成功则会进入到then的成功回调,返回失败则进入到then的失败回调
// }).then(value => {
//     console.log(value, 33); //other 33
// }, reason => {
//     console.log(reason.message)
// });
// // promise.then方法链式调用时不可以返回当前then返回的promise对象
// let p1 = promise.then(value => {
//     console.log(value);
//     return p1; //报错 promise对象被循环调用
// }, reason => {
//     console.log(reason);
//     return p1;
// });
// p1.then(value => {
//     console.log(value)
// }, reason => {
//     console.log(reason.message) //错误打印
// })
// //异常处理
// promise.then(value => {
//     console.log(value);
//     throw new Error('then error'); //抛出一个then错误
// }, reason => {
//     console.log(reason.message) //接收executor错误
// }).then(value => {
//     console.log(value);
// }, reason => {
//     console.log('a')
//     console.log(reason.message) //接收then错误
// })
//then方法参数变为可选参数 then方法的状态会向下传递
// promise
//     .then()
//     .then()
//     .then(value => console.log(value), reason => console.log(reason))
//Promise.all方法解决异步并发问题
function p1() {
    return new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve('p1'); //resolve方法延迟2s调用
        }, 2000);
    })
};

function p2() {
    return new MyPromise((resolve, reject) => {
        resolve('p2'); //resolve方法立即调用
    })
};
//promise.all方法中按照异步代码调用顺序得到异步代码执行结果
MyPromise.all(['a', 'b', p1(), p2(), 'c']).then(result => {
    console.log(result) //['a','b','p1','p2','c']
});
//Promise.resolve方法
function p3() {
    return new MyPromise((resolve, reject) => {
        resolve('hello');
    })
};
MyPromise.resolve(10).then(value => console.log(value));
MyPromise.resolve(p3()).then(value => console.log(value), reason => console.log(reason.message));