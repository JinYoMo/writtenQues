/**
 * 字节一面
 * 原生实现一个indexof方法
 */
//数组篇
Array.prototype.arrIndexOf = function(searchElement, fromIndex) {
  var len = this.length;
  // 首先判断 fromIndex 是否合法
  if (fromIndex == null) {
      fromIndex = 0;
  }
  if (fromIndex < 0) {
      fromIndex = len - 1;
  }
  // 循环判断 searchElement 是否与数组内元素相等
  for (var i = fromIndex; i < len; i++) {
      // 如果相等则返回当前索引值
      if (searchElement === this[i]) {
          return i;
      }
  }
  return -1
}
const arr=['a','b','c','a']
console.log(arr.arrIndexOf('a',1)) //3

//字符串篇
String.prototype.strIndexOf = function(str,fromIndex){
  var sourceArr = this.split('');
  var num = -1;
  if (fromIndex == null) {
    fromIndex = 0;
  }
  if (fromIndex < 0) {
    fromIndex = sourceArr.length - 1;
  }
  for (var i = fromIndex; i < sourceArr.length; i++) {
      if(sourceArr[i]===str.slice(0,1)){
          if(str===this.slice(i,Number(i)+str.length)){
              num = i
          }
      }
  }
  return num
}
var a = 'abdddcdefghi'
var b = a.strIndexOf('def',0)
console.log(b)  //6