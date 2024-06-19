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

## 6、this指向有哪几种

1. 函数体内：严格模式下指向undefined，非严格模式下指向window
2. 使用new操作符：构造函数里面的this指向新对象
3. 使用call/apply/bind：this指向方法制定的对象
4. 上下文调用方法：this指向调用该方法的对象
5. 箭头函数：this由外层作用域决定

## 7、JS的事件冒泡、事件捕获、事件委托

在 JavaScript 中，当一个事件发生时，会先进行事件捕获，然后再进行事件冒泡。在 DOM 中，所有元素都有一个 addEventListener 方法，可以用来添加事件监听器。这个方法有三个参数：事件类型、事件处理函数、和一个布尔值。如果布尔值是 true，则事件处理函数会在事件捕获阶段执行，如果是 false，则会在事件冒泡阶段执行。

事件冒泡：点击子元素，父元素也能监听到点击，由子元素往上层传播

事件捕获：点击子元素，会先触发父级的事件，由父元素往子元素传播

事件委托：就是利用冒泡的机制，将子元素的事件绑定在父元素上，精简代码统一处理

## 8、JS闭包

闭包就是指函数可以记住它的词法作用域，即使该函数在其词法作用域之外执行，闭包可以使函数记住它所处的环境。

在一个函数中定义或者返回另一个函数，子函数可以放到父级函数作用域内的变量和方法

```js
// displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。因此，当 myFunc 被调用时，变量 name 仍然可用，其值 Mozilla 就被传递到alert中。
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    alert(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```

好处：

1. 实现数据的隐藏和封装
2. 可以保持住函数的状态信息
3. 实现模块化

缺点：

1. 闭包会保持住对外部变量的引用，容易造成内存泄漏
2. 闭包跨作用域导致代码不好理解，不好调试
3. 频繁创建和销毁闭包可能影响性能

## 9、null和undefined的区别

这是一个历史遗留问题，js设计之初只有一个null代表无，但是使用typeof可以知道null其实是一个对象，用一个对象代表无，不是很合理；并且在一些错误情况下变量会进行类型转换，null会被转换成0，导致问题不易被发现。后面引入了undefined，代表变量没有被赋值或者说是缺少值，undefined转成数字是NaN

null == undefined  返回true

## 10、JS判断数据类型的方法

### typeof

```js
var num = 123
var arr = [1,2,3]
console.log('测试typeof:',typeof(num));//number
console.log('typeof验证null:',typeof(null));//object
console.log('typeof验证数组:',typeof(arr));//object
```

返回一个字符串代表数据类型，但是无法判断null和array，返回的都是object

### instanceof

```js
var num = 123//非对象
var num1 = new Number(123)
console.log('instanceof判断基本数字:',num instanceof Number);//非对象返回false
console.log('instanceof判断对象数字:',num1 instanceof Number);//返回true
console.log(String instanceof String);//返回false 
```

原理是判断构造函数的原型是否在前者的原型链上，本质就是检查目标对象是由哪个构造函数创建的，所以只能检查对象，直接使用字面量声明的基本数据类型则判断不了

### Object.prototype.toString.call()

```js
var num = 123
console.log(Object.prototype.toString.call(num));//[object Number]
console.log(num.toString());//123
```

一般的数据类型都能判断，最准确的一种方法，注意不能直接使用数据类型自带的toString方法，因为大多数类型都重写了这个方法

## 11、defer和async

二者都让资源在后台下载，不影响其他资源，但执行时机和顺序不同

script元素设置defer：立即下载但是延迟执行，整个页面解析完毕后执行，按照页面出现的顺序加载

script元素设置async：立即下载并执行，加载完就执行，哪个先加载完就执行哪个

## 12、任务队列和事件循环机制

由于js是单线程的，所以人物只能排着队按顺序执行，而任务区分同步任务和异步任务，异步任务如果阻塞会影响整体代码的执行，并且异步任务有很多是不着急执行的。为了解决这个问题创建了任务队列，任务队列则是将所有的异步任务存起来，等待当所有的同步任务执行完毕之后再将任务队列中的异步任务取出来执行。

而任务队列中的异步任务有两种：

1. 宏任务：包括整体脚本执行、setTimeout、setInterval、I/O 操作等。
2. 微任务：包括 Promise 的回调、MutationObserver、process.nextTick（Node.js）等。

那么怎么体现 【循环】呢？任务的执行顺序是这样的：

1. 执行同步任务  执行完毕
2. 去任务队列中取一个宏任务执行，执行过程中会产生微任务，该宏任务结束
3. 执行上一个宏任务所产生的微任务，执行完
4. 上一个宏任务的微任务执行完了，再取一个宏任务执行
5. 循环往复直到所有宏任务执行完毕

## 13、作用域和作用域链

作用域指定义变量的区域，决定了变量的可访问性，js的作用域主要有三种

1. 全局作用域：定义在最外层的变量，全局都能访问
2. 函数作用域：函数内部定义的变量，只在函数内部可以访问
3. 块级作用域：由{ }包围的块，let const定义的变量具有块级作用域，只在块内可以访问

作用域链就是指在嵌套作用域中查找变量的过程，现在当前作用域找，找不到则找上级作用域，逐层找的过程形成一个链条

## 14、深拷贝浅拷贝

浅拷贝是仅仅拷贝了基础数据类型，对于对象类型的话，只拷贝了对象的引用，还是共同使用堆中的同一个数据。深拷贝则是在堆中重新分配内存，并把原对象所有的属性进行拷贝。

实现深拷贝的几种方案：

1. JSON.parse(JSON.stringify(obj))    缺点：无法复制属性值为函数或者undefined的属性
2. 递归实现深拷贝

   ```js
   function deepClone(source) {
       // 克隆的不是对象  直接返回
       if(typeof source !== 'object' || source === null) {
           return source
       } 
       // 新的对象是对象还是数组
       const target = Array.isArray(source) ? [] : {};
       for(let key in source){
           // 遍历子元素 需要用hasOwnProperty是因为for...in会连同自定义属性和原型属性一起遍历  不准
           // hasOwnProperty确认属性是被复制对象自己的属性
           if(Object.prototype.hasOwnProperty.call(source, key)) {
               if(typeof source[key] === 'object' && source[key] !== null) {
                   // 属性值还是对象就进行递归复制
                   target[key] = deepClone(source[key])
               } else {
                   target[key] = source[key]
               }
           }
       }
   }
   ```

## 15、for...in 和 for...of

for..in是ES5的方法，通常用来遍历数组和对象的key，但是用其遍历数组的话存在一定的缺陷，所以ES6引入了for...of用来遍历数组

1. for...in遍历的是key值，for...of遍历的是value
2. for...in遍历数组时，不止遍历元素，还会遍历自定义属性和原型的属性和方法，这不是我们想要的
3. for...of弥补了for...in遍历数组的缺点，所以推荐使用for...of遍历数组
4. for...of不能用来遍历对象

## 16、防抖和节流

防抖：就是在短时间内不断点击触发点击事件时，只在最后一次点击时触发一次

```js
function debounce(fun, wait){
    var timer = null
    return function(){
        clearTimeout(timer)
        timer = setTimeout(() => {
            console.log(arguments);
            fun.apply(this, arguments)
        },wait)
    }
}
```

节流：就是在短时间内不断点击触发点击事件时，控制其事件触发频率，n秒触发一次

```js
function throttle(fun ,wait){
    var flag = true
    return function(){
        if(flag){
            flag = false
            fun.apply(this, arguments)
            setTimeout(() =>{
                flag = true
            },wait)
        }
    }
}
```

## 17、ES module & common module 区别和联系
