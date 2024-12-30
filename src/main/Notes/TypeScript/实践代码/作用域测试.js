// function test1(){
//     var a = 222
//     return a
// }
// console.log("a的值是：",a)//a is not defined
//函数内部声明的var，函数外访问不到，闭包除外

function test2(){
    var b = 222
    return function g(){
        b = 333
        return b
    }
}
var res = test2()
console.log(res())//333

for(var i = 0; i < 10; i++){
    setTimeout(() => {
        console.log(i);
    },i*1000)
}
//实际上是每隔一秒输出一个10，因为第一次函数还在等待的时候，i就已经变成10了。所以10次函数的执行，i都是10

//使用立即执行函数来捕获每次迭代时i的值
// for(var i = 0; i < 10; i++){
//     (function(i){
//         setTimeout(() => {
//             console.log(i);
//         },i*100)        
//     })(i)
// }