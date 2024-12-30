## React 问题梳理

[https://juejin.cn/post/7112400668136046606#heading-7]()

### React中 Class组件中的this和Hook中的this分别指向什么？

### Hook和Class组件分别对应生命周期的情况有哪些？

### useEffect原理，他用了什么数据结构？

数据结构: 单向循环链表

原理: 每个hook会生成生成hook对象，按顺序挂载到hooks链表上，`useEffect` 以及 `useLayoutEffect`比较特殊，会额外生成effect对象，一个单向循环链表

#### 为什么是单向循环

为了实现两个逻辑，一个是新增节点，一个是从头部开始遍历，一般情况我们会生成两个变量记录头结点和尾节点，单向循环可以只用一个变量实现

#### hooks原理

1. 每个hook内部方法都有mountXxx和updateXxx, 会在首次加载和更新时调用， 如useEffect内部叫mountEffect和updateEffect, useRef有mountRef何updateRef,
2. 主要是 `fiber.memoizedState`和 `fiber.updateQueue`这两个属性，上面说的mountXxx方法就是生成一个hook对象，挂载到memoizedState上，形成一个单向链表，而有处理副作用的方法 `useEffect`, `useLayoutEffect`会额外生成一个 `effect`对象，是一个单向循环链表，挂载到 `updateQueue`上，

##### 为什么是链表，而不是数组或map

1. 有个替代方案是限制一个组件调用多次 `useState()`, 会导致自定义hook无法使用
2. 如果使用key做标识，会有命名冲突
3. symbol做标识，会导致同一个hook无法调用两次
4. 多重继承问题，多个hook同时调用同一一个hook
   ...

   作者说过key做标识可以实现，但是同样需要遵守额外的规则，而且比遵守Hooks规则的阻力会更大

### 说一下Fiber和React事件调度机制

### hooks为什么不能放在if里

### useContext

### useMemo

### 自定义hook

### 数字精度问题

IEEE754标准，数字二进制表示， 0.1是个无限小数，导致误差 0.1 + 0.2 === 0.3 // false 解决方法: 

ECMAScript 6 引入了 `Number.EPSILON` 常量，可以用于表示浮点数比较的最小误差范围，例如：

```js
const result = Math.abs((0.1 + 0.2) - 0.3) < Number.EPSILON; // true
```

### 检测数据类型
