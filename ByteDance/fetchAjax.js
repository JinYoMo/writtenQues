//字节二面面试题：实现一个 fetch ，基于 Ajax
/**
 * fetch({
   url: 'xxx',
   method: 'GET | POST | JSONP',
   params: {},
   timeout: 1000
   }).then()
   .catch()
 * 
 */
// npm install xmlhttprequest
//基础写法(不全面)
function fetch(obj){
   return new Promise((resolve,reject)=>{
       var xhr=new XMLHttpRequest();
       xhr.open(obj.method,obj.url)
       xhr.responseType="json";
       xhr.onload=function(){
        if(this.status===200){
          resolve(this.response)
        }else{
          reject(new Error(this.statusText))
        }
       }
       xhr.send()
   })
}
//fetch调用
fetch({ url: '/ByteDance/unit/data.json',
  method: 'GET',params: {},
  timeout: 1000})
.then(data=>{
  console.log('成功返回的数据:',data)
}).catch(err=>{
  console.log('错误返回',err)
})

// 手写ajax
/**
 * 题目信息
 * ajax({
   url: 'xxx',
   method: 'GET | POST | JSONP',
   params: {},
   timeout: 1000
   })
   .then()
   .catch()
 * 思路整理
 * 处理传入参数
 * GET&POST
 * 》ajax四步
 *   》const xhr=new XMLHttpResquest()
 *   》xhr.open(method,url,true)
 *   》xhr.send(sendData)
 *   》xhr.onreadystatechange=function(){
 *        if(xhr.readyState===4){
 *           if(xhr.status===200){}
 *        }
 *     }
 *  》GET
 *   》xhr.open('GET',url?a=1&b=2,true)
 *   》xhr.send(null)
 *  》POST
 *   》xhr.open('POST',url,true)
 *   》xhr.send(a=1&b=2)
 *  》JSONP
 *   》创建script
 *   》script.src=src?a=1&callback=callbackName
 *   》script插入页面document.body.appendChild(script)
 *   》执行callback window[callbackName]=(value)=>{}
 *     》callback中移除script.parentNode.removeChild(script)
 */
/**
 * @param {*} data 
 * 简洁版
 */
//处理传入参数
function handleData(data){
  let sendData="";
   for(const dataKey in data){
     sendData+=`&${dataKey}=${data[dataKey]}` //&a=1&b=2
   }
   sendData=sendData.slice(1)  //a=1&b=2
   return sendData;
}
function Ajax({url,method,params,timeout,callback='callback'}){
  return new Promise((resolve,reject)=>{
     //JSONP方法
     if(method=='JSONP'){
      params.callback=callback
      const sendData=handleData(params);
       let script=document.createElement('script'); //创建script
       script.src=url +'?'+ sendData; // https://photo.sina.cn/aj/index?page=1&cate=recommend&callback=callback
       document.body.appendChild(script) //将script插入页面
       window[callback]=(value)=>{
        try{
          resolve(value)
        }catch{
          reject(e)
        }
        //移除script元素
        script.parentNode.removeChild(script)
       }
     }else{
      let sendData=handleData(params);
      //GET方法
      if(method==='GET'){
        url+='?'+ sendData;
        sendData=null;
      }
      const xhr=new XMLHttpRequest();
      xhr.open(method,url,true); //true表示同步
      xhr.timeout=timeout;
      xhr.send(sendData);
      xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
          if(xhr.status===200){
            resolve(xhr.response)
          }else{
            reject(xhr)
          }
        }
      }
     }
  })
}
//Ajax方法调用
Ajax({
   url:'http://ux.lezhixing.com.cn/mock/286/jw/schedule/filter/query.do',
   method:'GET',
   params:{type:'student',name:'小花'},
   timeout:2000
 }).then((data)=>{
   console.log('GET请求',data)
 })
 Ajax({
  url:'http://ux.lezhixing.com.cn/mock/385/region/schedule/role/add.do',
  method:'POST',
  params:{districtId:'1',schoolId:'2'},
  timeout:2000
}).then((data)=>{
  console.log('POST请求',data)
})
Ajax({
  url:'https://photo.sina.cn/aj/index',
  method:'JSONP',
  params: {page: 1, cate: 'recommend'},
  timeout:2000
}).then((data)=>{
  console.log('JSONP请求',data)
})