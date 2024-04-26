const catMi = {
  name: 'mimi',
  age: 4,
}

// 这里的设计有点迷惑  监听一个属性必须在外面生命一个变量  然后在监听的属性中使用这个变量
// 在监听内部直接使用this访问就会死循环
let _name = catMi.name
Object.defineProperty(catMi, 'name', {
  // value: '', // 属性值 不能与get和set同时存在 
  // writable: true, // 属性值是否可修改 不能与get和set同时存在
  enumerable: true, // 属性是否可枚举
  configurable: true, // 属性是否可配置 为false时属性不能删除
  get: function () {
    return _name
  },
  set: function (newName) {
    console.log('设置describe');
    _name = newName
  }
})

console.log(catMi.name)
catMi.name = 'shshsh'
console.log(catMi.name)