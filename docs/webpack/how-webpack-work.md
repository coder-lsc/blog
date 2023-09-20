---
layout: doc
---

# webpack 工作原理

## webpack 对资源的处理

webpack 只认识.js/.json 的文件，对其他类型文件要配合相应的 loader 进行转换。

## webpack 核心流程（抽象）

- make 阶段：从入口模块开始解析依赖，遇到各种后缀名的文件时分别用对应的 loader 来做模块的编译，然后生成模块依赖图 ModuleGraph

- seal 阶段：这些 module 要按照不同的规则来分组，分到不同的 chunk 里，生成 ChunkGraph，这个阶段叫做 seal。（如 splitChunks 和懒加载模块的分包逻辑）

- emit 阶段：不同类型的 chunk 用不同的模版打印成对应的代码，然后输出为 js 就好了，这个阶段叫做 emit

## webpack module 和 chunk 的区别

module：每个文件都是一个 module

chunk：每个入口文件以及懒加载文件以及分包的包都对应一个 chunk，换言之，每个打包入口都对应一个 chunk。

module 和 chunk 的关系：一个 chunk 对应着至少一个 module

compilcation 每将一个文件打成 module 后，都会 push 进一个 module 数组中。同时，该 module 下也有一个数组存放所对应的 chunkId 数组（与其打包入口所对应），当多个入口对一个文件有共用时，compilcation 会根据文件绝对路径（module 的 key 就是文件绝对路径）在 module 数组中找到已经打包过的 module，将当前 chunkId push 进该 module 下的 chunkId 数组，最后遍历所有 module，并根据每个 module 的 chunkId 数组把该 module 分别分发给每个 chunk，这样防止多次打包同一个文件。

## 生成运行时代码

```js
//生成运行时代码
function getSource(chunk) {
  return `
      (() => {
       var modules = {
         ${chunk.modules.map(
           (module) => `
           "${module.id}": (module) => {
             ${module._source}
           }
         `
         )}  
       };
       var cache = {};
       function require(moduleId) {
         var cachedModule = cache[moduleId];
         if (cachedModule !== undefined) {
           return cachedModule.exports;
         }
         var module = (cache[moduleId] = {
           exports: {},
         });
         modules[moduleId](module, module.exports, require);
         return module.exports;
       }
       var exports ={};
       ${chunk.entryModule._source}
     })();
      `;
}
```

## Compiler 和 Compilation 的区别

compiler 只有一份，compilation 可以有很多

compiler 是 webpack 的入口执行实例，其主要功能是监控代码、启动和终止一个 compilation 等宏观任务。compilation 是具体负责核心编译工作的，主要是模块依赖分析，优化、连接，打包等工作。打个粗略的比方，compiler 是人，compilation 是人的大脑，架构设计上是类似的。

当开启了 watch 模式后，监听到文件变动后直接 new Compilation 重新编译。
