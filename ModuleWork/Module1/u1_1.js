// 模块一 第一部分函数式编程与JS异步编程、手写Promise 简答题
/**
 * 谈谈你是如何理解JS异步编程的，EventLoop、x消息队列都是做什么的，什么是宏任务，什么是微任务？
 * 
 * 解答如下:
 * 1.js异步编程
 * 》因为最早的js主要是处理页面的交互，其核心就是DOM操作，这决定了js的引擎是以单线程模式执行js代码。这就会出现一个问题，假如在执行的过程中，存在一个特别耗时的任务，就会阻塞后面的代码执行。
 * 》为了解决耗时任务阻塞执行的问题，js将任务的执行模式分成了两种：同步模式、异步模式
 * 》同步模式：就是任务排队依次执行
 * 》异步模式：就是通过回调函数的形式将所要执行的函数，放到任务队列中，不占用主线程，只有等主线程执行完毕后，才通知请求执行任务，然后才将任务从任务队列中加入到主线程中执行。
 * 2.EventLoop
 * 》事件循环是我们使用异步的原理，是指浏览器一种解决JS单线程运行时的一种机制。
 * 》事件循环主要是负责监听调用栈Call Stack和消息队列
 * 》一旦Call Stack调用栈里面的任务结束了，EventLoop就开始工作了
 * 3.消息队列
 * 》消息队列是一种数据结构,主要是存放那些异步的回调任务的
 * 4.宏任务&微任务
 * 》ES6规范中，microtask称为jobs，macrotask称为task
 * 》宏任务是由宿主发起的，消息队列中的每个任务都是宏任务，而微任务是由Javascript自身发起的。
 * 》执行栈在完全同步任务之后，会去执行任务队列中的宏任务，每次宏任务执行完毕之后，查看相应的微任务队列是否为空，如果不为空，则会按照先进先出的规则全部执行完对应的微任务，如此循环，直至任务结束。
 * 
 */

 //代码题
 /**
  * 一、将下面异步代码使用Promise的方式改进
  */
//  setTimeout(()=>{
//    var a='hello';
//    setTimeout(()=>{
//      var b='lagou';
//      setTimeout(()=>{
//        var c='I * U';
//        console.log(a+b+c);
//      },10)
//    },10)
//  },10)

 //解答如下
function fn(value){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(value);
    },10)
  })
 }

fn().then(()=>{
  return fn('hello');
}).then(value=>{
  return fn(value+'lagou');
}).then(value=>{
  return fn(value+'I * U')
}).then(value=>{
  console.log(value);
})

/**
 * 二、基于以下代码完成下面的四个练习
 */
const fp=require('lodash/fp');
const cars=[
  {name:'Ferrari FF',horsepower:660,dollar_value:700000,in_stock:true},
  {name:'Spyker C12 Zagato',horsepower:650,dollar_value:648000,in_stock:false},
  {name:'Jaguar XKR-S',horsepower:550,dollar_value:132000,in_stock:false},
  {name:'Audi R8',horsepower:525,dollar_value:114200,in_stock:false},
  {name:'Aston Martin One-77',horsepower:750,dollar_value:1850000,in_stock:true},
  {name:'Pagani Huayra',horsepower:700,dollar_value:1300000,in_stock:false}
]
//练习1：使用函数组合fp.flowRight()重新实现下面这个函数
// let isLastInStock=function(cars){
//   //获取最后一条数据
//   let last_car=fp.last(cars);
//   //获取最后一条数据的in_stock属性值
//   return fp.prop('in_stock',last_car);
// }
//解答如下
let isLastInStock=fp.flowRight(fp.prop('in_stock'),fp.last);
// 测试输出
console.log(isLastInStock(cars));

//练习2 使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
let getFristName=fp.flowRight(fp.prop('name'),fp.first)
// 测试输出
console.log(getFristName(cars));

// 练习3 使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
let _average=function(xs){
  return fp.reduce(fp.add,0,xs)/xs.length;
} //->无须改动
// let averageDollarValue=function(cars){
//   let dollar_values=fp.map(function(car){
//     return car.dollar_value
//   },cars)
//   return _average(dollar_values)
// }
let averageDollarValue=fp.flowRight(_average,fp.map(x=>x.dollar_value))
// 测试输出
console.log(averageDollarValue(cars))

//练习4 使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把字符串中的name转换为这种形式：例如：sanitizeNames(["Hello World"])=>["hello_world"]
let _underscore=fp.replace(/\W+/g,'_')  //->无须改动 
// let conlog=v=>console.log(v);
// let sanitizeNames=fp.flowRight(_underscore,fp.toLower,fp.map(x=>x.name)); //console.log(sanitizeNames(cars))
let sanitizeNames=fp.map(fp.flowRight(_underscore,fp.toLower)); 
// 测试输出
console.log(sanitizeNames(["Hello World","Javascript Code"]))

/**
 * 三、基于下面提供的代码，完成后续的四个练习
 */
  class Container{
    static of(value){
      return new Container(value);
    }
    constructor(value){
      this._value=value;
    }
    map(fn){
      return Container.of(fn(this._value))
    }
  }
  class Maybe{
    static of(x){
      return new Maybe(x);
    }
    isNothing(){
      return this._value===null||this._value===undefined;
    }
    constructor(x){
      this._value=x;
    }
    map(fn){
      return this.isNothing()?this:Maybe.of(fn(this._value));
    }
  }
//练习1 使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
let maybe=Maybe.of([5,6,1]);
let ex1=(x)=>{
  //实现部分
  return maybe.map(fp.map(fp.add(x)))._value;
}
// 测试输出
console.log(ex1(2)) //Maybe { _value: [ 7, 8, 3 ] }

//练习2 实现一个函数ex2，能够使用fp.first获取列表的第一个元素
let xs=Container.of(['do','ray','me','fa','so','la','ti','do']);
let ex2=()=>{
  //实现部分
  return xs.map(fp.first)._value;
}
// 测试输出
console.log(ex2()) //Container { _value: 'do' }

// 练习3 实现一个函数ex3,使用safeProp和fp.first找到user的名字的首字母
let safeProp=fp.curry(function(x,o){
  return Maybe.of(o[x]);
})
let user={id:2,name:'Albert'};
let ex3=()=>{
  //实现部分
  return safeProp('name',user).map(fp.first)._value;
}
console.log(user['name'],ex3()) //Maybe { _value: 'A' }

//练习4 使用Maybe重写ex4，不要有if语句
// let ex4=function(n){
//   if(n){
//     return parseInt(n);
//   }
// }
// 解法一
// let ex4=function(n){
//   return Maybe.of(n).map(parseInt)._value;
// }
//解法二
let ex4=function(n){
  let m=new Maybe(n);
  return m.map(parseInt)._value;
}
// 测试输出
console.log(ex4('123a'))