/**
 * 快手一面
 */
//第一题
typeof null
"object"
typeof typeof null
"string"
typeof typeof typeof null
"string"

//第二题
for (var i = 0; i < 3; ++i) {
  document.body.addEventListener('click', function() {
      console.log(i);
  });
}

//结果：3个3

// 第三题 'get-element-by-id'转换为getElementById 
// 优化：使用正则
function camelCase(str){
  let resultStr='';
  let arr=str.split('-');
  let tempArr=[];
  arr.forEach((item,index)=>{
      if(index!=0){
          tempArr.push(item.charAt(0).toUpperCase()+item.slice(1))
      }else{
          tempArr.push(item)
      }
  })
  resultStr=tempArr.join('');
  return resultStr;
}
console.log(camelCase('get-element-by-id'))

//第四题 事件委托
/* <ul>
  <li>TTTT</li>
  <li>XXXX<li>
  ...
  <li>PPPP</li>
</ul> */
ul.addEventListener('click',function(e){
  if(e.target.tagName.toLowerCase==='li'){
      console.log(e.target.innerHTML)
  }
})

//第五题  css
/* <style> 
.classA { color:blue; } 
.classB { color:red;}
</style>
<p class="classB classA">hello</p> */

// 结果：red