## Axios基本使用
使用前记得导入axios  
发送GET请求：
```JS
axios.get('/user?id=1234')
   .then(res => {
       console.log(res)
   })
   .catch(error => {
       console.log(error)
   })
   .then(() => {
       //总会执行
   })
```
注意传递参数的方式，路径后加'?'后拼接参数。还可以用另一种方式传递参数：
```JS
axios.get('/user',{
    params: {
        id: 1234
    }
}).then(res => {
       console.log(res)
   })
   .catch(error => {
       console.log(error)
   })
   .then(() => {
       //总会执行
   })
```
不在地址后面进行拼接，axios.get()这个方法第一个参数是要请求的路径，第二个参数是一个对象，可以在这个对象中加一些配置，参数就写在这里的params里面。也可以使用async/await：
```JS
async function getUser(){
    try{
        const res = await axios.get('/user?id=1234')
        console.log(res)
    }catch (error){
        console.error(error)
    }
}
```
注意要用一个函数包裹起来并在前面加上async，注意要使用try-catch捕获错误，注意await的位置。