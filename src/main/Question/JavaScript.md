## JS有哪些数据类型

七种基本数据类型：Number、String、Boolean、Null、Undefined、Symbol、BigInt

五种引用数据类型：Array、Object、Date、Function、RegExp

## 解决异步回调地狱

+ Promise
+ generator
+ async/await

## 事件流

事件流描述的是从页面中接收事件的顺序，DOM2级事件流包括下面几个阶段

+ 事件捕获阶段
+ 处于目标阶段
+ 事件冒泡阶段

- addEventListener是DOM2级事件新增的指定事件处理程序的操作，接收三个参数
- 要处理的事件名、作为事件处理程序的函数、一个布尔值
- 最后的布尔值如果是true表示在捕获阶段调用事件处理程序；如果是false表示在冒泡阶段调用事件处理程序
- IE只支持事件冒泡

## 事件委托

事件委托指的是不直接在DOM上设置监听函数，而是在其父元素上设置监听函数，通过事件冒泡，父元素可以监听到子元素上事件的触发

## 图片懒加载和预加载

+ 预加载：提前加载图片，当用户需要查看时直接从缓存渲染
+ 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数
+ 懒加载对服务器前端有一定缓解压力的作用，预加载会增加服务器前端的压力

## JS的new操作符做了哪些事情

+ 创建一个空对象
+ 将对象的原型设置为构造函数的原型
+ 将构造函数的this指向这个新对象

## JS的各种位置

+ clientHeight:表示可视区域的高度，不包含border和滚动条
+ offsetHeight:表示可视区域的高度，包括border和滚动条
+ scrollHeight:表示所有区域高度，包含了因为滚动被隐藏的部分
+ clientTop:表示边框border的厚度，在未指定的情况下一般为零
+ scrollTop:滚动后被隐藏的高度获取对象相对于由offsetParent属性指定的父坐标距离顶端的高度

## 异步加载JS的方法

+ defer:defer是在浏览器加载完之后执行JS代码，并按照加载顺序执行代码
+ async:async是在加载完之后立即执行，特点是乱序执行，因为每个JS代码加载时间不同

## 如何理解前端模块化

就是把复杂的文件编程一个一个独立的模块，比如JS文件分成独立的模块有利于重用和维护，这就会有模块间的依赖问题
所以有了commonJS规范，AMD,CMD规范等等，以及用于JS打包的工具webpack

+ CommonJS:开始于服务器端模块化，同步定义模块化，每个模块都是一个独立作用域，模块输出modules.exports模块加载require()引入模块
+ AMD:异步模块定义主要用于解决两个问题：被依赖的文件要早加载，加载时浏览器停止渲染，文件越多，页面失去响应的时间越长

## JS监听对象属性的改变

+ 在ES5中可以通过Object.defineProperty来实现已有属性的监听
+ 在ES6中可以通过Proxy来实现

Object.defineProperty(obj, prop, descriptor)

+ obj需要定义属性的对象
+ prop需要定义的属性
+ descriptor属性描述符

## 事件模型，DOM0级和DOM2级有什么区别，DOM分级

+ JS DOM事件流存在三个阶段：事件捕获阶段、处于目标阶段、事件冒泡阶段
+ DOM节点添加事件监听函数addEventListener(事件名,触发函数,布尔值)
+ 布尔值为true监听添加在捕获阶段,布尔值为false监听添加在冒泡阶段

事件模型常用方法：

+ event.stopPropagation:阻止捕获和冒泡阶段中，当前事件的进一步传播
+ event.preventDefault:取消该事件而不停止事件的进一步传播

## 跨域

跨域问题是由浏览器的安全限制-同源策略引起的。两个地址协议域名和端口都相同则是同域，有一个不同就是不同域。浏览器想要执行不同域的浏览器的脚本就要进行跨域操作。注意跨域并不是指请求发不出去而是发出去了，并且服务器接收到了并返回数据，只不过结果被浏览器拦截了。

以下三种方式解决跨域问题：

## CORS(跨来源资源共享)

**原理：**简单来说就是浏览器和服务器利用自定义的http头部进行沟通，从而决定请求或者响应是否成功。服务器端对于CORS的支持，主要就是通过设置Access-Control-Allow-Origin来进行的，如果浏览器检测到相应的控制就允许跨域。只需在后台中加上响应头来允许跨域。浏览器将CORS跨域请求分为简单请求(get,post,head)和非简单请求(其他方法)。

+ 简单请求的话浏览器直接发送CORS请求，在头信息增加一个Origin字段说明本次请求的来源。服务器根据这个值判断是否同意请求。响应头中的Access-Control-Allow-Origin取值决定是否同意请求。
+ 对于非简单请求需要先发送预检请求，询问服务器支持的HTTP方法，请求中包含Origin

