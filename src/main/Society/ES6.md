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

> WeakSet不可遍历 所以只有`add()` `delete()` `has()`三个方法

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

> 无法遍历，只有`get()`、`set()`、`has()`、`delete()`四个方法可以用

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


