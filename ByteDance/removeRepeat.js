//面试题：数组去重的实现方式
function removeRepeat(arr){
  let tempArr=[];
  if(arr.length>0){
    arr.forEach(item=>{
      if(tempArr.indexOf(item)===-1){
         tempArr.push(item)
      }
    })
  }
  return tempArr;
}
//数组去重
function repet1(arr){
  return Array.from(new Set(arr))
}

let a1=['5','7','12','12','2','4','2','12','4','5']
let resultArr=removeRepeat(a1);
console.log(resultArr)