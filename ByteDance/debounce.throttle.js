//面试题：实现防抖和节流函数

/**
 * 防抖 触发后delay秒内只执行最后一次
 */
function debounce(fn,delay){
   let timerId=null;
   return function(){
     let context=this;
     if(timerId){clearTimeout(timerId)}
     timerId=setTimeout(()=>{
      fn.apply(context,arguments)
      timerId=null;
     },delay)
   }
}

const debounce1=debounce(()=>{console.log('debounce')},10000)
debounce1()
debounce1()
setTimeout(()=>{
  debounce1()
},10000)

/**
 * 节流 触发后一段时间时间内执行
 */

function throttle(fn,delay){
  let canUse=true;
  return function(){
    if(canUse){
      fn.apply(this,arguments);
      canUse=false;
      setTimeout(()=>canUse=true,delay)
    }
  }
}

let throttle1=throttle(()=>{console.log('throttle')},10000)
throttle1()
throttle1()
setTimeout(()=>{
  throttle1()
},10000)