## Vue常见问题

### Vue是什么

Vue是一个用于创建单页面应用的JavaScript的Web框架，旨在更好的组织和简化开发，Vue所关注的核心是MVC模式中的视图层，同时，它也能方便地获取数据更新，并通过组件内部特定的方法实现视图与模型的交互

#### 数据驱动(MVVM)

* Model (模型层)：负责处理业务逻辑和与服务端进行交互
* View (视图层)：负责把数据转化为UI展示出来
* View-Model (视图模型层)：用于连接模型层和视图层，是Model和View的通信桥梁

#### Vue与传统开发方式的区别

* **数据驱动视图**：传统的开发方式手动操作Dom来更新视图，而Vue则是通过操作数据驱动视图，利用模板语法将数据和Dom连接起来
* **组件化**：Vue提供组件化的开发方式，将页面拆分为多个独立组件，组件只负责自己的视图和逻辑
* **响应式数据**：传统方式需要手动管理数据变化和视图更新，Vue的响应式系统数据更新时自动更新视图
* **虚拟Dom**：使用虚拟 DOM 技术来提高性能，通过对比虚拟 DOM 的变化来最小化实际 DOM 的操作。传统开发方式中，直接操作实际 DOM 元素，可能会导致频繁的重绘和重排
* **单文件组件**：将模板、样式、逻辑放到一个文件中进行开发，有利于组件的维护和管理。传统方式大多是HTML、JS、CSS分离的形式
* **生态系统和工具支持**：Vue提供了丰富的生态系统和工具支持，如 Vue Router 用于构建单页应用、Vuex 用于状态管理、Vue DevTools 用于调试等。传统开发方式中可能需要整合多个不同的库和工具来实现类似的功能

#### Vue与React的区别

**共同点：**

* 组件化思想
* 都有虚拟Dom
* 都是数据驱动视图
* 都有自己的构建工具

**不同点：**

* **数据流向不同**：`React`是单向数据流，而 `Vue`则是双向数据流
* **数据变化的实现原理不同**：`React`使用的是不可变数据，而 `Vue`使用的是可变数据
* **组件化的通信方式不同**：`React`中我们通过使用回调函数来进行通信的，而 `Vue`中子组件向父组件传递消息有两种方式：事件和回调函数
* **diff算法不同**： `React`主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。`Vue` 使用双向指针，边对比，边更新DOM

> React使用不可变数据的主要原因之一是为了更加简单的判断数据是否变化，底层使用的Object.is方法，这个方法针对引用类型的数据只有当引用地址发生变化才判断为数据修改

### Vue生命周期

Vue实例从创建到销毁的过程就是Vue的生命周期，创建-初始化-模板编译-挂载DOM-渲染 更新-渲染 卸载等一系列操作。称之为Vue生命周期。

+ new Vue() 实例化一个Vue实例
+ beforeCreate
+ beforeCreate完成后就进行数据的初始化，会定义data，方法以及事件，完成数据劫持，给组件配置观察者实例。
+ created 这时已经拿到data以及方法，可以开始调用方法进行数据请求。
+ beforeMount 相关的render函数首次被调用，已完成dom初始化，但是并未挂载
+ mounted 有初始值的DOM渲染完成
+ beforeUpdate  获取更新前的各种状态
+ updated  更新完成，所有状态都是最新的
+ beforeDestroy  销毁前，用于取消一些定时器和监听
+ destroyed  组件已经销毁

> **在created中发请求和在mounted里发请求有啥区别？**
>
> created时组件没挂载，适合发起一些不修改dom的初始化操作，mounted组件已经挂载，请求资源可能会页面闪动，适合发起一些需要操作dom的异步操作

### 什么是SPA（单页面应用）

是一种网站模型，通过动态的改变当前页面与用户交互，避免频繁切换页面影响用户体验

### computed和watch的区别

* computed本质就是一个具备缓存的watcher，依赖的属性发生变化就会更新视图。适用于计算比较消耗性能的场景，可以将复杂的逻辑放到计算属性中处理。
* watch用于观察和监听页面上的vue实例，如果要在数据变化的同时进行异步操作或者是比较大的开销，使用watch比较好；watch没有缓存性，更多的是观察作用，监听某些数据执行回调

computed：一个数据受多个数据的影响      watch：一个数据影响多个数据

总结：

1. `computed`和 `watch`都是基于 `watcher`来实现的
2. `computed`属性具备缓存，依赖的值不发生变化，对其取值不会重新执行
3. `watch`是监控值的变化，当值发生变化时调用其对应的回调函数
4. `computed`可以定义get和set赋予计算属性可写的功能

### Vue的修饰符有哪些

#### 事件修饰符

1. `.stop` 阻止冒泡
2. `.prevent` 阻止默认行为
3. `.self` 仅当 event.target 是元素本身时才会触发事件处理器，不来自子元素
4. `.capture` 添加时间监听时使用捕获模式，即先父元素处理
5. `.once` 点击事件最多触发一次
6. `.passive` 不阻止事件默认行为，立即触发

#### v-model修饰符

