import{_ as s,o as n,c as a,Q as p}from"./chunks/framework.874cb1ca.js";const u=JSON.parse('{"title":"immer","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"react/immer.md","filePath":"react/immer.md"}'),l={name:"react/immer.md"},o=p(`<h1 id="immer" tabindex="-1">immer <a class="header-anchor" href="#immer" aria-label="Permalink to &quot;immer&quot;">​</a></h1><h2 id="可变数据-不可变数据" tabindex="-1">可变数据&amp;不可变数据 <a class="header-anchor" href="#可变数据-不可变数据" aria-label="Permalink to &quot;可变数据&amp;不可变数据&quot;">​</a></h2><p>可变数据：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> objA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&quot;小明&quot;</span><span style="color:#E1E4E8;"> };</span></span>
<span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> objB </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> objA;</span></span>
<span class="line"><span style="color:#E1E4E8;">objB.name </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;小红&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">console.</span><span style="color:#B392F0;">log</span><span style="color:#E1E4E8;">(objA.name); </span><span style="color:#6A737D;">// objA 的name也变成了小红</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> objA </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> { name: </span><span style="color:#032F62;">&quot;小明&quot;</span><span style="color:#24292E;"> };</span></span>
<span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> objB </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> objA;</span></span>
<span class="line"><span style="color:#24292E;">objB.name </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;小红&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">console.</span><span style="color:#6F42C1;">log</span><span style="color:#24292E;">(objA.name); </span><span style="color:#6A737D;">// objA 的name也变成了小红</span></span></code></pre></div><p>不可变数据： 加上一层 deepclone/json.parse(json.stringify)</p><h3 id="为什么要在-react-中追求不可变数据" tabindex="-1">为什么要在 react 中追求不可变数据？ <a class="header-anchor" href="#为什么要在-react-中追求不可变数据" aria-label="Permalink to &quot;为什么要在 react 中追求不可变数据？&quot;">​</a></h3><p>因为 react diff 算法时会对保存的数据进行浅比较，因此如果对象地址没有变，就不会引起重新渲染。</p><h2 id="使用场景" tabindex="-1">使用场景 <a class="header-anchor" href="#使用场景" aria-label="Permalink to &quot;使用场景&quot;">​</a></h2><p>useState 在 set 时会对保存的数据进行浅比较，因此我们通常有以下两种写法：</p><p>写法一：解构赋值 缺点：代码可读性差，书写麻烦，难以维护</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#B392F0;">setFormConfig</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">prevState</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">prevState,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">fieldForm</span><span style="color:#E1E4E8;">: prevState.fieldForm.</span><span style="color:#B392F0;">map</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">item</span><span style="color:#E1E4E8;">,</span><span style="color:#FFAB70;">idx</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;">(idx </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> selectIndex){</span></span>
<span class="line"><span style="color:#E1E4E8;">              </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                  </span><span style="color:#F97583;">...</span><span style="color:#E1E4E8;">item,</span></span>
<span class="line"><span style="color:#E1E4E8;">                  fieldName:newName</span></span>
<span class="line"><span style="color:#E1E4E8;">              }</span></span>
<span class="line"><span style="color:#E1E4E8;">          }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> item</span></span>
<span class="line"><span style="color:#E1E4E8;">      })</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#6F42C1;">setFormConfig</span><span style="color:#24292E;">((</span><span style="color:#E36209;">prevState</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">prevState,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">fieldForm</span><span style="color:#24292E;">: prevState.fieldForm.</span><span style="color:#6F42C1;">map</span><span style="color:#24292E;">((</span><span style="color:#E36209;">item</span><span style="color:#24292E;">,</span><span style="color:#E36209;">idx</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">if</span><span style="color:#24292E;">(idx </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> selectIndex){</span></span>
<span class="line"><span style="color:#24292E;">              </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                  </span><span style="color:#D73A49;">...</span><span style="color:#24292E;">item,</span></span>
<span class="line"><span style="color:#24292E;">                  fieldName:newName</span></span>
<span class="line"><span style="color:#24292E;">              }</span></span>
<span class="line"><span style="color:#24292E;">          }</span></span>
<span class="line"><span style="color:#24292E;">          </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> item</span></span>
<span class="line"><span style="color:#24292E;">      })</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span></code></pre></div><p>写法二：深拷贝 缺点：深拷贝消耗性能较大</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> tempFormConfig </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">deepClone</span><span style="color:#E1E4E8;">(formConfig);</span></span>
<span class="line"><span style="color:#E1E4E8;">tempFormConfig.fieldForm[</span><span style="color:#79B8FF;">1</span><span style="color:#E1E4E8;">].fieldName </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> newName;</span></span>
<span class="line"><span style="color:#B392F0;">setFormConfig</span><span style="color:#E1E4E8;">(tempFormConfig);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> tempFormConfig </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">deepClone</span><span style="color:#24292E;">(formConfig);</span></span>
<span class="line"><span style="color:#24292E;">tempFormConfig.fieldForm[</span><span style="color:#005CC5;">1</span><span style="color:#24292E;">].fieldName </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> newName;</span></span>
<span class="line"><span style="color:#6F42C1;">setFormConfig</span><span style="color:#24292E;">(tempFormConfig);</span></span></code></pre></div><h2 id="use-immer-代码实例-use-immer-是对-immer-的-hooks-包装" tabindex="-1">use-immer 代码实例 (use-immer 是对 immer 的 hooks 包装) <a class="header-anchor" href="#use-immer-代码实例-use-immer-是对-immer-的-hooks-包装" aria-label="Permalink to &quot;use-immer 代码实例 (use-immer 是对 immer 的 hooks 包装)&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { useImmer } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;use-immer&quot;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">TodoList</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> [</span><span style="color:#79B8FF;">todos</span><span style="color:#E1E4E8;">, </span><span style="color:#79B8FF;">setTodos</span><span style="color:#E1E4E8;">] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useImmer</span><span style="color:#E1E4E8;">([</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      id: </span><span style="color:#9ECBFF;">&quot;111&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&quot;react 111&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      done: </span><span style="color:#79B8FF;">true</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      id: </span><span style="color:#9ECBFF;">&quot;222&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      title: </span><span style="color:#9ECBFF;">&quot;react 222&quot;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      done: </span><span style="color:#79B8FF;">false</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  ]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">handleToggle</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">useCallback</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">id</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">setTodos</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">draft</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">todo</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> draft.</span><span style="color:#B392F0;">find</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">todo</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> todo.id </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> id);</span></span>
<span class="line"><span style="color:#E1E4E8;">      todo.done </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">todo.done;</span></span>
<span class="line"><span style="color:#E1E4E8;">    });</span></span>
<span class="line"><span style="color:#E1E4E8;">  }, []);</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> React </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;react&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { useImmer } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&quot;use-immer&quot;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">TodoList</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> [</span><span style="color:#005CC5;">todos</span><span style="color:#24292E;">, </span><span style="color:#005CC5;">setTodos</span><span style="color:#24292E;">] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useImmer</span><span style="color:#24292E;">([</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      id: </span><span style="color:#032F62;">&quot;111&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&quot;react 111&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      done: </span><span style="color:#005CC5;">true</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      id: </span><span style="color:#032F62;">&quot;222&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      title: </span><span style="color:#032F62;">&quot;react 222&quot;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      done: </span><span style="color:#005CC5;">false</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  ]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">handleToggle</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">useCallback</span><span style="color:#24292E;">((</span><span style="color:#E36209;">id</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">setTodos</span><span style="color:#24292E;">((</span><span style="color:#E36209;">draft</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">todo</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> draft.</span><span style="color:#6F42C1;">find</span><span style="color:#24292E;">((</span><span style="color:#E36209;">todo</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> todo.id </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> id);</span></span>
<span class="line"><span style="color:#24292E;">      todo.done </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">!</span><span style="color:#24292E;">todo.done;</span></span>
<span class="line"><span style="color:#24292E;">    });</span></span>
<span class="line"><span style="color:#24292E;">  }, []);</span></span></code></pre></div><h2 id="immer-原理" tabindex="-1">immer 原理 <a class="header-anchor" href="#immer-原理" aria-label="Permalink to &quot;immer 原理&quot;">​</a></h2><p>理念：</p><ul><li>当我们调用 immer 的 API produce 时，immer 将内部使用 proxy 代理劫持传入的对象</li><li>当触发 getter 时暴露一个 draft （草稿）给我们</li><li>我们在 draft 上作修改时触发 setter</li><li>immer 接收修改后的 draft，immer 基于传入的 state 照着 draft 的修改 返回一个新的 state</li></ul><h2 id="核心源码" tabindex="-1">核心源码 <a class="header-anchor" href="#核心源码" aria-label="Permalink to &quot;核心源码&quot;">​</a></h2><p>此源码参考的是老版本 immer v1.0.1。并对其进行了精简，删除了 es5 的 polyfill 和 freeze 等代码</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> proxies </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">null</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> state.modified </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">?</span><span style="color:#E1E4E8;"> state.copy </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> state.base;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 如读取a.b state为a  state.base[prop]为b （执行a.b.c = 1 则会读取a.b）</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">prop</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state.modified) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// a没有被修改过</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> state.copy[prop];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (value </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> state.base[prop]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#6A737D;">// 在a上创b的proxy 放在a.copy中</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (state.copy[prop] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createProxy</span><span style="color:#E1E4E8;">(state, value));</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// a没被修改过 在a上创b的proxy 放在a.proxies中</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(state.proxies, prop)) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> state.proxies[prop];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">value</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> state.base[prop];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> (state.proxies[prop] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createProxy</span><span style="color:#E1E4E8;">(state, value));</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// a.b.c = 1 会对触发a.b的setter</span></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">set</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">prop</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">state.modified) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// a.b没有被修改过</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span></span>
<span class="line"><span style="color:#E1E4E8;">      (prop </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> state.base </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">is</span><span style="color:#E1E4E8;">(state.base[prop], value)) </span><span style="color:#F97583;">||</span></span>
<span class="line"><span style="color:#E1E4E8;">      (</span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(state.proxies, prop) </span><span style="color:#F97583;">&amp;&amp;</span><span style="color:#E1E4E8;"> state.proxies[prop] </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> value)</span></span>
<span class="line"><span style="color:#E1E4E8;">    )</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 对a.b进行修改</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">markChanged</span><span style="color:#E1E4E8;">(state);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// a.b被修改过</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#6A737D;">// 给a.b.c赋值存放在a.b的copy中（在此之前copy已经被初始化为state.base的浅拷贝了）</span></span>
<span class="line"><span style="color:#E1E4E8;">  state.copy[prop] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> value;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">markChanged</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#F97583;">!</span><span style="color:#E1E4E8;">state.modified) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将a.b的modified置为true</span></span>
<span class="line"><span style="color:#E1E4E8;">    state.modified </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 将a.b的copy初始化为state.base的浅拷贝</span></span>
<span class="line"><span style="color:#E1E4E8;">    state.copy </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">shallowCopy</span><span style="color:#E1E4E8;">(state.base);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    Object.</span><span style="color:#B392F0;">assign</span><span style="color:#E1E4E8;">(state.copy, state.proxies); </span><span style="color:#6A737D;">// yup that works for arrays as well</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 对a进行相同的修改</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state.parent) </span><span style="color:#B392F0;">markChanged</span><span style="color:#E1E4E8;">(state.parent);</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createProxy</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">parent</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">base</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">proxy</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> Proxy.</span><span style="color:#B392F0;">revocable</span><span style="color:#E1E4E8;">(</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      modified: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      finalized: </span><span style="color:#79B8FF;">false</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">      parent,</span></span>
<span class="line"><span style="color:#E1E4E8;">      base, </span><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#E1E4E8;">      copy: </span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">, </span><span style="color:#6A737D;">// 修改过的数据</span></span>
<span class="line"><span style="color:#E1E4E8;">      proxies: {},</span></span>
<span class="line"><span style="color:#E1E4E8;">    },</span></span>
<span class="line"><span style="color:#E1E4E8;">    {</span></span>
<span class="line"><span style="color:#E1E4E8;">      get,</span></span>
<span class="line"><span style="color:#E1E4E8;">      set,</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#B392F0;">has</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">target</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">prop</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> prop </span><span style="color:#F97583;">in</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">source</span><span style="color:#E1E4E8;">(target);</span></span>
<span class="line"><span style="color:#E1E4E8;">      },</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  );</span></span>
<span class="line"><span style="color:#E1E4E8;">  proxies.</span><span style="color:#B392F0;">push</span><span style="color:#E1E4E8;">(proxy);</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> proxy.proxy;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// produce函数入口</span></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">produceProxy</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">baseState</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">producer</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">previousProxies</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> proxies;</span></span>
<span class="line"><span style="color:#E1E4E8;">  proxies </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> [];</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">try</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 1.给根节点创建proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">rootClone</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">createProxy</span><span style="color:#E1E4E8;">(</span><span style="color:#79B8FF;">undefined</span><span style="color:#E1E4E8;">, baseState);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 执行操作draft的代码</span></span>
<span class="line"><span style="color:#E1E4E8;">    producer.</span><span style="color:#B392F0;">call</span><span style="color:#E1E4E8;">(rootClone, rootClone);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 递归整理所有proxy代理的值</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">res</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finalize</span><span style="color:#E1E4E8;">(rootClone);</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#6A737D;">// 销毁所有proxy</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#B392F0;">each</span><span style="color:#E1E4E8;">(proxies, (</span><span style="color:#FFAB70;">_</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">p</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> p.</span><span style="color:#B392F0;">revoke</span><span style="color:#E1E4E8;">());</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> res;</span></span>
<span class="line"><span style="color:#E1E4E8;">  } </span><span style="color:#F97583;">finally</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    proxies </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> previousProxies;</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finalize</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">base</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (</span><span style="color:#B392F0;">isProxy</span><span style="color:#E1E4E8;">(base)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">state</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> base[</span><span style="color:#79B8FF;">PROXY_STATE</span><span style="color:#E1E4E8;">];</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state.modified </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (state.finalized </span><span style="color:#F97583;">===</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> state.copy;</span></span>
<span class="line"><span style="color:#E1E4E8;">      state.finalized </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">true</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finalizeObject</span><span style="color:#E1E4E8;">(state.copy, state);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span><span style="color:#F97583;">else</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> state.base;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">  }</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> base;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finalizeObject</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">copy</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">state</span><span style="color:#E1E4E8;">) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">base</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> state.base;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#B392F0;">each</span><span style="color:#E1E4E8;">(copy, (</span><span style="color:#FFAB70;">prop</span><span style="color:#E1E4E8;">, </span><span style="color:#FFAB70;">value</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">if</span><span style="color:#E1E4E8;"> (value </span><span style="color:#F97583;">!==</span><span style="color:#E1E4E8;"> base[prop]) copy[prop] </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">finalize</span><span style="color:#E1E4E8;">(value);</span></span>
<span class="line"><span style="color:#E1E4E8;">  });</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> copy;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">let</span><span style="color:#24292E;"> proxies </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">null</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(</span><span style="color:#E36209;">state</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> state.modified </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">?</span><span style="color:#24292E;"> state.copy </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> state.base;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// 如读取a.b state为a  state.base[prop]为b （执行a.b.c = 1 则会读取a.b）</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(</span><span style="color:#E36209;">state</span><span style="color:#24292E;">, </span><span style="color:#E36209;">prop</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state.modified) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// a没有被修改过</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> state.copy[prop];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (value </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> state.base[prop]) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6A737D;">// 在a上创b的proxy 放在a.copy中</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (state.copy[prop] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createProxy</span><span style="color:#24292E;">(state, value));</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// a没被修改过 在a上创b的proxy 放在a.proxies中</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(state.proxies, prop)) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> state.proxies[prop];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">value</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> state.base[prop];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> (state.proxies[prop] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createProxy</span><span style="color:#24292E;">(state, value));</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// a.b.c = 1 会对触发a.b的setter</span></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">set</span><span style="color:#24292E;">(</span><span style="color:#E36209;">state</span><span style="color:#24292E;">, </span><span style="color:#E36209;">prop</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">state.modified) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// a.b没有被修改过</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span></span>
<span class="line"><span style="color:#24292E;">      (prop </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> state.base </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">is</span><span style="color:#24292E;">(state.base[prop], value)) </span><span style="color:#D73A49;">||</span></span>
<span class="line"><span style="color:#24292E;">      (</span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(state.proxies, prop) </span><span style="color:#D73A49;">&amp;&amp;</span><span style="color:#24292E;"> state.proxies[prop] </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> value)</span></span>
<span class="line"><span style="color:#24292E;">    )</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 对a.b进行修改</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">markChanged</span><span style="color:#24292E;">(state);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// a.b被修改过</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6A737D;">// 给a.b.c赋值存放在a.b的copy中（在此之前copy已经被初始化为state.base的浅拷贝了）</span></span>
<span class="line"><span style="color:#24292E;">  state.copy[prop] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> value;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">markChanged</span><span style="color:#24292E;">(</span><span style="color:#E36209;">state</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#D73A49;">!</span><span style="color:#24292E;">state.modified) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将a.b的modified置为true</span></span>
<span class="line"><span style="color:#24292E;">    state.modified </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 将a.b的copy初始化为state.base的浅拷贝</span></span>
<span class="line"><span style="color:#24292E;">    state.copy </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">shallowCopy</span><span style="color:#24292E;">(state.base);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    Object.</span><span style="color:#6F42C1;">assign</span><span style="color:#24292E;">(state.copy, state.proxies); </span><span style="color:#6A737D;">// yup that works for arrays as well</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 对a进行相同的修改</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state.parent) </span><span style="color:#6F42C1;">markChanged</span><span style="color:#24292E;">(state.parent);</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createProxy</span><span style="color:#24292E;">(</span><span style="color:#E36209;">parent</span><span style="color:#24292E;">, </span><span style="color:#E36209;">base</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">proxy</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> Proxy.</span><span style="color:#6F42C1;">revocable</span><span style="color:#24292E;">(</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      modified: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      finalized: </span><span style="color:#005CC5;">false</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">      parent,</span></span>
<span class="line"><span style="color:#24292E;">      base, </span><span style="color:#6A737D;">// 原始数据</span></span>
<span class="line"><span style="color:#24292E;">      copy: </span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">, </span><span style="color:#6A737D;">// 修改过的数据</span></span>
<span class="line"><span style="color:#24292E;">      proxies: {},</span></span>
<span class="line"><span style="color:#24292E;">    },</span></span>
<span class="line"><span style="color:#24292E;">    {</span></span>
<span class="line"><span style="color:#24292E;">      get,</span></span>
<span class="line"><span style="color:#24292E;">      set,</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#6F42C1;">has</span><span style="color:#24292E;">(</span><span style="color:#E36209;">target</span><span style="color:#24292E;">, </span><span style="color:#E36209;">prop</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> prop </span><span style="color:#D73A49;">in</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">source</span><span style="color:#24292E;">(target);</span></span>
<span class="line"><span style="color:#24292E;">      },</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  );</span></span>
<span class="line"><span style="color:#24292E;">  proxies.</span><span style="color:#6F42C1;">push</span><span style="color:#24292E;">(proxy);</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> proxy.proxy;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#6A737D;">// produce函数入口</span></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">produceProxy</span><span style="color:#24292E;">(</span><span style="color:#E36209;">baseState</span><span style="color:#24292E;">, </span><span style="color:#E36209;">producer</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">previousProxies</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> proxies;</span></span>
<span class="line"><span style="color:#24292E;">  proxies </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> [];</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">try</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 1.给根节点创建proxy</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">rootClone</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">createProxy</span><span style="color:#24292E;">(</span><span style="color:#005CC5;">undefined</span><span style="color:#24292E;">, baseState);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 执行操作draft的代码</span></span>
<span class="line"><span style="color:#24292E;">    producer.</span><span style="color:#6F42C1;">call</span><span style="color:#24292E;">(rootClone, rootClone);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 递归整理所有proxy代理的值</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">res</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finalize</span><span style="color:#24292E;">(rootClone);</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6A737D;">// 销毁所有proxy</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#6F42C1;">each</span><span style="color:#24292E;">(proxies, (</span><span style="color:#E36209;">_</span><span style="color:#24292E;">, </span><span style="color:#E36209;">p</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> p.</span><span style="color:#6F42C1;">revoke</span><span style="color:#24292E;">());</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> res;</span></span>
<span class="line"><span style="color:#24292E;">  } </span><span style="color:#D73A49;">finally</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    proxies </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> previousProxies;</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finalize</span><span style="color:#24292E;">(</span><span style="color:#E36209;">base</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (</span><span style="color:#6F42C1;">isProxy</span><span style="color:#24292E;">(base)) {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">state</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> base[</span><span style="color:#005CC5;">PROXY_STATE</span><span style="color:#24292E;">];</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state.modified </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (state.finalized </span><span style="color:#D73A49;">===</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> state.copy;</span></span>
<span class="line"><span style="color:#24292E;">      state.finalized </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">true</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finalizeObject</span><span style="color:#24292E;">(state.copy, state);</span></span>
<span class="line"><span style="color:#24292E;">    } </span><span style="color:#D73A49;">else</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">      </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> state.base;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">  }</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> base;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finalizeObject</span><span style="color:#24292E;">(</span><span style="color:#E36209;">copy</span><span style="color:#24292E;">, </span><span style="color:#E36209;">state</span><span style="color:#24292E;">) {</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">base</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> state.base;</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#6F42C1;">each</span><span style="color:#24292E;">(copy, (</span><span style="color:#E36209;">prop</span><span style="color:#24292E;">, </span><span style="color:#E36209;">value</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">if</span><span style="color:#24292E;"> (value </span><span style="color:#D73A49;">!==</span><span style="color:#24292E;"> base[prop]) copy[prop] </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">finalize</span><span style="color:#24292E;">(value);</span></span>
<span class="line"><span style="color:#24292E;">  });</span></span>
<span class="line"><span style="color:#24292E;">  </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> copy;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div>`,21),e=[o];function t(c,r,E,y,i,F){return n(),a("div",null,e)}const A=s(l,[["render",t]]);export{u as __pageData,A as default};
