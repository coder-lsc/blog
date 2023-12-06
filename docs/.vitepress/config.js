export default {
  // ...
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/blog/favicon.ico" }]], // 添加网站图标
  themeConfig: {
    siteTitle: "前端技术", // 可以设为false
    logo: "/favicon.ico",
    docFooter: {
      //上下篇文本
      prev: "上一篇",
      next: "下一篇",
    },
    nav: [{ text: "指南", link: "/guide/index" }],
    sidebar: [
      {
        text: "计算机网络",
        collapsible: true,
        collapsed: false,
        items: [
          {
            text: "http 状态码 301、302、303、307、308 的区别",
            link: "/network/30x.md",
          },
          { text: "浏览器跨域问题", link: "/network/cors.md" },
          { text: "浏览器输入url回车", link: "/network/url-entry.md" },
          { text: "浏览器强缓存&协商缓存", link: "/network/browser-cache.md" },
          { text: "TCP三次握手", link: "/network/TCP三次握手.md" },
          { text: "HTTPS握手", link: "/network/HTTPS握手.md" },
          { text: "队头阻塞", link: "/network/head-of-line.md" },
        ],
      },
      {
        text: "react相关问题",
        collapsible: true,
        collapsed: false,
        items: [
          {
            text: "为什么类组件需要手动绑定this",
            link: "/react/why-bind-this",
          },
          { text: "immer", link: "/react/immer" },
          {
            text: "keep-alive在react中的实现",
            link: "/react/how-to-keep-alive",
          },
          { text: "时间切片", link: "/react/time-split" },
        ],
      },
      {
        text: "webpack工程化",
        collapsible: true,
        collapsed: false,
        items: [
          { text: "webpack工作原理", link: "/webpack/how-webpack-work" },
          { text: "loader原理解析", link: "/webpack/what-is-loader" },
          {
            text: "loader开发示例",
            link: "/webpack/how-to-develop-loader",
          },
          { text: "plugin原理解析", link: "/webpack/what-is-plugin" },
          {
            text: "plugin开发示例",
            link: "/webpack/how-to-develop-plugin",
          },
          { text: "Tree-Shaking", link: "/webpack/tree-shaking" },
          { text: "webpack优化", link: "/webpack/optimization" },
        ],
      },
      {
        text: "puppeteer踩坑记录",
        collapsible: false,
        collapsed: false,
        items: [
          { text: "复用登录态", link: "/puppeteer/link" },
          { text: "electron打包chrome", link: "/puppeteer/build-in-electron" },
        ],
      },
      {
        text: "JavaScript基础",
        collapsible: false,
        collapsed: false,
        items: [
          { text: "手写题合集", link: "/jsCommon/手写题合集" },
          { text: "原型链", link: "/jsCommon/原型链" },
          { text: "继承", link: "/jsCommon/继承" },
          { text: "浮点数精度问题", link: "/jsCommon/floatNumber" },
        ],
      },
    ],

    // socialLinks: [{ icon: "github", link: "https://gitee.com/" }],
  },
};
