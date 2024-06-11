## 1、数组去重

```js
const arr = [1,2,2,'abc','abc',true,true,false,false,undefined,undefined,NaN,NaN,{},{},null,null]
```

### Set + Array.from()

```js
const result = Array.from(new Set(arr))
// [1, 2, 'abc', true, false, undefined, NaN, {}, {}, null]
```

**缺点：**无法筛掉空对象

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

**缺点：**无法筛掉空对象和NaN

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

**缺点：**无法筛掉空对象和NaN

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

**缺点：**无法筛掉空对象

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