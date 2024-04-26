## ES6的常用的特性

比较基础的知识就不写了  主要记录一些注意点

### let和const命令

> 注意作用域问题

```JS
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```

为什么a[6]是 10 因为数组所有元素都是i 都是用一个值 因为var声明的是全局范围的变量 循环结束 i=10 所以所有元素都是10

> 什么是变量提升、暂时性死区

> ES6 声明变量的方法有 6 种，var let const function class import

> 使用var声明的变量挂在顶层对象 window 上，var a = 2 那 window.a 也是 2

### 变量的解构

### 模板字符串

### Symbol

> 为什么ES6 引入 Symbol?
>
> ES5对象的属性名都是字符串，添加新的属性或者方法时，属性名可能会重复，为了解决这个问题

> Symbol 属于基本原始数据类型 不是对象 所以不能用new去调用Symbol()

> 声明时可以给 Symbol('foo') 传一个字符串 但也就仅仅是方便辨别 即使字符串相同的两个 Symbol 变量也不相等 取出这个字符串可以 sym.description // "foo"

> 对象属性键名用Symbol的话 常规的方式无法获取键名 要用getOwnPropertySymbols(obj) 返回 obj中所有的 Symbol键名  Reflect.ownKeys(obj)获取所有键名 包括字符串键名和 Symbol键名

**Symbol有什么用？**

1. 作为属性名 Symbol 值作为对象属性名时，不能用点运算符 该属性是公开属性 不是私有属性
2. 消除魔术字符串 代码中重复出现的字符串 可以设置成常量 但是如果字符串本身的意义不重要  就可以设置成 Symbol
3. 声明类的私有属性 使用 Symbol作为类属性的名字

### Set

类似没有重复元素的数组 判断元素重复的逻辑类似 ===

> 但是 === 判断NaN !== NaN，Set认为 NaN如果有两个的话是重复元素  两个{}会被认为是两个值

1. `size` 返回元素总数
2. `add()` 添加元素
3. `delete()` 删除元素
4. `has()` 是否有某个元素 返回布尔值
5. `clear()` 清空所有元素
6. `keys()` 返回所有键名 Set无键名 所以返回键值 与 values()一样
7. `values()` 返回所有键值
8. `forEach()` 遍历每个成员

### WeakSet

结构与 Set类似，与 Set有两个区别：

1. WeakSet 的成员只能是对象和 Symbol 值，而不能是其他类型的值。
2. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

> WeakSet 适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在 WeakSet 里面的引用就会自动消失 由于垃圾回收机制的不可预测性，WeakSet中的对象不确定什么时候就没了 所以规定WeakSet不可被遍历

> WeakSet不可遍历 所以只有 `add()` `delete()` `has()`三个方法

### Map

结构与对象类似，但是对象的键只能是字符串，Map的键可以是任何类型的值

```JS
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

> 如果键是对象，想用get获取，参数必须是这个对象的引用，注意

1. `size` 属性返回 Map 结构的成员总数。
2. `set(key, value)` 添加键值对
3. `get(key)` 获取对应的键值
4. `has(key)` 某个键是否存在
5. `delete(key)` 删除某个键值对，返回布尔值是否删除成功
6. `clear()` 清空所有成员
7. `keys()`：返回键名的遍历器
8. `values()`：返回键值的遍历器
9. `entries()`：返回所有成员的遍历器
10. `forEach()`：遍历 Map 的所有成员。

> Map转数组直接使用对象扩展符 [...map]

### WeakMap

结构与Map类似，用于生成键值对的集合，与Map区别有两点：

1. WeakMap只接受对象和Symbol值作为键名
2. WeakMap键名所指向的对象不计入垃圾回收机制

> WeakMap设计的目的在于，有时我们想在对象上面存放一些数据，但是会形成对于这个对象的引用，不需要这个对象了需要手动删除引用，否则垃圾回收机制无法释放空间

> 无法遍历，只有 `get()`、`set()`、`has()`、`delete()`四个方法可以用

### Proxy

Proxy可以理解为在目标对象之前架设一层拦截，外界对该对象的访问都必须进过这层拦截，并且可以对外界的访问进行过滤和改写。见 Code/Proxy.js

Vue2使用Object.defineProperty()实现响应式系统，有两个缺点:

1. Object.defineProperty()只能对属性进行操作
2. 必须对对象的每个属性都进行遍历才能实现响应式，这在处理大型对象是会很缓慢

Vue3使用Proxy实现的响应式，需要响应式的对象会生成一个proxy对象，对proxy对象的get操作被拦截后记录下哪个组件依赖了这个数据，数据改变后拦截set操作将变化通知给所有依赖这个数据的组件进行更新

### 补充：Object.defineProperty()

`Object.defineProperty(obj, prop, desc)`的作用其实就是给一个对象直接添加一个属性，或者修改一个已经存在的属性

- obj 需要进行操作的对象
- prop 需要操作的属性名
- 属性描述符 可以更精准的对对象属性进行控制

数据描述符( value, writable )和存储描述符( get, set )不能同时存在

### Reflect

Reflect是ES6为了操作对象而提供的API。Reflect对象的设计目的有这样几个：

1. 将Object对象上一些明显属于语言内部的方法放到Reflect对象上。（比如Object.defineProperty）
2. 修改某些Object方法的返回结果使其变得更合理，其实就是对原有Object方法的完善
3. 让Object的一些命令行为变成函数操作 比如 name in Object 改成 Reflect.has(Object, name)
4. Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础

例如，如果你想在每次设置对象属性时打印日志，同时保持设置属性的默认行为，你可以这样做：

```JS
const obj = new Proxy({}, {
  set(target, prop, value, receiver) {
    console.log(`Setting value '${value}' to '${String(prop)}'`);
    return Reflect.set(target, prop, value, receiver); // 调用Reflect.set来保持默认的设置属性行为
  }
});
```

这样做有几个好处：

1. `Reflect.set`会有一个布尔类型的返回值，提醒操作是否成功
2. 更好的语义：`Reflect`Api旨在操作对象的底层方法，这对代码的可读性和意图有好处
3. 代理兼容性：`Reflect`的方法与 `Proxy`的方法一一对应，确保了代理程序中的行为与正常对象行为一致
4. 扩展性和未来兼容性：`Reflect`Api提供了一种标准化的方式去处理对象操作，可能会有更好的兼容性和扩展性

有了Reflect对象以后，很多操作会更易读：

```JS
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1

// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

### Promise

`Promise`是处理异步编程的一种解决方案，可以理解为是一个容器，存着未来才会结束的事件的结果。`Promise`有几个特点：

1. `Promise`代表一个异步操作有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败），只有异步操作的结果可以改变状态，也就是一种‘承诺’
2. 只要状态改变就不会再变，给 `Promise`添加回调会得到这个结果
3. 缺点：一旦开始，无法中途结束，不设置回调，有错误无法感知

**注意点:**

1. `resolve()` 方法将 `Promise`的状态变为成功 `reject()` 方法将 `Promise`的状态变为失败，这两个参数把异步操作的结果抛出去，`then()`方法中的回调函数会接收到这个结果
2. `then()`方法其实可以有两个入参，是两个回调函数，第一个是成功的回调，第二个是失败的回调，`catch()`其实是 `.then(null, rejection)`或 `.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

#### Promise.prototype.finally()

`.catch()` 是当 `Promise` 失败时执行的方法，就是与状态有关。而 `.finally()`则是无论成功还是失败都会执行的方法，与状态无关，他接收一个回调函数作为参数，但是回调函数不接受任何参数，也无法知道 `Promise`的状态是成功还是失败

#### Promise.all()

接收一个Promise对象数组，数组中的所有Promise都成功，才算成功，有一个失败就算失败，回调函数通过入参拿到一个数组，数组是所有Promise的执行结果

#### Promise.race()

接收一个Promise对象数组，所有Promise中只有最快结束的结果会在其回调函数中获取到，也就是说，只要最快响应的结果

#### Promise.allSettled()

`Promise.all()`可以确定所有请求都成功了，但是只要有一个请求失败，它就会报错，而不管另外的请求是否结束。为了解决这个问题，引入 `Promise.allSettled()`方法，同样接收一个Promise对象数组，返回一个Promise，只有当所有Promise都执行结束，该方法返回的新的 Promise 实例才会更新状态，一旦发生状态变更，状态总是fulfilled，不会变成rejected。状态变成fulfilled后，它的回调函数会接收到一个数组作为参数，该数组的每个成员对应前面数组的每个 Promise 对象。

回调函数拿到的Promise数组中的每个对象都是固定的格式：

```JS
// 异步操作成功时
{status: 'fulfilled', value: value}

// 异步操作失败时
{status: 'rejected', reason: reason}
```

#### Promise.any()

它接受一个 Promise 对象的集合（例如数组）作为输入，并返回一个 Promise。

当输入集合中的任何一个 Promise 成功解决（fulfilled）时，Promise.any() 将返回一个解决的 Promise，其结果是第一个成功解决的 Promise 的结果。
如果输入集合中的所有 Promise 都被拒绝（rejected），Promise.any() 将返回一个被拒绝的 Promise，其原因是一个 AggregateError，包含所有 Promise 被拒绝的原因。

#### Promise.resolve() Promise.reject()

都是接收一个参数  将其转为一个Promise对象，一个执行成功的回调，一个执行失败的回调

### Generator

声明一个Generator函数，和普通函数的区别：

1. function 关键字和方法名之间有一个*号
2. 函数体内使用yield 将函数的执行分段
3. 调用这个方法 返回一个遍历器对象
4. 执行遍历器对象的next()方法，执行Generator一个yield步骤
5. 执行next()返回一个对象，对象中俩属性 value 代表执行的步骤的返回值，done代表是否执行完所有步骤

Generator只有在执行next方法时才会执行步骤，所以它提供了一种可以暂停执行的函数，执行时机可控

### async/await

### import export

### class

ES6 的 `class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的 `class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已

```js
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

`constructor()`方法是类的默认方法，通过 `new`命令生成对象实例时，自动调用该方法。一个类必须有 `constructor()`方法，如果没有显式定义，一个空的 `constructor()`方法会被默认添加。

[ES2022](https://github.com/tc39/proposal-class-fields) 为类的实例属性，又规定了一种新写法。实例属性现在除了可以定义在 `constructor()`方法里面的 `this`上面，也可以定义在类内部的最顶层。这种新写法的好处是，所有实例对象自身的属性都定义在类的头部，看上去比较整齐，一眼就能看出这个类有哪些实例属性。

```js
class foo {
  bar = 'hello';
  baz = 'world';

  constructor() {
    // ...
  }
}
```

在“类”的内部可以使用 `get`和 `set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为

```js
class MyClass {
  constructor() {
    // ...
  }
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}

let inst = new MyClass();

inst.prop = 123;
// setter: 123

inst.prop
// 'getter'
```
