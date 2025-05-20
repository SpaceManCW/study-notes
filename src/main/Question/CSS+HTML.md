## CSS盒子模型

**盒子模型就是用来装页面上元素的矩形区域，主要有两种**

+ 标准盒子模型
+ IE盒子模型

标准盒子模型和IE盒子模型的区别在于对widtd的计算，标准盒子模型的宽度就是content的宽度；IE盒子模型的宽度是content+padding+border

+ 那么怎么设置这两种盒子模型 ？
  通过CSS提供的box-sizing,box-sizing:content-box表示标准盒子模型 ；box-sizing:border-box表示IE盒子模型
+ 为什么会有两种盒子模型？
  在微软的市场份额达到百分之80的时候，他们想自己制定一套浏览器标准，其中就包括IE盒子模型。但是其他的浏览器厂商并不同意微软的做法，就采用了W3C的标准。这就导致IE浏览器和其他浏览器盒子模型不同，但是一些老网站仍然是IE盒子模型，所以就把IE盒子模型保留了下来。
+ 应用场景：如果我们想设置两个子容器，使其都左浮动，然后宽度都设置为50%，然后给一点padding，运行就会发现两个子容器换行了，这时就可以用标准盒子模型了。

## link和import的区别/src与href的区别

link和import的区别：

+ link是属于html标签，而@import是css提供的，只能加载CSS
+ 页面加载时link就加载，而@import引入的是在页面加载结束后加载
+ link权重高于import
+ link支持使用JS控制DOM改变样式，@import不允许

src与href的区别：

+ href是超文本引用，引用和页面关联，表示在当前元素和引用资源之间建立联系
+ src表示引用资源替换当前元素，会将指向资源下载并应用到当前文档中

## Flex布局

常见的布局方案对于一些特殊的布局很不方便，比如垂直居中。Flex非常灵活，Flex布局的属性大致分为容器属性和元素属性

**容器属性：**

+ flex-direction: row | row-reverse | column | column-reverse决定主轴方向
+ flex-wrap: nowarp | wrap | wrap-reverse 决定换行规则
+ justify-content: 水平主轴对其方式
+ align-items: 垂直轴线对齐方式

**元素属性：**

+ order: 定义元素排列顺序，序号小的靠前
+ flex-grow: 定义项目放大比例,取值为1是自适应,取值为0则没大小
+ flex-shrink: 定义项目缩小比例,空间不足时缩小，取值0则不缩小
+ flex-basis: 定义了在分配多余空间时项目占据的空间，设置为auto则根据内容判断大小，可以设置为一个具体的值，如100px
+ flex: 是上面三种属性的缩写，默认值0 1 auto
+ align-self: 允许单个项目与其他项目不一样的对其方式，可以覆盖align-item默认值是auto表示继承父元素的align-items

## BFC(块级格式化上下文)

可形成独立渲染区域，通常用于清除浮动，防止margin重叠。BFC是一个独立的容器，容器内元素不会影响外面，计算高度时，浮动元素也计算在内。

**BFC形成条件：**

+ 根元素
+ 浮动元素
+ 绝对定位元素absolute、fixed
+ display为inline-block、table-cell、table-caption、flex、inline-flex
+ overflow 不为visible的元素

**BFC应用场景：**

+ 防止margin重叠
+ 自适应两栏布局，left浮动，right设置overflow: hidden,这样不会重叠
+ 清除浮动

## 块级元素和行级元素

**块元素：**独占一行，并且自动填满父元素，可以设置盒子模型的属性；主要有：div、p、h1-6、ol、ul、table、form
**行元素：**不会独占一行，width和height会失效，垂直方向上的padding和margin会失效，只能容纳文本和其他行元素;主要有：a、em、strong、span、i、label、br
**行内块：**综合块级元素与行内元素的特性，可设宽高（默认是内容宽高），也可以设置内外边距；主要有img和input、textarea等，其实属于行元素

p是块级元素，但是不能包含除了p之外的其他块级元素；a是行内元素，但是可以包含它本身外的任意块元素

## HTML5新标签

## visibility = hidden, opacity=0, display: none

