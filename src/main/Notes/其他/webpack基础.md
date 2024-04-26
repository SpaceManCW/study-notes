## 概念

webpack是一个专门用于现代JS应用程序的静态模块打包工具。当webpack处理应用程序时，它会在内部从一个或多个入口构建一个依赖图，然后将你项目中所需的每一个模块组合成一个或多个bundles，它们均为静态资源，用于展示你的内容。webpack有高度的可配置性。

关键字：静态模块、入口、依赖图、bundles

**核心概念：**

- 入口（entry）
- 输出（output）
- loader
- 插件（plugin）
- 模式（mode）
- 浏览器兼容性（browser compatibility）
- 环境（environment）

### 入口（entry）

入口就是webpack构建内部依赖图的起点，进入起点webpack开始寻找有哪些模块和库是起点的依赖。默认起点是./src/index.js 可在webpack.config.js中进行配置一个或多个不同的起点。

### 输出（output）

output属性告诉webpack应该在哪里输出打包后的结果bundel，以及如何命名这些文件，主要输出文件的默认值是./dist/main.js，其他生成文件默认放置在./dist文件夹中。输出也是可配置的：

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),//bundle生成位置 __dirname代表当前目录 意思就是在当前目录下创建一个dist文件夹
    filename: 'my-first-webpack.bundle.js',//bundle名称
  },
};
```

### loader

webpack只能理解JS和JSON文件，loader让webpack可以去处理其他类型的文件，并将它们转化为有效模块，供应用程序使用，以及被添加到依赖图中。webpack一个很强大的特性就是可以通过import导入任何类型的模块，可以使开发人员创建出准确的依赖图。在webpack配置中loader有两个属性：

- test: 识别出哪些文件会被转换
- use：定义出在进行转换时，应该使用哪个loader

```js
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js',
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
};
```

上面代码的意思就是告诉webpack在遇到require/import语句中被解析为.txt的路径时，在对其进行打包之前，先使用raw-loader转换一下。

### 插件（plugin）

loader用于转换某些类型的模块，而插件则可以用来执行范围更广的任务。包括：打包优化、资源管理、注入环境变量。想要使用一个插件需要require()它，然后把它添加到plugins数组中。多数插件可以通过选项option自定义。也可以在一个配置文件中因为不同目的多次使用同一插件，需要通过使用new操作符来创建一个插件实例。

### 模式（mode）

通过选择development，production或none之中的一个，来设置mode参数，你可以启用webpack内置在相应环境下的优化。使其默认值为production。每个值有相应的优化行为。

### 浏览器兼容性

webpack支持所有符合ES5标准的浏览器，webpack的import()和require.ensure()需要Promise。如果想要支持旧版本的浏览器，在使用这些表达式之前需要提前加载polyfill。
