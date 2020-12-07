//手写promise
const PENDING='pending'; //等待
const FULFILLED='fulfilled'; //成功
const REJECTED='rejected'; //失败
class MyPromise{
  //构造器实现一个执行器 执行器立即执行
  constructor(executor){
    try{
      executor(this.resolve,this.reject);
    }catch(e){
      this.reject(e);
    }
  };
  //默认状态
  status=PENDING;
  //成功之后的值
  value=undefined;
  //失败后的原因
  reason=undefined;
  //成功回调(异步多次调用then方法)
  successCallback=[];
  //失败回调(异步多次调用then方法)
  failCallback=[];
  //resolve方法
  resolve=value=>{
     //判断状态 状态一旦确定不可更改 阻止继续向下执行
     if(this.status!==PENDING) return;
     //将状态更改为成功
     this.status=FULFILLED;
     //保存成功之后值
     this.value=value;
     //判断成功函数是否存在 存在调用
     while(this.successCallback.length) this.successCallback.shift()();
  }
  //reject方法
  reject=reason=>{
    //判断状态 状态不可更改
    if(this.status!==PENDING) return;
    //将状态更改为失败
    this.status=REJECTED;
    //保存失败的原因
    this.reason=reason;
    //判断失败函数是否存在 存在调用
    while(this.failCallback.length) this.failCallback.shift()();
  }
  //then是原型对象上的方法
  then(successCallback,failCallback){
    //then方法不传参数 默认状态向下传递，直到有回调函数为止
    successCallback=successCallback?successCallback:value=>value;
    failCallback=failCallback?failCallback:reason=>{throw reason};
    //then方法返回一个新的promise对象
    let promise2=new MyPromise((resolve,reject)=>{
        if(this.status===FULFILLED){
          setTimeout(()=>{
            try{
              let x=successCallback(this.value);
              resolvePromise(promise2,x,resolve,reject);
            }catch(e){
              reject(e);
            }
          },0)
        }else if(this.status===REJECTED){
          setTimeout(() => {
            try{
              let x=failCallback(this.reason);
              resolvePromise(promise2,x,resolve,reject);
            }catch(e){
              reject(e);
            }
          }, 0);
        }else{
          //等待状态 将成功回调和失败回调保存起来 异步多次调用then
          this.successCallback.push(()=>{
            setTimeout(() => {
              try{
                let x=successCallback(this.value);
                resolvePromise(promise2,x,resolve,reject);
              }catch(e){
                reject(e);
              }
            }, 0);
          });
          this.failCallback.push(()=>{
            setTimeout(() => {
              try{
                let x=failCallback(this.reason);
                resolvePromise(promise2,x,resolve,reject);
              }catch(e){
                reject(e);
              }
            }, 0);
          })
        }
    })
    return promise2;
  };
  //all方法为静态函数
  static all(array){
    let result=[]; //结果数组
    let index=0;
    //all方法返回一个promise对象
    return new MyPromise((resolve,reject)=>{
      //添加结果到结果数组 若当前执行index与数组长度相等，则返回数组函数结果
      function addData(key,value){
        result[key]=value;
        index++;
        if(index===array.length){
           resolve(result);
        }
      }
      for(let i=0;i<array.length;i++){
        let curent=array[i];
        if(curent instanceof MyPromise){
          //promise 对象
          curent.then(value=>addData(i,value),reason=>reject(reason));
        }else{
          //普通值
          addData(i,array[i]);
        }
      }
    })
  };
  //resolve方法为静态函数
  static resolve(value){
    //promise对象直接返回
    if(value instanceof MyPromise) return value;
    //普通值包裹为promise对象返回
    return new MyPromise (resolve=>resolve(value));
  }
};
function resolvePromise(promise2,x,resolve,reject){
  //自己返回自己
  if(promise2===x){
     return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));
  };
  if(x instanceof MyPromise){
    //promise 对象
    x.then(resolve,reject);
  }else{
    //普通值
    resolve(x);
  }
}

module.exports=MyPromise; //对MyPromise类进行导出