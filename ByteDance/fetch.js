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
function fetch(obj){
   return new Promise((resolve,reject)=>{
       var xhr=new XMLHttpRequest();
       console.log(xhr,33)
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
fetch({ url: '/ByteDance/unit/data.json',
  method: 'GET',params: {},
  imeout: 1000})
.then(data=>{
  console.log('成功返回的数据:',data)
}).catch(err=>{
  console.log('错误返回',err)
})