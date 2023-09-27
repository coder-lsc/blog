---
layout: doc
---

# keep-alive 在 react 中的实现

## keep-alive 原理

宏观思路：

- 在路由根元素上包裹高阶组件 keepAlive（起到 provider 作用）

  作用：存放每个路由组件内真实 dom 状态

- 在每个路由组件上包裹高阶组件 keepAliveTransfer

  作用：

  1. 在路由组件初次 mount 时，把虚拟 dom 转移到 keepAlive 上渲染成真实 dom。
  2. 在路由组件二次曝光时，把 keepAlive 中持久保存的真实 dom 转移回路由组件内部（核心 api： appendChild 转移真实 dom）

## keep-alive 源码

链接：https://gitee.com/luo-sicheng/react-keep-alive
