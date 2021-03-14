
//面试题：正则实现trim去除前后空白符

// 第一种方式
// String.prototype.trim=function(){
//   return this.replace(/^\s+|\s+$/g,'')
// }

//第二种方式
function trim(str){
  return str.replace(/^\s+|\s+$/g,'')
}

//实现去除所有空白符
// function trim(str){
//   return str.replace(/\s/g,'')
// }

let trim1=trim('   1 2  3      4      ')
console.log(trim1)