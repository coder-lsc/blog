import{_ as a,o as e,c as o,Q as t}from"./chunks/framework.874cb1ca.js";const f=JSON.parse('{"title":"浏览器强缓存&协商缓存","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"network/browser-cache.md","filePath":"network/browser-cache.md"}'),r={name:"network/browser-cache.md"},i=t('<h1 id="浏览器强缓存-协商缓存" tabindex="-1">浏览器强缓存&amp;协商缓存 <a class="header-anchor" href="#浏览器强缓存-协商缓存" aria-label="Permalink to &quot;浏览器强缓存&amp;协商缓存&quot;">​</a></h1><h2 id="强缓存" tabindex="-1">强缓存 <a class="header-anchor" href="#强缓存" aria-label="Permalink to &quot;强缓存&quot;">​</a></h2><p>（老协议中会使用 Expires，Expires 是会上传本地时间戳给服务端，但是本地时间戳不准）</p><p>首次请求，服务端响应头设置了 Cache-Control</p><p>二次请求时，Cache-Control 中设置的 max-age 没有过期，则取缓存中的资源。状态码为 200，（from disk)</p><p>Cache-Control 的值：</p><ul><li>max-age 决定客户端资源被缓存多久。</li><li>s-maxage 决定代理服务器缓存的时长。</li><li>no-cache 表示是强制进行协商缓存。（禁止强缓存）</li><li>no-store 是表示禁止任何缓存策略。</li><li>public 表示资源即可以被浏览器缓存也可以被代理服务器缓存。</li><li>private 表示资源只能被浏览器缓存。</li></ul><p>（注：chrome 在点击刷新时不会触发强缓存，只有在路由跳转、回退时才会触发；但会自动校验协商缓存）</p><h2 id="协商缓存" tabindex="-1">协商缓存 <a class="header-anchor" href="#协商缓存" aria-label="Permalink to &quot;协商缓存&quot;">​</a></h2><p>首次请求，服务端响应头设置了 last-modified：时间戳 和 Cache-control:no-cache</p><p>二次请求时，浏览器请求头中携带一个字段：If-Modified-Since：首次响应的时间戳。服务端收到后再进行逻辑判断返回新的资源还是返回 304</p><p>http1.1 后，改用 ETag 和 if-None-Match 来进行验证哈希值判断资源是否变化</p><h2 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h2><p>文件名中包含了 webpack 哈希值的文件，设置强缓存</p><p>文件名中不包含哈希值的文件，设置协商缓存</p>',15),c=[i];function l(n,h,p,s,d,_){return e(),o("div",null,c)}const u=a(r,[["render",l]]);export{f as __pageData,u as default};
