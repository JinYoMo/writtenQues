//面试题：JS继承的五种实现方式
/**
 * 方法一：原始方法，用到了this和prototype,代码繁琐可读性差
 * 方法二：ES6 语法糖 extends继承
 */
//父对象
function Person(name,age){
  this.name=name;
  this.age=age;
}
Person.prototype.swim=function(){
  console.log('I can swim')
}
let p1=new Person('Jone','22');
p1.swim()

/**
 * JS继承的五种实现方式
 */
//第一种 构造函数继承——通过apply或者call方法，将父对象的构造函数绑定在子对象上
function Woman(name,age){
  Person.apply(this,arguments);
  this.name=name;
  this.age=age;
}
let w=new Woman('coco','10')
console.log('构造函数继承',w.age)

//第二种 实例继承——将子对象的prototype指向将父对象的一个实例
function Man(){}
Man.prototype=new Person();
Man.prototype.constructor=Man;

let m=new Man('lala','20')
console.log('实例继承',m)

//第三种 拷贝继承——将父对象的所有方法和属性拷贝到子对象上
function WomanExtend(Child,Parent){
  let c=Child.prototype;
  let p=Parent.prototype;
  for(let i in p){
    c[i]=p[i]
  }
  c.uber=p;
}

//第四种 原型继承——将子对象的prototype指向父对象的prototype
function ManExtend(Child,Parent){
  let F=function(){}
  F.prototype=Parent.prototype;
  Child.prototype=new F();
  Child.prototype.constructor=Child;
  Child.uber=Parent.prototype;
}

//第五种 语法糖 extends继承
class Chinese extends Person{
  constructor(name,age,color){
    super(name,age)
    this.color=color;
  }
  say(){
    return super.swim()
  }
}
let cc=new Chinese('July','22','yellow');
cc.say();
console.log(cc.name)