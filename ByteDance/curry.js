//字节跳动一面面试题  实现求和sum，支持sum(1), sum(1,2,3,4), sum(1)(2)(3),  console.log(sum(1)(2,3)(4)) = 10
/**
 * 安装lodash npm i lodash
 * 通过lodash当中的curry柯里化函数实现
 * 原理：创建一个函数，该函数接收一个或多个func的参数，如果func所需要的参数都被提供，则执行func并返回执行的结果。否则继续返回该函数并等待接收剩余的参数
 */
//
_=require('lodash')
function getSum(a,b,c,d){
  return a+b+c+d;
}
let sumCurried=_.curry(getSum);
console.log(sumCurried(1))  //Fuction
console.log(sumCurried(1,2,3,4)) //10
console.log(sumCurried(1,2,3)) //Function
console.log(sumCurried(1)(2)(3)(4)) //10
console.log(sumCurried(1)(2,3)(4)) //10
console.log(sumCurried(1)(2,3,4)) //10