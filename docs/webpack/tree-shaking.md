---
layout: doc
---

# webpack Tree-Shaking

## Tree-Shaking 定义

Tree-Shaking 是一种基于 ES Module 规范的 Dead Code Elimination 技术，它会在运行过程中静态分析模块之间的导入导出，确定 ESM 模块中哪些导出值未曾其它模块使用，并将其删除，以此实现打包产物的优化。

## 为什么只能是 ES Module

因为 esm 规范下，import 语句必须在顶层，这样才能进行静态分析。cjs 的 require 可能在 if 语句中，无法进行静态分析。

## Shaking 核心流程

1. 首先，Webpack 需要弄清楚每个模块分别有什么导出值，这一过程发生在 make 阶段

2. 模块导出信息收集完毕后，Webpack 需要标记出各个模块的导出列表中，哪些导出值有被其它模块用到，哪些没有。这一过程发生在 Seal 阶段

3. 生成代码时给没有用到的值上加上代码注释 **/\* unused harmony export xxx \*/**

4. 由 Terser 扫描注释，根据命中注释中的内容删除对应的变量

## 在 Webpack 中启动 Tree Shaking

在 Webpack 中，启动 Tree Shaking 功能必须同时满足三个条件：

- 使用 ESM 规范编写模块代码
- 配置 optimization.usedExports 为 true，启动标记功能
- 启动代码优化功能，可以通过如下方式实现：
  - 配置 mode = production
  - 配置 optimization.minimize = true
  - 提供 optimization.minimizer 数组

## 相关文章

链接：https://juejin.cn/post/7002410645316436004
