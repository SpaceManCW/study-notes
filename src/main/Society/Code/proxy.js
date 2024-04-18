// 对对象操作进行拦截
const catMiao = {
  name: 'miao',
  age: 1,
  describe: function() {
    return `${this.name}已经${this.age}岁了`
  }
}

// 创建Proxy代理对象
const catProxy = new Proxy(catMiao, {
  get: function(target, name) {
    if(name === 'name') {
      console.log('猫的姓名是:',target[name]);
      return target[name]
    } else if(name === 'age') {
      console.log('猫的年龄是:',target[name],'岁');
      return target[name]
    }

  },
  set: function(target, name, value) {
    if(name === 'name') {
      console.log('将猫的名字设置为:',value)
      target[name] = value
    } else if(name === 'age') {
      console.log('将猫的年龄设置为:',value)
      target[name] = value
    }
  },
})

// catMiao.name
// catProxy.age
// catProxy.age = 3

// 创建函数的代理对象
const describeProxy = new Proxy(catMiao.describe, {
  apply: function(target, thisBinding, args) {
    console.log('作为方法调用',thisBinding);
    return target.call(thisBinding)
  }
})
// console.log(describeProxy.call(catMiao))



