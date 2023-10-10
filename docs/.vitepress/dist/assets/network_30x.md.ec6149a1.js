import{_ as a,o as t,c as e,Q as o}from"./chunks/framework.874cb1ca.js";const f=JSON.parse('{"title":"http 状态码 301、302、303、307、308 的区别","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"network/30x.md","filePath":"network/30x.md"}'),r={name:"network/30x.md"},n=o('<h1 id="http-状态码-301、302、303、307、308-的区别" tabindex="-1">http 状态码 301、302、303、307、308 的区别 <a class="header-anchor" href="#http-状态码-301、302、303、307、308-的区别" aria-label="Permalink to &quot;http 状态码 301、302、303、307、308 的区别&quot;">​</a></h1><h2 id="参考链接" tabindex="-1">参考链接 <a class="header-anchor" href="#参考链接" aria-label="Permalink to &quot;参考链接&quot;">​</a></h2><p><a href="https://juejin.cn/post/6844904129760870414?searchId=202310101033422D6115B6E670C4944E68" target="_blank" rel="noreferrer">https://juejin.cn/post/6844904129760870414?searchId=202310101033422D6115B6E670C4944E68</a></p><p>对以上链接内容的精简总结：</p><p><strong>301 和 302 都是 http1.0 的规范，其余都是 http1.1 的规范</strong></p><h3 id="_301" tabindex="-1">301 <a class="header-anchor" href="#_301" aria-label="Permalink to &quot;301&quot;">​</a></h3><p>永久重定向，会被浏览器缓存，响应头 Location 字段。post 会被改为 get 请求进行重定向</p><h3 id="_302" tabindex="-1">302 <a class="header-anchor" href="#_302" aria-label="Permalink to &quot;302&quot;">​</a></h3><p>临时重定向，响应头 Location 字段。post 会被改为 get 请求进行重定向</p><h3 id="_303" tabindex="-1">303 <a class="header-anchor" href="#_303" aria-label="Permalink to &quot;303&quot;">​</a></h3><p>303 明确表示客户端应当采⽤ get ⽅法获取资源，他会把 POST 请求变为 GET 请求进⾏重定向。</p><h3 id="_307" tabindex="-1">307 <a class="header-anchor" href="#_307" aria-label="Permalink to &quot;307&quot;">​</a></h3><p>临时重定向，响应头 Location 字段。post 不会被改为 get 请求进行重定向</p><h3 id="_308" tabindex="-1">308 <a class="header-anchor" href="#_308" aria-label="Permalink to &quot;308&quot;">​</a></h3><p>永久重定向，会被浏览器缓存，响应头 Location 字段。post 不会被改为 get 请求进行重定向</p>',15),h=[n];function i(s,c,p,l,_,d){return t(),e("div",null,h)}const m=a(r,[["render",i]]);export{f as __pageData,m as default};