## 反向代理解决跨域

设置一个反向代理服务器来接受前端应用的请求，而这个代理服务器一般是与前端应用同源的，或者至少是可请求的。服务器与服务器之间不存在跨域问题，以此来解决跨域

## JSONP解决跨域

原理就是src属性是不存在跨域问题的，可以自定义一个script标签，然后手动设置src属性，实现跨域。但是缺点是只能发送get请求

## XSS(跨站脚本攻击)

简单来说就是在用户的浏览器中执行了攻击者制定的脚本。用户执行攻击者的脚本，将自己的cookie发送到了攻击者的网站。攻击者获得用户信息，发送到了攻击者自己的网站

**XSS防御机制**：对输入进行过滤，对输出进行编码。对提交的所有内容进行过滤，过滤掉会导致脚本执行的相关内容；在输出数据之前对潜在威胁的字符进行编码、转义；对cookie设置HttpOnly属性，在浏览器的document对象中就看不到cookie了，JS脚本就不能读取到cookie,但浏览器还是能正常使用cookie

CSP(内容安全策略)：CSP通过指定有效的源和脚本，使得开发者可以控制页面可以加载和执行的资源。一个简单的实例：

```
Content-Security-Policy: default-src 'self'; img-src *; media-src media1.com media2.com; script-src userscripts.example.com
```

这个策略的含义是：

* 默认情况下，所有资源类型只能从同源加载（`default-src 'self'`）。
* 图像可以从任何地方加载（`img-src *`）。
* 媒体资源只能从 `media1.com` 和 `media2.com` 加载（`media-src media1.com media2.com`）。
* 脚本只能从 `userscripts.example.com` 加载（`script-src userscripts.example.com`）。

## CSRF(跨站请求伪造)

简单来说就是攻击者盗用受害者的身份，以受害者的名义发送恶意请求
原理：用户登录可信任网站A,登录状态下访问了攻击者网站B,网站B强制用户给网站A发送请求，执行网站B的恶意代码

**CSRF防御机制**：

+ 1.验证Http Referer字段：简单来说这个字段就是请求头中记录请求来源地址的，服务器可以通过对Referer字段进行验证来判断发送请求的网站是否合法
+ 2.在请求地址添加token: 用户发送请求的验证信息都存在于cookie,攻击者利用用户的cookie来通过安全验证。所以只要在cookie之外，http请求中加入一个随机的token，并在服务器端设置拦截器验证token。token不正确就可能是CSRF攻击
+ 3.在http头中自定义属性并验证：并不是把token以参数的形式置于http请求中，而是放到http头中自定义的属性中。通过XMLHttpRequest这个类，可以一次性给所有该类请求加上csrftoken这个Http头属性，并把token值放入其中。同时通过XMLHttpRequest请求的地址不会被记录到浏览器的地址栏

**token:**token可以在用户登录后产生并存放在session中，然后每次请求时把token从session中拿出，与请求中的token进行比对。难点在于如何把token以参数的形式加入请求。对于get请求，token将附在请求地址之后。对于post请求来说，要在form最后加上token相关的。但是有一个缺点就是难以保证token本身的安全，比如一些支持用户自己发表内容的网站。黑客可以在上面发送个人网站的网址就可以获得token

## Web worker

Web worker为JS创造了多线程的环境，允许主线程创建worker线程，并分配一些任务给后者，主线程运行的同时，worker线程在后台运行。worker存在于一个不同的线程，它和主线程互不干扰，可以把处理大量数据的逻辑计算放在worker里，主线程就会很流畅。worker线程一旦新建成功，就会始终运行，不会被主线程上的活动打断。有利于随时响应主线程的通信。但是这也造成worker比较消耗资源，所以一旦使用完就要关闭。

## 防抖和节流

+ 防抖：问题在于快速点击按键时，无论点击多快，只要点了一次，日志就打印一次，想要在快速点击的过程中只让最后一次产生效果，就要防抖
+ 节流：在多次点击的情况下保证每隔一段固定时间执行一次点击事件触发的函数

## var let const区别

var一般用于声明变量，是函数作用域的，但是因为var存在变量提升机制，所以在ES6新增了let和const;let和const都是块级作用域的，不存在变量提升机制，因为暂时性死区的特性，let在使用前必须进行声明。而const必须 初始化，一般用来声明常量。另外const定义的是一个对象，存的仅仅是对象的引用。

## 判断是否同域

+ http://www.a.com/a.js      http://www.a.com/b.js            同域
+ http://www.a.com/lab/a.js  http://www.a.com/script/b.js     同域，文件夹不同
+ http://www.a.com:8000/a.js http://www.a.com/b.js            不同域，端口不同
+ http://www.a.com/a.js      https://www.a.com/b.js           不同域，协议不同
+ http://www.a.com/a.js      http://script.a.com/b.js         不同域，主域相同，子域不同
+ http://www.a.com/a.js      http://a.com/b.js                不同域，不同二级域名

