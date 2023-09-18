export default {
  // ...
  base: "/blog/",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]], // 添加网站图标
  themeConfig: {
    siteTitle: '前端技术', // 可以设为false
    logo: "/favicon.ico",
    nav: [
      { text: "指南", link: "/guild" },
    ],
    // socialLinks: [{ icon: "github", link: "https://gitee.com/" }],
  },
};
