const arr = [1,2,3,4,5,6]
const obj = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}
// 输出 0 1 2 3 4 5
for (let i in arr) {
  console.log(i)
}

// 输出 1 2 3 4 5 6
for (let i of arr) {
  console.log(i)
}

// 输出 1 2 3 4
for (let i in obj) {
  console.log(i)
}

// 报错  for...of不能遍历对象
for (let i of obj) {
  console.log(i)
}

/**
 * for...in遍历的是key for...of遍历的是value
 * for...of无法遍历对象 一般只用来遍历数组
 * 为什么不用for..in遍历数组？  因为for...in不止能遍历数组元素还能遍历自定义属性和原型的属性和方法
 */