opacity=0:元素被隐藏，不改变布局，可以触发绑定事件
visibility = hidden:元素被隐藏，不改变布局，不可以出发绑定事件
display: none:元素被隐藏，会改变布局，不可触发点击事件，可以理解成该元素被删除了

## 双边距重叠(外边距重叠)

多个相邻普通流的块元素垂直方向上的margin会重叠

+ 两个正数取较大的
+ 两个负数取绝对值大的
+ 一正一负取二者的和

## 清除浮动

+ 在浮动元素后使用一个带clear属性的空元素
+ 使用CSS的overflow属性，给浮动元素的容器添加overflow:hidden或者overflow:auto清除浮动，添加overflow属性后浮动元素回到容器层，把容器高度撑开
+ 给浮动元素后面的元素添加clear属性
+ 给浮动的元素的容器添加浮动
+ 使用CSS的:after属性，相当于在现元素的末尾添加一个看不见的块清除浮动

## CSS选择器，样式优先级

+ **样式优先级：**!important > 内联样式 > 内部样式 > 外部样式 > 浏览器用户自定义样式 > 浏览器默认样式
+ 内联样式>ID选择器>类选择器=属性选择器=伪类选择器>标签选择器=伪元素选择器
+ 同一元素引用多个样式，排在后面的样式属性优先级高
+ 样式选择器类型不同时：id选择器 > 类选择器 > 标签选择器
+ 标签选择器存在层级关系，后代属性会覆盖祖先属性，继承的样式优先级比较低
+ 属性选择器和伪类选择器优先级相同

## grid网状布局

给div设置display: grid;那么这个div就是一个网状布局容器，此div的直接下一级元素称为项目。布局属性分为容器属性和项目属性。

容器属性：

+ grid-template-columns  此属性设置每一列的列宽
+ grid-template-rows 定义每一行的行高
+ repeat  grid-template-rows: 30px 30px 30px 等价于grid-template-rows: repeat(3, 30px)
+ auto-fill关键字  grid-template-rows: repeat(auto-fill, 30px)表示自动填充30px的块直到容器装满

## 三栏布局

+ 1、浮动加margin
+ 2、定位
+ 3、table
+ 4、flex
+ 5、grid

## display属性详解

display也就是展示，通常用于定义元素生成显示框的类型：

+ inline  默认值，元素会被显示为内联元素，无法设置width，height，不独占一行
+ block  块级元素，前后有换行符，可以设置width,height,元素独占一行
+ inline-block  行内块元素，可以设置width和height,不独占一行
+ table 此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符
+ table-cell 此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）

## 垂直居中的方法

**三种方法：**

+ 1、首先想到的是对子元素设置left和top都是50%，这时子元素显示在父元素中心点的右下角。然后利用margin top和left负值为子元素大小的一半使其向左上方偏移至水平垂直居中。
+ 2、利用calc可以直接设置top和left为（50%-子元素高或宽的一半）

但是上面两种方式都必须知道子元素的大小，下面的方法比较好

+ 3、transform的translate属性也可以设置百分比，其是相对于自身的宽和高，所以可以讲translate设置为-50%，就可以做到居中了。
+ 4、第三种就是将子元素四个位置都设置为零，margin设置为auto实现垂直居中。如果不把四个位置设置为0那么margin：auto将被视为margin: 0,如果不设置margin: auto，由于left和top的优先级高，子元素将显示在左上角。
+ 5、还有一种是利用table的属性，将父元素设置为display: table-cell然后使用text-align: center;vertical-align: middle;使单元格里的内容水平垂直居中，当然子元素也要设置为display: inline-block
+ 6、flex布局，父元素display: flex; justify-content: center; align-items: center
+ 7、父元素grid布局，父元素display: grid; 子元素justify-self: center; align-item: center。但由于兼容性不好没有广泛使用

## 标签语义化

header、footer、nav、article、aside、section主要作用就是提升用户体验、使代码更具有可读性，使代码结构更清晰

## Promise和async/await的区别

async/await是寄生于Promise和generator的语法糖。

+ Promise是ES6的，async/await是ES7的
+ async/await相对于Promise写法上更加优雅
+ promise错误可以通过catch来捕捉，建议尾部捕获错误，async/await既可以用.then又可以用try-catch捕捉

## 伪类/伪元素