## parseInt()使用方法

parseInt(string, radix) 接受两个参数，第一个参数时要解析的字符串，第二个参数是要转化的进制，要点如下：

+ 只返回字符串中第一个数字
+ 允许前导和尾随空格
+ 如果第一个字符不能转换为数字就输出NaN

## Math.toFixed/Math.round/toPrecision

+ Math.toFixed(n) n是几就保留几位小数
+ Math.round(1.2)//1  四舍五入到最近的整数
+ 13.45toPrecision(3)//13.4  返回指定长度的数值字符串

## ||和&&的判定规则

|| 前面的值为true，返回true
|| 前面的值为false，返回后面的
&& 前面的值为true，返回后面的
&& 前面的值为false，返回false

## scrollWidth、offsetWidth、clientWidth

+ scrollWidth 内容+内边距+溢出尺寸
+ offsetWidth 内容+内边距+边框+滚动条
+ clientWidth 内容+内边距
+ scrollWidth 网页正文全文宽
+ scrollHeight 网页正文全文高
+ scrollTop 网页被卷去的高
+ scrollLeft 网页被卷去的左

## document对象和window对象的区别

+ 指代不同：document对象代表给定浏览器窗口中的HTML文档。window表示浏览器中打开的窗口
+ 作用不同：使用document可以对html文档进行检查修改或添加内容并处理该文档内部的事件；浏览器会为 HTML 文档创建一个 window 对象，并为每个框架创建一个额外的 window 对象。
+ 使用方式不同：document对象可以通过window对象的document属性引用或直接引用。而window对象没有应用于window对象的公开标准。

## 前端性能优化方案

### 1、减少http请求数

一个完整的http请求需要进行DNS解析、tcp三次握手建立连接、发送请求、服务端响应处理、客户端解析等一系列步骤。如果HTTP请求过多肯定会影响性能，可以将多个小文件合并成一个大文件减少请求数量

### 2、使用HTTP2

HTTP2有二进制分帧、首部压缩、服务端推送、多路复用、请求优先级等优点

### 3、静态资源使用CDN

cdn是一种分布式的网络服务，旨在通过地理位置上分散的服务器向用户分发互联网内容。上传到cdn的内容会首先放到原始服务器，当用户发起请求时，请求打到离用户最近的边缘服务器，边缘服务器上没有该资源时，边缘服务器请求原始服务器，然后将资源返回给用户的同时，边缘服务器将该资源缓存下来，下一次用户请求时，边缘服务器直接返回给用户，无需再次请求原始服务器。而存储在原始服务器的资源，有过期时间，资源过期会重新请求原始服务器。如果资源更新了，可操作缓存失效或者清除边缘服务器的缓存，边缘服务器重新请求原始服务器获取新的资源。

CDN还可以根据网络流量、各节点连接数、负载情况、用户距离、响应时间等将用户请求重新导向至离用户最近的服务节点上。可以使用户就近得到内容，解决网络拥挤的情况，提高响应速度

### 4、CSS放在文件头部，JS放在文件底部

JS的加载会阻塞页面的渲染，JS放在前面会使页面空白。而CSS放在头部是为了防止出现没有CSS的页面状态。会很丑陋

### 5、善用缓存，不重复加载资源

强缓存、协商缓存

### 6、减少重绘和重排(回流)

+ 改变样式属性时尽量使用class减少与DOM的交互
+ 频繁的修改可以现让元素脱离文档流，操作完之后再改回去，这样只会触发一次回流。绝对定位或者display:none
+ 将原始元素拷贝到一个独立的节点，操作完之后覆盖之前的

## JavaScript引擎的工作原理

JavaScript引擎是一种解释和执行 JavaScript代码的软件或硬件。主要由**解析器**、**解释器**、**优化器**、**垃圾回收器**等部分组成。负责将代码转换为可执行的指令。

**JS代码的执行过程可以分为三个阶段：解析、编译、执行**

**解析**：解析的阶段由解析器完成，主要工作是将代码转换成AST（抽象语法树)，解析过程分词法分析和语法分析，词法分析则是将代码分成一个个标记，关键字、变量名操作符等等，语法分析则是根据语法规则将标记转换为抽象语法树

**编译**：将抽象语法树转换为可执行的机器码或者字节码，编译过程还会对代码进行优化，比如消除冗余、提取变量等

**执行**：执行引擎逐行执行字节码或机器码，产生响应的输出输出到控制台或者更新浏览器的页面。

## 原型&原型链
