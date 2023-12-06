---
layout: doc
---

# electron 打包 chrome

## 问题描述

打包后将.dmg 文件传到没有安装 puppeteer 的电脑后报错。

```
// 此段报错通过log到本地文件获得
TypeError: Cannot read properties of undefined (reading 'newPage')ither
 1. you did not perform an installation before running the script (e.g. `npm install`) or
 2. your cache path is incorrectly configured (which is: /Users/hb19340/.cache/puppeteer).
For (2), check out our guide on configuring puppeteer at https://pptr.dev/guides/configuration.
```

找不到 puppeteer

在 puppeteer v19 以上 npm i puppeteer，会装在/Users/username/.cache/puppeteer 下，因此 electron 在打包时没有将 chrome 打包进去

```js
console.log(puppeteer.executablePath());

("/Users/luosicheng/.cache/puppeteer/chrome/mac-1069273/chrome-mac/Chromium.app/Contents/MacOS/Chromium");
```

## 解决方案

对 puppeteer 进行降级，发现 puppeteer v18 将 chrome 装在了 node_modules 中，因此可以顺利打包成功

```js
// dev
console.log(puppeteer.executablePath());
("/Users/luosicheng/Desktop/myCode/auto-publish/node_modules/puppeteer-core/.local-chromium/mac-1045629/chrome-mac/Chromium.app/Contents/MacOS/Chromium");

// build
console.log(puppeteer.executablePath());
("/Users/luosicheng/Desktop/myCode/auto-publish/dist/mac/auto-publish.app/Contents/Resources/app.asar/node_modules/puppeteer-core/.local-chromium/mac-1045629/chrome-mac/Chromium.app/Contents/MacOS/Chromium");

// 因此只需讲app.asar -> app.asar.unpacked即可
const ePath = puppeteer
  .executablePath()
  .replace("app.asar", "app.asar.unpacked");
```
