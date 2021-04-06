/**美团一面
 * 输出结果*/
//题一
function fn(a){

  console.log(a,1); // function
  
  var a=123;
  
  console.log(a,2); // 123
  
  function a(){}
  
  console.log(a,3); // 123
  
  var b = function(){}
  
  console.log(b,4); // function
  
  }
  
  fn(1)

//题2
function A () {
}
const a = new A()
const b = A()
const c=A

console.log('a',a)  //A {}
console.log('b',b)  //undefined return
console.log('c',c)  //function
