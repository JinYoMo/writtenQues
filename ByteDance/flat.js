//字节一面面试题：数组拍平(扁平化)flat方法实现
/*
一段代码总结Array.prototype.flat()特性
  》Array.prototype.flat()用于将嵌套的数组拉平，变成一维数组，该方法返回一个新数组，对原数组没有影响
  》不传参数时，默认拉平一层，可以传入一个整数，表示想要拉平的层数
  》传入<=0的整数将返回原数组，不拉平
  》Infinity关键字作为参数时，无论多少层嵌套，都会转为一维数组
  》如果原数组有空位，Array.prototype.flat()会跳过空位
  形如：
  const arr=[1,[2,3],[4,[5,[6]],7]]
  不传参时，默认拉平一层
  arr.flat()  [1,2,3,4,[5,[6]],7]
  传入一个整数参数，整数即为拉平层数
  arr.flat(2) [1,2,3,4,5,[6],7]
  传入<=0的整数将返回原数组，不拉平
  arr.flat(0) arr.flat(-10) [1,[2,3],[4,[5,[6]],7]]
  若原数组有空位，flat()方法会跳过空位
  [1,[2,3],[4,[5,[6]],7],,].flat()  [1,[2,3],[4,[5,[6]],7]]
思路
  》遍历数组中的每一个元素 for循环 for...of for...in forEach() entries() keys() values() reduce() map()
  》判断元素是否为数组 true（以下不一定准确 typeof操作符对数组去类型将返回 object）
    arr instanceof Array 
    arr.constructor ===Array
    Object.prototype.toString.call(arr)==='[object Array]'
    Array.isArray(arr)
  》将数组的元素展开一层 扩展运算符+concat (合并多个数组)
*/
// let arr=[,1,[2,3],[4,[5,[6]],7,,[8,[9,,10,[11,12]]]],'string',{name:'蛋蛋'},,];
let arr=[1,[2,3],[4,[5,[6]],7,[8,[9,10,[11,12]]]],'string',{name:'蛋蛋'}];
// 第一问 基本代码实现
function flat(arr){
  let arrResult=[];
  arr.forEach(ele => {
    if(Array.isArray(ele)){
      // arrResult=arrResult.concat(arguments.callee(ele)); //递归
      arrResult.push(...arguments.callee(ele)); //或者使用扩展运算符
    }else{
      arrResult.push(ele);
    }
  });
  return arrResult
}
// console.log(flat(arr)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

//第二问 用reduce实现flat函数
function flat(arr){
  return arr.reduce((pre,cur)=>{
    if(Array.isArray(cur)){
      // pre=pre.concat(arguments.callee(cur));
      pre=pre.concat(flat(cur));  //用reduce展开一层+递归
      // pre.push(...flat(cur));
    }else{
      pre.push(cur)
    }
    return pre;
  },[])
}
// console.log(flat(arr)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

//第三问 使用栈的思想实现flat函数
function flat(arr){
  const arrResult=[];
  const stack=[].concat(arr); //将数组元素拷贝至栈，直接拷贝会改变原数组
  //如果栈不为空，则循环遍历
  while(stack.length!==0){ 
    const val = stack.pop();
    if(Array.isArray(val)){
      stack.push(...val);  //如果是数组，再次入栈，并且展开了一层
    }else{
      arrResult.unshift(val); //如果不是数组，直接放到结果数组的最前面
    }
  }
  return arrResult;
}
// console.log(flat(arr)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

// 第四问 通过传入整数参数控制拉平层数
// 采用堆栈思想双层嵌套
function flat(arr,num=1){
  let arrResult=[];
  let stack=[].concat(arr);
  if(num<=0){
    return arr;
  }else{
    for(let i=1; i<=num; i++){
      arrResult=[];
      while(stack.length!=0){
        let val=stack.pop()
        if(Array.isArray(val)){
          arrResult.unshift(...val);
        }else{
          arrResult.unshift(val);
        }
      }
      stack=[].concat(arrResult);
    }
  }
  return arrResult;
}
// //num传入Infinity时，循环时间长
// console.log(flat(arr,4)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

// 采用reduce+递归
function flat(arr,num=1){
  return num>0?arr.reduce((pre,cur)=>{
     if(Array.isArray(cur)){
       pre=pre.concat(flat(cur,num-1))
     } else{
       pre.push(cur);
     } 
     return pre
   },[]):arr
}
// console.log(flat(arr,Infinity)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

// 第五问 使用Generator 实现flat函数
function* flat(arr,num=1){
  for(val of arr){
    if(Array.isArray(val)&&num>0){
      yield* flat(val,num-1)
    }else{
      yield val;
    }
  }
}
// //调用Generator函数后，该函数并不执行，返回的也不是函数的运行结果，而是一个指向内部状态的指针对象
// //也就是遍历对象(Iterator Object) 所以我们要用一次扩展运算符得到结果
// console.log([...flat(arr,Infinity)]); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

//第六问 实现在原型链上重写flat函数
Array.prototype.fakeFlat=function(num=1){
  if(!Number(num)||Number(num)<0){
    return this;
  }
  let arr=this.concat() //获得调用fakeFlat函数的数组
  while(num>0){
    if(arr.some(x=>Array.isArray(x))){
      arr=[].concat.apply([],arr);  //数组中含有数组元素的话并且num>0,继续展开一层数组
    }else{
      break;
    }
    num--;
  }
  return arr;
}
// console.log(arr.fakeFlat(Infinity)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]

//第七问 原型链上重写flat，并考虑数组空位的情况
//reduce+递归
//es5大多数数组方法对空格的处理都会选择跳过空格,包括forEach(),filter(),reduce(),every(),some();前面所述方法自动跳过空格
Array.prototype.fakeFlat=function(num=1){
  if(!Number(num)||Number(num)<0){
    return this;
  }
  let arr=[].concat(this);
  return num>0?arr.reduce((pre,cur)=>{
    if(Array.isArray(cur)){
      pre=pre.concat(cur.fakeFlat(num-1))
    }else{
      pre.push(cur);
    }
    return pre;
  },[]):arr;
}
console.log(arr.fakeFlat(Infinity)); //[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 'string', { name: '蛋蛋' } ]