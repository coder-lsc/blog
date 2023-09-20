---
layout: doc
---

# webpack loader 开发示例

## 需求背景介绍

border: 1px 在部分 ios 机型上会展示异常，如半边 border 不展示

常规解决方案：在元素上设置 2px 的 border 伪元素，并通过 scale(0.5)缩小回 1px

优化点：代码冗长，且共同点明显，希望简洁代码

loader 方案：在 less 文件中，扫描 /_ half-border _/ 注释，如命中则给当前父类添加伪元素

触发时机：匹配.less文件 并作用于less-loader之前

## 具体代码实现

```js
module.exports = function (content, map, meta) {
  const borderOptions = new RegExp(
    /\/\*[\s\S]*half-border[\s\S]*\*\/([\s\S]*);/g
  );
  const oldStingMatch = content.match(borderOptions) || [];

  if (!oldStingMatch.length) {
    this.callback(null, content, map, meta);
    return;
  }

  const oldString = oldStingMatch[0];
  const oldPx = Number(oldString.match(/(\d+)px/)[1]);
  const newContent = content.replace(
    oldString,
    `
      position: relative;
      padding: ${oldPx}px;
      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        ${oldString.replace(oldPx, oldPx * 2)};
        box-sizing: border-box;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
      }
    `
  );

  this.callback(null, newContent, map, meta);
  return;
};
```
