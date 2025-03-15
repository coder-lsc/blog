import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.874cb1ca.js";const E=JSON.parse('{"title":"webpack 工作原理","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"webpack/how-webpack-work.md","filePath":"webpack/how-webpack-work.md"}'),p={name:"webpack/how-webpack-work.md"},o=l(`<h1 id="webpack-工作原理" tabindex="-1">webpack 工作原理 <a class="header-anchor" href="#webpack-工作原理" aria-label="Permalink to &quot;webpack 工作原理&quot;">​</a></h1><h2 id="webpack-对资源的处理" tabindex="-1">webpack 对资源的处理 <a class="header-anchor" href="#webpack-对资源的处理" aria-label="Permalink to &quot;webpack 对资源的处理&quot;">​</a></h2><p>webpack 只认识.js/.json 的文件，对其他类型文件要配合相应的 loader 进行转换。</p><h2 id="webpack-核心流程-抽象" tabindex="-1">webpack 核心流程（抽象） <a class="header-anchor" href="#webpack-核心流程-抽象" aria-label="Permalink to &quot;webpack 核心流程（抽象）&quot;">​</a></h2><ul><li><p>make 阶段：从入口模块开始解析依赖，遇到各种后缀名的文件时分别用对应的 loader 来做模块的编译，然后生成模块依赖图 ModuleGraph</p></li><li><p>seal 阶段：这些 module 要按照不同的规则来分组，分到不同的 chunk 里，生成 ChunkGraph，这个阶段叫做 seal。（如 splitChunks 和懒加载模块的分包逻辑）</p></li><li><p>emit 阶段：不同类型的 chunk 用不同的模版打印成对应的代码，然后输出为 js 就好了，这个阶段叫做 emit</p></li></ul><h2 id="webpack-module-和-chunk-的区别" tabindex="-1">webpack module 和 chunk 的区别 <a class="header-anchor" href="#webpack-module-和-chunk-的区别" aria-label="Permalink to &quot;webpack module 和 chunk 的区别&quot;">​</a></h2><p>module：每个文件都是一个 module</p><p>chunk：每个入口文件以及懒加载文件以及分包的包都对应一个 chunk，换言之，每个打包入口都对应一个 chunk。</p><p>module 和 chunk 的关系：一个 chunk 对应着至少一个 module</p><p>compilcation 每将一个文件打成 module 后，都会 push 进一个 module 数组中。同时，该 module 下也有一个数组存放所对应的 chunkId 数组（与其打包入口所对应），当多个入口对一个文件有共用时，compilcation 会根据文件绝对路径（module 的 key 就是文件绝对路径）在 module 数组中找到已经打包过的 module，将当前 chunkId push 进该 module 下的 chunkId 数组，最后遍历所有 module，并根据每个 module 的 chunkId 数组把该 module 分别分发给每个 chunk，这样防止多次打包同一个文件。</p><h2 id="生成运行时代码" tabindex="-1">生成运行时代码 <a class="header-anchor" href="#生成运行时代码" aria-label="Permalink to &quot;生成运行时代码&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#6A737D;">//生成运行时代码</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">getSource</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">chunk</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">      (() =&gt; {</span></span>
<span class="line"><span style="color:#9ECBFF;">       var modules = {</span></span>
<span class="line"><span style="color:#9ECBFF;">         \${</span><span style="color:#E1E4E8;">chunk</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">modules</span><span style="color:#9ECBFF;">.</span><span style="color:#B392F0;">map</span><span style="color:#9ECBFF;">(</span></span>
<span class="line"><span style="color:#9ECBFF;">           (</span><span style="color:#79B8FF;">module</span><span style="color:#9ECBFF;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#9ECBFF;"> </span><span style="color:#9ECBFF;">\`</span></span>
<span class="line"><span style="color:#9ECBFF;">           &quot;\${</span><span style="color:#79B8FF;">module</span><span style="color:#9ECBFF;">.</span><span style="color:#79B8FF;">id</span><span style="color:#9ECBFF;">}&quot;: (module) =&gt; {</span></span>
<span class="line"><span style="color:#9ECBFF;">             \${</span><span style="color:#79B8FF;">module</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">_source</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">           }</span></span>
<span class="line"><span style="color:#9ECBFF;">         \`</span></span>
<span class="line"><span style="color:#9ECBFF;">         )</span><span style="color:#9ECBFF;">}  </span></span>
<span class="line"><span style="color:#9ECBFF;">       };</span></span>
<span class="line"><span style="color:#9ECBFF;">       var cache = {};</span></span>
<span class="line"><span style="color:#9ECBFF;">       function require(moduleId) {</span></span>
<span class="line"><span style="color:#9ECBFF;">         var cachedModule = cache[moduleId];</span></span>
<span class="line"><span style="color:#9ECBFF;">         if (cachedModule !== undefined) {</span></span>
<span class="line"><span style="color:#9ECBFF;">           return cachedModule.exports;</span></span>
<span class="line"><span style="color:#9ECBFF;">         }</span></span>
<span class="line"><span style="color:#9ECBFF;">         var module = (cache[moduleId] = {</span></span>
<span class="line"><span style="color:#9ECBFF;">           exports: {},</span></span>
<span class="line"><span style="color:#9ECBFF;">         });</span></span>
<span class="line"><span style="color:#9ECBFF;">         modules[moduleId](module, module.exports, require);</span></span>
<span class="line"><span style="color:#9ECBFF;">         return module.exports;</span></span>
<span class="line"><span style="color:#9ECBFF;">       }</span></span>
<span class="line"><span style="color:#9ECBFF;">       var exports ={};</span></span>
<span class="line"><span style="color:#9ECBFF;">       \${</span><span style="color:#E1E4E8;">chunk</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">entryModule</span><span style="color:#9ECBFF;">.</span><span style="color:#E1E4E8;">_source</span><span style="color:#9ECBFF;">}</span></span>
<span class="line"><span style="color:#9ECBFF;">     })();</span></span>
<span class="line"><span style="color:#9ECBFF;">      \`</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6A737D;">//生成运行时代码</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">getSource</span><span style="color:#24292E;">(</span><span style="color:#E36209;">chunk</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">      (() =&gt; {</span></span>
<span class="line"><span style="color:#032F62;">       var modules = {</span></span>
<span class="line"><span style="color:#032F62;">         \${</span><span style="color:#24292E;">chunk</span><span style="color:#032F62;">.</span><span style="color:#24292E;">modules</span><span style="color:#032F62;">.</span><span style="color:#6F42C1;">map</span><span style="color:#032F62;">(</span></span>
<span class="line"><span style="color:#032F62;">           (</span><span style="color:#005CC5;">module</span><span style="color:#032F62;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#032F62;"> </span><span style="color:#032F62;">\`</span></span>
<span class="line"><span style="color:#032F62;">           &quot;\${</span><span style="color:#005CC5;">module</span><span style="color:#032F62;">.</span><span style="color:#005CC5;">id</span><span style="color:#032F62;">}&quot;: (module) =&gt; {</span></span>
<span class="line"><span style="color:#032F62;">             \${</span><span style="color:#005CC5;">module</span><span style="color:#032F62;">.</span><span style="color:#24292E;">_source</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">           }</span></span>
<span class="line"><span style="color:#032F62;">         \`</span></span>
<span class="line"><span style="color:#032F62;">         )</span><span style="color:#032F62;">}  </span></span>
<span class="line"><span style="color:#032F62;">       };</span></span>
<span class="line"><span style="color:#032F62;">       var cache = {};</span></span>
<span class="line"><span style="color:#032F62;">       function require(moduleId) {</span></span>
<span class="line"><span style="color:#032F62;">         var cachedModule = cache[moduleId];</span></span>
<span class="line"><span style="color:#032F62;">         if (cachedModule !== undefined) {</span></span>
<span class="line"><span style="color:#032F62;">           return cachedModule.exports;</span></span>
<span class="line"><span style="color:#032F62;">         }</span></span>
<span class="line"><span style="color:#032F62;">         var module = (cache[moduleId] = {</span></span>
<span class="line"><span style="color:#032F62;">           exports: {},</span></span>
<span class="line"><span style="color:#032F62;">         });</span></span>
<span class="line"><span style="color:#032F62;">         modules[moduleId](module, module.exports, require);</span></span>
<span class="line"><span style="color:#032F62;">         return module.exports;</span></span>
<span class="line"><span style="color:#032F62;">       }</span></span>
<span class="line"><span style="color:#032F62;">       var exports ={};</span></span>
<span class="line"><span style="color:#032F62;">       \${</span><span style="color:#24292E;">chunk</span><span style="color:#032F62;">.</span><span style="color:#24292E;">entryModule</span><span style="color:#032F62;">.</span><span style="color:#24292E;">_source</span><span style="color:#032F62;">}</span></span>
<span class="line"><span style="color:#032F62;">     })();</span></span>
<span class="line"><span style="color:#032F62;">      \`</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="compiler-和-compilation-的区别" tabindex="-1">Compiler 和 Compilation 的区别 <a class="header-anchor" href="#compiler-和-compilation-的区别" aria-label="Permalink to &quot;Compiler 和 Compilation 的区别&quot;">​</a></h2><p>compiler 只有一份，compilation 可以有很多</p><p>compiler 是 webpack 的入口执行实例，其主要功能是监控代码、启动和终止一个 compilation 等宏观任务。compilation 是具体负责核心编译工作的，主要是模块依赖分析，优化、连接，打包等工作。打个粗略的比方，compiler 是人，compilation 是人的大脑，架构设计上是类似的。</p><p>当开启了 watch 模式后，监听到文件变动后直接 new Compilation 重新编译。</p>`,16),e=[o];function c(r,t,i,F,y,u){return a(),n("div",null,e)}const h=s(p,[["render",c]]);export{E as __pageData,h as default};
