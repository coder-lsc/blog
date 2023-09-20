---
layout: doc
---

# webpack loader 的原理解析

## loader 起到什么作用

- 核心作用：将所有复杂资源（如.png/.css/.less/.jsx/.ts 等等）转换为 webpack 可以直接处理的.js 或.json 文件（webpack 只能对.js 和.json 文件进行直接处理）

- 其他作用：扫描代码、修改代码（如 eslint-loader/babel-loader）

## loader 种类 & 顺序

loader 可以被分为四类，分别是：后置 post，普通 normal，行内 inline，前置 pre

四种 loader 调用先后顺序为：pre > normal > inline > post

同级数组test匹配时的优先级为，自下而上，自右向左。（pitch 情况下，则反过来)

## pitch

loader 如果设置了 pitch 函数，可以利用其熔断机制终端后面的 loader；及其 data 可以在 pitch 执行时和正常执行时进行共享。
