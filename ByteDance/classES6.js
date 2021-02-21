//面试题：JS如何实现一个类
/**
 * 方法一：原始方法，用到了this和prototype,代码繁琐可读性差
 * 方法二：ES6 语法糖class
 */
//方法一
function Person(name,age){
  this.name=name;
  this.age=age;
}
Person.prototype.swim=function(){
  console.log('I can swim')
}
let p1=new Person('Jone','22');
p1.swim()

//方法二
class Animal{
  constructor(type,color){
    this.type=type;
    this.color=color;
  }
  jump(){
    console.log('Animal can jump')
  }
}
let c=new Animal('cat','white');
c.jump()