1. `.lazy `通过这个修饰符，将输入事件改为 change 事件，比如输入框只有在回车或失去焦点时同步，而不是输入时
2. `.number `自动将用户的输入值转化为数值类型
3. `.trim` 自动过滤用户输入的首尾空格

### Vue模板编译的原理

1. 解析器：解析模板，将模板字符串转换成抽象语法树（AST)
2. 优化器：对AST静态节点进行标记，对比虚拟DOM时跳过静态节点，提高效率
3. 代码生成器：使用AST生成render函数代码字符串

### v-model 怎么用在自定义组件上

当你在自定义组件上使用 `v-model` 时，Vue 会假定这个组件遵守特定的约定：

1. 接受一个 `value` 属性作为 prop。
2. 在输入时，触发一个名为 `input` 的自定义事件，并将新的值作为事件的参数。

### v-if和v-show的区别

v-if和v-show都可以控制dom元素的显隐，而区别在于v-show是将元素的display置为none实现元素隐藏，也就是通过css层面实现，而v-if则是直接将元素删除，因此切换显隐时v-if的性能消耗更大些。

使用场景：需要频繁切换显隐使用v-show，不频繁使用v-if

### 为什么v-if和v-for不建议同时使用

v-if和v-for同时作用在一个元素上会带来性能的浪费，即使100项中只有一个需要进行v-if，也会循环所有项目，对所有项目进行判断，因为每次渲染会先循环再进行条件判断；会造成逻辑混乱不易维护

* 可以在v-for的外层包一层使用v-if
* 可以提前使用计算属性过滤掉不需要渲染的项

### keepAlive

`<KeepAlive>` 是一个内置组件，可以实现组件的缓存，当组件切换时不会对当前组件进行卸载。常用的两个属性是 `include/exclude`，两个生命周期 `activated/deactivated`

* `include` 属性用于指定应该被缓存的组件名称，可以是一个字符串或正则表达式。
* `exclude` 属性用于指定不应该被缓存的组件名称，同样可以是一个字符串或正则表达式。
* `activated`：首次挂载，以及每次从缓存中被重新插入时调用
* `deactivated`：在DOM上移除、进入缓存以及组件被卸载时调用

### Vuex action和mutation的区别

1. **Mutations（变化）** ：

* Mutations 是 Vuex 中用于修改状态的唯一途径。
* Mutations 是同步函数，用于更改 Vuex 的状态。
* Mutations 应该是纯函数，不应该包含异步操作。
* 通过提交一个 mutation 来修改状态，可以保证状态变更的跟踪和调试。

2. **Actions（动作）** ：

* Actions 用于处理异步操作、封装业务逻辑或者多个 mutation 的操作。
* Actions 可以包含任意异步操作，例如从服务器获取数据，然后提交 mutation 来修改状态。
* Actions 是可以包含异步操作的函数，可以通过调用 `store.dispatch` 来触发。
* Actions 可以通过 `context.commit` 来提交 mutation，从而修改状态。

### 什么是mixin

实现vue组件编写可插拔，可重用，将组件中的重复逻辑封装在一起，并在组件中引用，将 mixin 的内容合并到组件中。如果你要在 mixin 中定义生命周期 hook，那么它在执行时将优化于组件自已的 hook。

### Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

vue的DOM更新是异步的，vue在调用Watcher更新视图时，并不会直接进行更新，而是把需要更新的Watcher加入到queueWatcher队列里，然后把具体的更新方法flushSchedulerQueue 传给nexTick 进行调用。所以在nexTick的回调中可以获取到更新后的真实DOM，这确保了数据变更的顺序和同步性。

并且如果同一个Watcher被多次触发，则只会被推到队列里一次，去除了重复的操作，提高效率

### Vue的data属性为什么是一个函数而不是对象

为了防止多个组件实例对象共用一个data产生数据污染，采用函数形式将其作为工厂函数返回全新的data对象

### 动态给Vue的data添加新属性会发生什么？怎么解决？

因为vue2是使用Object.defineProperty实现的数据响应式，新增的属性无法劫持，导致添加的新属性无法触发属性的拦截，也就无法更新视图

**解决方法：**

1. 使用Vue.set()
2. 使用Object.assign 创建新对象，将状态和新属性混合在新对象中
3. 强制更新 $forceUpdate

### Vue的双向绑定

当我们用 `JavaScript`代码更新 `Model`时，`View`就会自动更新双向绑定就很容易联想到了，在单向绑定的基础上，用户更新了 `View`，`Model`的数据也自动被更新了，这种情况就是双向绑定 

> 双向数据绑定的原理：
>
> Vue双向数据绑定依赖MVVM架构中的VM层，所谓双向数据绑定就是数据的更新会触发视图的更新，而视图的变化同样可以触发数据的更新
>
> 那么数据更新怎么触发视图更新？
>
> 数据更新时，不能让所有的dom都进行更新，只需要更新依赖该数据的节点即可，所以需要一个对象对节点的依赖进行收集，这个对象就是Dep；由于dom节点结构复杂，所以创建一个相对简单的watcher类作为依赖被收集起来。每当数据变化时触发setter就将通知Dep中收集的所有watcher依赖进行视图更新
>
> 那么视图更新怎么触发数据更新？
>
> 视图更新时，通过触发一些事件监听来更新视图