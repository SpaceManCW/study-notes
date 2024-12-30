/**
 * 函数柯里化：将接受多个参数的函数转换为一系列接受单一参数的函数的过程
 * curry 可将普通函数转换为柯里化函数
 * n 为函数参数个数  接受到 n 个参数之后执行原函数
 * 利用 args 收集参数
 * 注意只有当 curry 的返回值 currySum 被调用时 curry 中 return 的函数才会执行
 * 柯里化的好处：
 * 1. 参数复用 接受一部分参数生成新的函数，下次调用时可以复用之前的参数
 * 2. 分段执行 允许函数分段执行，比如说我们需要先传入一部分参数，然后再传入剩下的参数，更灵活
 * 3. 延迟执行 可以延迟执行函数，传入所需所有参数再执行实际逻辑
 * 4. 函数组合 可以将多个函数组合在一起形成更复杂的逻辑
 */
function curry(fn, n = fn.length, args = []){
  return n === 0
    ? fn(...args)
    : (...args1) => {
      return curry(fn, n - args1.length, [...args, ...args1])
    };
}

function sum(a, b, c) {
  return a + b + c;
}

const currySum = curry(sum);

console.log(currySum(1)(2, 3));
