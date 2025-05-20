// const catMi = {
//   name: 'mimi',
//   age: 4,
// }

// // 这里的设计有点迷惑  监听一个属性必须在外面声明一个变量  然后在监听的属性中使用这个变量
// // 在监听内部直接使用this访问就会死循环
// let _name = catMi.name
// Object.defineProperty(catMi, 'name', {
//   // value: '', // 属性值 不能与get和set同时存在 
//   // writable: true, // 属性值是否可修改 不能与get和set同时存在
//   enumerable: true, // 属性是否可枚举
//   configurable: true, // 属性是否可配置 为false时属性不能删除
//   get: function () {
//     return _name
//   },
//   set: function (newName) {
//     console.log('设置describe');
//     _name = newName
//   }
// })

// console.log(catMi.name)
// catMi.name = 'shshsh'
// console.log(catMi.name)

const obj = {};

Object.defineProperty(obj, 'name', {
  get: function() {
    console.log('Getting name:', this._name);
    return this._name;
  },
  set: function(value) {
    console.log('Setting name to:', value);
    this._name = value;
  },
  enumerable: true,
  configurable: true
});

obj.name = 'Alice'; // 输出：Setting name to: Alice
console.log(obj.name); // 输出：Getting name: Alice
