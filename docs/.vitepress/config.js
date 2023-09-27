export default {
  // ...
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]], // 添加网站图标
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
        text: "react相关问题",
        collapsible: true,
        collapsed: false,
        items: [
          {
            text: "为什么类组件需要手动绑定this",
            link: "/react/why-bind-this",
          },
          { text: "什么是 immer", link: "/react/what-is-immer" },
          {
            text: "keep-alive在react中的实现",
            link: "/react/how-to-keep-alive",
          },
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
    ],

    // socialLinks: [{ icon: "github", link: "https://gitee.com/" }],
  },
};
