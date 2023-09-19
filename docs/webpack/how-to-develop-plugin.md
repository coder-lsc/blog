---
layout: doc
---
# 如何开发一个简易的webpack plugin

## 需求背景介绍
开发一个命令行工具

该命令行工具，在全局执行时，需要让操作系统知道你要执行的文件是要在什么环境下执行（如是在node环境下执行）

只需要在执行文件的第一行加上注释代码： **#!/usr/bin/env node**

（上述所说的这行注释代码一般被称为"shebang"）

但webpack在打包压缩时会将该行代码shaking掉

**因此我们要在webpack压缩后再加上该行代码**

## 具体代码实现
```js
const fs = require("fs");
const path = require("path");

module.exports = class ShebangPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("ShebangPlugin", (compilation) => {
      compilation.chunks.forEach(function (chunk) {
        chunk.files.forEach(function (filename) {
          // compilation.assets 存放当前所有即将输出的资源
          // 调用一个输出资源的 source() 方法能获取到输出资源的内容
          let source = compilation.assets[filename].source();
          source = "#!/usr/bin/env node\n" + source;
          compilation.assets[filename] = {
            source: function () {
              return source;
            },
            size: function () {
              return source.length;
            },
          };
        });
      });
    });
    compiler.hooks.assetEmitted.tap("ShebangPlugin", (fileName) => {
      const outputFile = path.resolve(__dirname, "dist", fileName);
      // 将输出文件的chmod改为 chmod u+x 增加可执行权限
      fs.chmodSync(outputFile, 0o755);
    });
  }
};

```

## 相关文档
webpack compiler.hooks列表 https://webpack.docschina.org/api/compiler-hooks/