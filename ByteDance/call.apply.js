/**
 * Function.prototype.call()
 * call() 方法调用一个函数, 其具有一个指定的 this 值和多个参数(参数的列表)。
 * func.call(thisArg, arg1, arg2, ...)
 * 它运行 func，提供的第一个参数 thisArg 作为 this，后面的作为参数。
 */
// 例子
// 所以，call 主要实现了以下两个功能：
// call 改变了 this 的指向
// bottle 执行了 sayWord 函数

function sayWord() {
  var talk = [this.name, 'say', this.word].join(' ');
  console.log(talk);
}

var bottle = {
  name: 'bottle', 
  word: 'hello'
};

// 使用 call 将 bottle 传递为 sayWord 的 this
sayWord.call(bottle); 
// bottle say hello

/**
  * 模拟实现 call 有三步：
  * 1.将函数设置为对象的属性
  * 2.执行函数
  * 3.删除对象的这个属性} context 
 */
Function.prototype.call = function (context) {
  // 将函数设为对象的属性
  // 注意：非严格模式下, 
  //   指定为 null 和 undefined 的 this 值会自动指向全局对象(浏览器中就是 window 对象)
  //   值为原始值(数字，字符串，布尔值)的 this 会指向该原始值的自动包装对象(用 Object() 转换）
  context = context ? Object(context) : window; 
  context.fn = this;
    
  // 执行该函数
  let args = [...arguments].slice(1);
  let result = context.fn(...args);
    
  // 删除该函数
  delete context.fn
  // 注意：函数是可以有返回值的
  return result;
}

/**
 * apply() 方法调用一个具有给定 this 值的函数，以及作为一个数组（或[类似数组对象）提供的参数。
 * func.apply(thisArg, [argsArray])
 * 它运行 func 设置 this = context 并使用类数组对象 args 作为参数列表。
 * call 和 apply 之间唯一的语法区别是 call 接受一个参数列表，而 apply 则接受带有一个类数组对象。
 */

// 例如，这两个调用几乎相同：
func(1, 2, 3);
func.apply(context, [1, 2, 3])

// 模拟实现 apply
Function.prototype.apply = function (context, arr) {
    context = context ? Object(context) : window; 
    context.fn = this;
  
    let result;
    if (!arr) {
        result = context.fn();
    } else {
        result = context.fn(...arr);
    }
      
    delete context.fn
    return result;
}