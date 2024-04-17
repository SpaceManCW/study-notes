## POST请求/多请求
发送一个POST请求：
```JS
axios.post('/user',{
    firstname: 'qiling',
    lastname: 'wuxie'
}).then(res => {
    console.log(res)
}).catch(error => {
    console.log(error)
})
```
axios.post() 方法的第一个参数是请求的地址，第二个参数是一个对象，是要post的数据。  
如果发起多个请求可以使用Promise.all。这个方法可以处理多个Promise:
```JS
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
```
注意Promise.all()接收的参数是一个Promise对象数组，后面.then接收到的结果也是一个数组，是一个由上面的Promise对象数组返回的结果构成的数组。