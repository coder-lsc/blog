---
layout: doc
---

# webpack plugin 的原理解析

## 具体 Hooks

webpack 提供了很多 hooks 共开发者使用。如：

- run (再编辑器开始读取记录前执行)

- compile (再一个新的 compliation 创建之前执行)

- compilation (再一个新的 compliation 创建后执行)

- make(compilation 结束之前执行)

- emit(输出 asset 到 output 目录之前执行)

- afterEmit(输出 asset 到 output 目录之后执行)

- done(在 compilation 完成时执行)

更多 hook 官方文档：
https://webpack.docschina.org/api/compiler-hooks/

## Hooks 种类

所有具体的 Hook 都是以下这 10 种中的一种

```js
// 源码取自：lib/index.js
"use strict";

exports.__esModule = true;
// 同步执行的钩子，不能处理异步任务
exports.SyncHook = require("./SyncHook");
// 同步执行的钩子，返回非空时，阻止向下执行
exports.SyncBailHook = require("./SyncBailHook");
// 同步执行的钩子，支持将返回值透传到下一个钩子中
exports.SyncWaterfallHook = require("./SyncWaterfallHook");
// 同步执行的钩子，支持将返回值透传到下一个钩子中，返回非空时，重复执行
exports.SyncLoopHook = require("./SyncLoopHook");
// 异步并行的钩子
exports.AsyncParallelHook = require("./AsyncParallelHook");
// 异步并行的钩子，返回非空时，阻止向下执行，直接执行回调
exports.AsyncParallelBailHook = require("./AsyncParallelBailHook");
// 异步串行的钩子
exports.AsyncSeriesHook = require("./AsyncSeriesHook");
// 异步串行的钩子，返回非空时，阻止向下执行，直接执行回调
exports.AsyncSeriesBailHook = require("./AsyncSeriesBailHook");
// 支持异步串行 && 并行的钩子，返回非空时，重复执行
exports.AsyncSeriesLoopHook = require("./AsyncSeriesLoopHook");
// 异步串行的钩子，下一步依赖上一步返回的值
exports.AsyncSeriesWaterfallHook = require("./AsyncSeriesWaterfallHook");
// 以下 2 个是 hook 工具类，分别用于 hooks 映射以及 hooks 重定向
exports.HookMap = require("./HookMap");
exports.MultiHook = require("./MultiHook");
```

比如 run、emit、assetEmitted 就是 AsyncSeriesHook

compile、compilation 是 SyncHook

## tapable

Tapable 是 Webpack 核心工具库，它提供了所有 Hook 的抽象类定义，Webpack 许多对象都是继承自 Tapable 类。比如 hooks 回调的方法 tap、tapAsync 和 tapPromise 都是通过 Tapable 进行暴露的:

```js
// 第二节 “创建一个 Plugin” 中说的 10 种 Hooks 都是继承了这两个类
// 源码取自：tapable.d.ts
declare class Hook<T, R, AdditionalOptions = UnsetAdditionalOptions> {
  tap(
    options: string | (Tap & IfSet<AdditionalOptions>),
    fn: (...args: AsArray<T>) => R
  ): void;
}

declare class AsyncHook<T, R, AdditionalOptions = UnsetAdditionalOptions>
  extends Hook<T, R, AdditionalOptions>
{
  tapAsync(
    options: string | (Tap & IfSet<AdditionalOptions>),
    fn: (...args: Append<AsArray<T>, InnerCallback<Error, R>>) => void
  ): void;
  tapPromise(
    options: string | (Tap & IfSet<AdditionalOptions>),
    fn: (...args: AsArray<T>) => Promise<R>
  ): void;
}
```

- Hook 类的 具体 Hook 只能通过 tap 方法调用

- AsyncHook 类的 具体 Hook 支持 tap、tapAsync、tapPromise 三种形式调用

上述列举的 Hooks 有十种类型 全都是继承自 Hook 类\AsyncHook 类

## 相关链接

手把手带你入门Webpack Plugin
https://juejin.cn/post/6968988552075952141