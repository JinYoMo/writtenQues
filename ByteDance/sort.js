  //字节一面面试题 将数组dataSource按照sorters排序---重点：逆向排序
  /* 题目详情
  给定：
  var dataSource = [
      { foo: 'bbb', num: 4,  flag: 2 },
      { foo: 'aaa', num: 3,  flag: 1 },
      { foo: 'ccc', num: -6, flag: 2 },
      { foo: 'ccc', num: 8,  flag: 2 },
      { foo: 'bbb', num: 2,  flag: 4 },
      { foo: 'aaa', num: -3, flag: 4 }
    ];
    
    var sorters = [{
        key: 'flag',
        asc: true
    },
    {
        key: 'foo',
        asc: false
    },
    {
        key: 'num',
        asc: true
    }]
  输出：
  [ 
    { foo: 'aaa', num: 3,  flag: 1},
    { foo: 'ccc', num: -6, flag: 2},
    { foo: 'ccc', num: 8,  flag: 2},
    { foo: 'bbb', num: 4,  flag: 2},
    { foo: 'bbb', num: 2,  flag: 4},
    { foo: 'aaa', num: -3, flag: 4},
  ]
  */
  var dataSource = [
      { foo: 'bbb', num: 4,  flag: 2 },
      { foo: 'aaa', num: 3,  flag: 1 },
      { foo: 'ccc', num: -6, flag: 2 },
      { foo: 'ccc', num: 8,  flag: 2 },
      { foo: 'bbb', num: 2,  flag: 4 },
      { foo: 'aaa', num: -3, flag: 4 }
    ];
    
    var sorters = [{
        key: 'flag',
        asc: true
    },
    {
        key: 'foo',
        asc: false
    },
    {
        key: 'num',
        asc: true
    }]
    //解题方法一
    function sortNum(key,asc){
      return function(a,b){
       var value1=a[key];
       var value2=b[key];
       var rev=asc?1:-1;
       if(value1>value2){
         return rev*1
       }else if(value1<value2){
         return rev*-1
       }else{
         return 0
       }
      }
    }
  var resultArr=[];
  resultArr=sorters.reverse() //从后往前排
  // console.log(resultArr)
  resultArr.forEach(ele => {
    dataSource=dataSource.sort(sortNum(ele.key,ele.asc))
  });
  //测试数据
  console.log(dataSource)
  
  // 解题方法二
  function sort(dataSource, sorters) {
        for(let i = sorters.length-1; i >= 0; i--){
          const sorter = sorters[i]
          dataSource.sort((a,b)=> {
            if (a[sorter.key]>b[sorter.key]){
              return sorter.asc ? 1 : -1
            } else if (a[sorter.key]===b[sorter.key]){
              return 0
            } else {
              return sorter.asc ? -1 : 1
            }
          })
        }
      return dataSource
    }
  //测试数据
  console.log(dataSource)

  /**
   * 排序：将baseSource先按num排序，若num相等，按id排序  排序方式：从小到大
   */
  var baseSource = [
      {  id: 4, num: 2 },
      {  id: 3, num: 1 },
      { id: 6, num: 3 },
      {  id: 8, num: 5 },
      {  id: 2, num: 4 },
      {  id: 1, num: 4 }
  ];

  function sortFunc(a,b){
    return a.num-b.num===0?a.id-b.id:a.num-b.num;
  }
console.log(baseSource.sort(sortFunc),22);  //从小到大排列