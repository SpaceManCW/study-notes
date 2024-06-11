/**
 * 实现一个new
 * 第一步：创建一个新对象
 * 第二步：将这个新对象的原型指向构造函数的原型
 * 第三步：调用构造函数并将其this指向新对象
 * 第四步：若构造函数有对象类型的返回值则直接返回，否则返回新对象
 */


function myNew(fn, ...args) {
  // 以fn的原型为原型创建一个新对象
  const obj = Object.create(fn.prototype)
  const res = fn.apply(obj, args)
  return typeof res === 'object' ? (res || obj) : obj
}

function  Person(name, age) {
  this.name = name
  this.age = age
}

const hero = myNew(Person, '蝙蝠侠', 35)
const hero2 = new Person('蝙蝠侠', 35)

console.log('hero:', hero); // Person {name: '蝙蝠侠', age: 35}
console.log('hero2:', hero2); // Person {name: '蝙蝠侠', age: 35}
