//字节二面面试题：通过将对象的路径作为字符串传递来从对象获取深层价值
/** 
 * 使用字符串键访问嵌套的javascript对象
 * var obj={
 *   foo:{bar:'bar'}
 * }
 * 通过向函数提供字符串"foo.bar"来访问obj.foo.bar的值
 * */ 
  var obj={
    foo:{bar:{cur:'cur'}},
    bite:'bite',
  }
 let deep_value=function(obj,path){
   for(let i=0,pathArr=path.split('.');i<pathArr.length;i++){
      obj=obj[pathArr[i]];
   }
   return obj;
 }
 console.log(deep_value(obj,'foo.bar.cur')) //cur
 console.log(deep_value(obj,'bite')) //bite