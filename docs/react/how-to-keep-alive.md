---
layout: doc
---

# keep-alive 在 react 中的实现

## keep-alive 原理

### 宏观思路：

- 在路由根元素上包裹高阶组件 keepAlive（起到 provider 作用）

  作用：provider 提供一个 cache 对象，每个路由组件在对象中对应一个 cacheId 作为 key 以防重复，value 中存放每个路由组件内真实 dom

- 在每个路由组件上包裹高阶组件 keepAliveTransfer

  作用：

  1. 在路由组件初次 mount 时，把虚拟 dom 转移到 keepAlive 上渲染成真实 dom（在 keepAlive 上渲染的一瞬间就会被 dispatch 提交到 cache 对象中，继而立刻同步到 keepAliveTransfer 组件上，并通过 appendChild 渲染在路由组件内部，但实际存储在 keepAlive 的 cache 对象中）
  2. 在路由组件二次曝光时，把 keepAlive 中持久保存的真实 dom 转移回路由组件内部（核心 api： appendChild 转移真实 dom）

  ### 实现细节

  核心 api： appendChild 转移真实 dom

  网上也有很多种实现方案使用了 reactDom.createPortal()，本质上和 appendChild 的作用是一样的。

  ### 补充

  由于路由组件内的真实 dom 被保存到了顶层 keepAlive 的 cache 对象中，因此在路由失活时不会丢失内部 dom 的状态，当路由再次活跃时，只需从顶层 keepAlive 的 cache 对象中 appendChild 即可

## keep-alive 源码

链接：https://gitee.com/luo-sicheng/react-keep-alive
