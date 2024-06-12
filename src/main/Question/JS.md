## 1、数组去重

```js
const arr = [1,2,2,'abc','abc',true,true,false,false,undefined,undefined,NaN,NaN,{},{},null,null]
```

### Set + Array.from()

```js
const result = Array.from(new Set(arr))
// [1, 2, 'abc', true, false, undefined, NaN, {}, {}, null]
```

缺点：无法筛掉空对象

### 两层循环+splice( )

```js

function removeDuplicate(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1)
        j-- // 保证j的值自加后不变
      }
    }
  }
  return arr
}
// [1, 2, 'abc', true, false, undefined, NaN, NaN, {}, {}, null]
```

缺点：无法筛掉空对象和NaN

### indexOf( )

```js
function removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (newArr.indexOf(item) === -1) {
      newArr.push(item)
    }
  })
  return newArr // 返回一个新数组
}
// [1, 2, 'abc', true, false, undefined, NaN, NaN, {}, {}, null]
```

缺点：无法筛掉空对象和NaN

### includes()

```js
function removeDuplicate(arr) {
  const newArr = []
  arr.forEach(item => {
    if (!newArr.includes(item)) {
      newArr.push(item)
    }
  })
  return newArr
}
// [1, 2, 'abc', true, false, undefined, NaN, {}, {}, null]
```

缺点：无法筛掉空对象

### Map

```js
function removeDuplicate(arr) {
  const map = new Map()
  const newArr = []

  arr.forEach(item => {
    if (!map.has(item)) { // has()用于判断map是否包为item的属性值
      map.set(item, true) // 使用set()将item设置到map中，并设置其属性值为true
      newArr.push(item)
    }
  })

  return newArr
}
// [1, 2, 'abc', true, false, undefined, NaN, {}, {}, null]
```

## 2、new关键字

```JS
function myNew(fn, ...args) {
  // 以fn的原型为原型创建一个新对象
  const obj = Object.create(fn.prototype)
  // 调用构造函数并将其this指向新对象
  const res = fn.apply(obj, args)
  // 若构造函数有返回值就返回  原始数据类型则忽略
  return typeof res === 'object' ? (res || obj) : obj
}
```

## 3、JS继承

[https://blog.csdn.net/qq_45643079/article/details/120105399](https://blog.csdn.net/qq_45643079/article/details/120105399 "讲解")

1. 原型继承：子级构造函数的原型指向父级的实例，但是由于原型对象是共享的，有引用值共享问题
2. 构造继承：在子级的构造函数里调用一次父级的构造函数，但是无法继承原型属性
3. 组合继承：在构造继承的基础上再加上原型继承的代码，但是父级构造函数被调用两次，属性被重复添加
4. 寄生组合式继承：使用一个新的构造函数并以父级的原型为原型，过滤了父级的多余属性
5. ES6 class继承：class结合extends实现继承，注意要在constructor里使用super调用父类的构造函数

## 4、call apply bind区别

三者都是用来改变函数调用this指向的，call和apply类似，第一个参数都是要设置的this，call从第二个参数开始都是函数所需的参数，而apply第二个参数是一个数组，数组里是函数需要的参数

bind与接受参数的形式与call一样，但是bind没有直接调用函数，而是返回一个新的函数需要手动调用，也可以在手动调用的时候传递参数

## 5、什么是函数柯里化

概念：函数柯里化就是将一个接受多个参数的函数转换为一系列接收单一参数的函数的过程

好处：实现接受一部分参数返回一个接受剩余参数的函数，可复用性强；实现逐步接受参数延迟执行代码，更加灵活

实现：利用参数长度判断参数是否已经齐全再决定是否返回最终值   利用args收集参数

```js
function curry (fn, n = fn.length, args = []) {
    return n === 0 ?
        fn(...args) :
        (...arg1) => curry(fn, n - args1.lenth, [...args, ...arg1])
}
```
