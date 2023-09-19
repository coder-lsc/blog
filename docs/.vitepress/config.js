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
        text: "webpack工程化",
        items: [
          { text: "webpack plugin原理解析", link: "/webpack/what-is-plugin" },
          { text: "webpack plugin开发示例", link: "/webpack/how-to-develop-plugin" },
        ],
        collapsible: true,
      },
    ],

    // socialLinks: [{ icon: "github", link: "https://gitee.com/" }],
  },
};
