# Symbol
+ 简介
+ 众所周知的Symbol
+ for..of/for..in

## 简介
symbol类型的值是通过Symbol构造函数创建的。Symbols是不可改变且唯一的。
```TS
let sym1 = Symbol()
let sym2 = Symbol("key")
let sym3 = Symbol("key")
sym2 === sym3 //false
```
**symbols可以被用作对象属性的键**
```TS
let sym = Symbol()
let obj = {
    [sym]: "value"
}
console.log(obj[sym]) //"value"
```

## 众所周知的Symbol
+ Symbol.hasInstance 被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
+ Symbol.iterator 被for-of调用。返回对象的默认迭代器
+ Symbol.match 被String.prototype.match调用。正则表达式用来匹配字符串。
+ Symbol.replace 被String.prototype.replace调用。正则表达式用来替换字符串中匹配的子串。

当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。
## for..of/for..in
for..of会遍历可迭代的对象。
```TS
let someArray = [1, "string", false]
for (let e of someArray) {
    console.log(e)//1, "string", false
}
for (let e in someArray) {
    console.log(e)//"0", "1", "2"
}
```