//字节跳动一面面试题
//实现一个类似于underscore的template方法
function helloTemplate(tpl,data){
  //将模板以<% <%= %> 拆分为数组的形式
  let tplArr=tpl.split(/(\<%=?|%\>)/gm)
  //这里选用with的话，是想将两个不同的作用域链接起来 也就是data中的数据
  let funcBody=["with(this){let result =[];"]
  let code=0,item;
  for(let i=0;i<tplArr.length;i++){
     item=tplArr[i];
     if(item==='<%'){
       code=1;
       continue;                  //continue结束本次循环，进入下次循环
     }else if(item==='<%='){
       code=2;
       continue;
     }else if(item==='%>'){   
       code=0;
       continue;
     }
     if(code===1){                      //代码语句<% if(state){ %> 直接放入funcBody数组中即可
      funcBody.push(item);
     }else if(code===2){                //变量<%= name.a %> 执行result.push(name.a)
      funcBody.push("result.push(");
      funcBody.push(item);
      funcBody.push(");")
     }else if(code===0){                //单纯的文字 你好 执行result.push("你好")
      funcBody.push("result.push(\"");  
      funcBody.push(item);
      funcBody.push("\");")
    }
  }
  funcBody.push("return result.join('');}");
  //此处不选择eval的原因是 因为function的隔离性好，会产生一个自己的作用域
  let res=new Function(funcBody.join(""));
  return res.call(data)
}
let helloHtml=helloTemplate("你好<%= name.a %><% if(state){ %>,你今天看起来很<%= state %>嘛。<% } %>",{name:{a:'老王'},state:'不错'})
console.log(helloHtml)

//实现实现一个template 方法 
/**
 * template(str, data)   
  输入：'my name is {{name}}, age is {{age }}'  
   { name: 'tom', age: 16 }
  输出：my name is tom, age is 16
 * 》传入字符串拆分为数组形式
   》遍历字符串数组，组建funcBody执行模板代码，并得出result结果数组
   》创建以funcBody为参数的新方法，执行该方法，可解析出funcBody的代码块内容，得到结果
 */
function template(str,data){
  //将传入的字符串 按照{{  }}拆分成数组
  tplArr=str.split(/(\{\{?|\}\})/gm);
  //funcBody为重组的模板代码
  let funcBody=['with(this){ let result=[];']
  let code=0,item;
  for(let i=0;i<tplArr.length;i++){
    item=tplArr[i];
    if(item==='}}'){
      code=0;
      continue;                //continue结束本次循环，进入下次循环
    }else if(item==="{{"){
      code=1;
      continue;
    }
    if(code===0){
      funcBody.push("result.push(\"")  //单纯的文字my name is 执行result.push("my name is")
      funcBody.push(item);
      funcBody.push("\");")
    }else if(code===1){                //变量{{name}} 执行result.push(name)
      funcBody.push("result.push(");
      funcBody.push(item);
      funcBody.push(");")
    }
  }
  funcBody.push("return result.join('');}")   //将result数组转化为字符串
  let res=new Function(funcBody.join(""));    //将funcBody数组转化为字符串代码传入新创建的方法
  return res.call(data);                      //调用该方法 执行得到result.join('')结果
}
let html=template('my name is {{name}}, age is {{age }}', { name: 'tom', age: 16 })
console.log(html)