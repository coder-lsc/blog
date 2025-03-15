---
layout: doc
---

# 复用登录态 & 链接本地 chrome 踩坑

## 背景介绍

很多网站，尤其公司内网，登录需要一系列复杂的验证流程（如钉钉扫码、手机验证码等）

puppeteer 默认每次执行都会开启新的 userDataDir，也就是不缓存登录态，每次都需要手动登录

## 方案一：复用 chrome 已有的登录态

将电脑上装好的 chrome 给 puppeteer 用，登录态自然会被读取（cookie/storage）

```js
const browser = await puppeteer.launch({
  // headless: true,
  slowMo: 100,
  devtools: true,
  executablePath:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  userDataDir: "/Users/xxx/Library/Application Support/Google/Chrome",
});
```

## 如何获取本地 chrome 的 executablePath 和 userDataDir

启动 Chrome 浏览器

在地址栏输入“chrome://version/”，然后按回车键

在 Mac 下默认

```
chrome://version/
可执行文件路径	/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
个人资料路径	/Users/xxx/Library/Application Support/Google/Chrome/Default

相对应：
executablePath: /Applications/Google Chrome.app/Contents/MacOS/Google\ Chrome
userDataDir: /Users/xxx/Library/Application\ Support/Google/Chrome

```

## 踩坑记录

如果 chrome 没有关闭就运行 puppeteer 脚本，并且 headless: false 就会报错**Error: Failed to launch the browser process!**

解决方案：

1.要将日常使用的 chrome 先关闭再运行 puppeteer 脚本

2.headless: true

缺点：每次调试 puppeteer 就要关闭日常使用的 chrome，建议使用下一个方案

## 方案二（推荐）：独享 userDataDir

开启一个专门跑 pupeteer 的 chrome。即 userDataDir 创建一个固定的新目录存放即可。

```js
const puppeteer = require("puppeteer");
const path = require("path");
const fs = require("fs");
const os = require("os");

(async () => {
  createDir(path.join(getDesktopPath(), "puppeteer"));
  const browser = await puppeteer.launch({
    // headless: true,
    slowMo: 100,
    devtools: true,
    userDataDir: path.join(getDesktopPath(), "puppeteer"),
  });
})();

function getDesktopPath() {
  const homeDir = os.homedir();
  const desktopPath = path.join(homeDir, "Desktop");
  return desktopPath;
}

function createDir(folderPath) {
  if (fs.existsSync(folderPath)) return;
  fs.mkdirSync(folderPath);
}
```

## 第一次进入没有登录态怎么办？

原理：运用 page.waitForFunction 函数暂停操作。

操作步骤：

1.手动登录

2.在控制台输入 window.x = 123 即可

```js
(async () => {
  createDir(path.join(getDesktopPath(), "puppeteer"));
  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 100,
    devtools: true,
    userDataDir: path.join(getDesktopPath(), "puppeteer"),
  });
  const page = await browser.newPage();
  await page.goto("https://xxx");
  await page.waitForFunction(
    () => {
      if (window.x) return true;
    },
    { timeout: 0 }
  );
})();
```
