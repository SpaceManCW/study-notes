## src和href的区别

1. src通常用于img、video、audio、script元素，通过src指向外部资源，指向的资源下载时其他资源会停止下载，最终的内容会嵌入到当前文档当前标签所在位置
2. 当浏览器识别到href指向的资源时，会并向下载资源，不会停止其他资源的下载，通常用于a、link元素
3. src用于替换当前资源， href用于在文档和外部资源之间建立联系