//面试题：实现一个深拷贝
/**
 * 浅拷贝+递归
 * @param {*} source 
 */
function deepClone (source){
   if(!isObject(source)) return source;
   let target=Array.isArray(source)?[]:{};
   for(let key in source){
     if(source.hasOwnProperty(key)){
      if(isObject(source[key])){
        target[key]=deepClone(source[key]);
       }else{
        target[key]=source[key];
       }
     }
   }
   return target;
}
function isObject(val){
  return typeof val ==='object'&&val!=null;
}

// 测试代码
let objOrg1={a:'1'};
let objOrg2={a:'2',b:{c:'3'}}
let objCpy1=deepClone(objOrg1)
let objCpy2=deepClone(objOrg2)
objOrg1.a=2;
objOrg2.b.c='kk';

console.log(objOrg1,objCpy1)
console.log(objOrg2,objCpy2)