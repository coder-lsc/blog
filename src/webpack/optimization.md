---
layout: doc
---

# webpack 优化

## 优化角度

- 编译速度
- 打包体积

## 如何提高编译速度

- 减少查找过程（优化 webpack 配置中的 resolve，优化查找对应文件的速度）

- 缩小构建目标（loader 配置时设置 exclude 和 include）

- 多线程打包（如 happypack、thread-loader）

- 在编译工具上做文章（如 babel 改用 swc，esbuild-loader 等）

- **给编译结果做缓存**

- sourceMap 不用太详细

### 编译缓存

- dll（动态链接库）：给一些常年不变的第三方库，如 react、loadsh 等，做缓存映射。vue-cli 和 cra 都在 webpack 4 的时候去除了 dll，commit 信息上说 webpack 4 的打包效率已经不需要再使用 dll 了

- cache-loader：给耗时长的 loader 设置缓存，如 babel-loader

- HardSourceWebpackPlugin/webpack 5 内置文件缓存（最优）

### 如何减小打包体积

- 路由懒加载（减小主包体积）

- splitChunk 分包（减小主包体积）：对 node_modules 和公共模块如 utils/request/storage 封装等模块都进行分包

- tree-shaking：去除死代码和无效导出

- 资源压缩（js 压缩/css 压缩/图片压缩）

- externals：将很大的三方库改用 cdn 链接引入，如 vue、echarts（由于包减小了，同时也能优化速度）
