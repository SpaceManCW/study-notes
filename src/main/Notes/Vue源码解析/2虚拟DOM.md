## 虚拟DOM

> **什么是虚拟DOM?**
>
> 虚拟DOM就是用js对象来描述一个DOM节点，把组成一个 `DOM`节点的必要东西通过一个 `JS`对象表示出来
>
> **为什么要有虚拟DOM?**
>
> 更新数据之后要更新视图，难免要操作真实 `DOM`，这是非常消耗性能的，只能尽量减少对真实DOM的操作。虚拟DOM就是做这个的。
>
> **虚拟DOM怎么减少对真实DOM的操作？**
>
> 通过 `DOM-Diff`算法比较数据变化前后的状态计算出需要更新的地方，也就是对比变化前后的虚拟DOM去更新需要更新的视图

Vue中有一个 `VNode`类，通过这个类就可以实例化出不同类型的虚拟 `DOM`，包括，注释节点、文本节点、元素节点、组件节点、函数式组件节点、克隆节点

```js
// 源码位置：src/core/vdom/vnode.js

export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
    this.elm = elm       /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined            /*当前节点的名字空间*/
    this.context = context          /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined       /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key           /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions   /*组件的option选项*/
    this.componentInstance = undefined       /*当前节点对应的组件的实例*/
    this.parent = undefined           /*当前节点的父节点*/
    this.raw = false         /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  get child (): Component | void {
    return this.componentInstance
  }
}
```

`VNode`类中包含了描述一个真实 `DOM`节点所需要的一系列属性，如 `tag`表示节点的标签名，`text`表示节点中包含的文本，`children`表示该节点包含的子节点等。通过属性之间不同的搭配，就可以描述出各种类型的真实 `DOM`节点。
