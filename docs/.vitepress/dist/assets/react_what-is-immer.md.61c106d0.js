import{_ as s,o as a,c as n,Q as l}from"./chunks/framework.874cb1ca.js";const F=JSON.parse('{"title":"什么是 immer","description":"","frontmatter":{},"headers":[],"relativePath":"react/what-is-immer.md","filePath":"react/what-is-immer.md"}'),p={name:"react/what-is-immer.md"},o=l(`<h1 id="什么是-immer" tabindex="-1">什么是 immer <a class="header-anchor" href="#什么是-immer" aria-label="Permalink to &quot;什么是 immer&quot;">​</a></h1><h2 id="可变数据-不可变数据" tabindex="-1">可变数据&amp;不可变数据 <a class="header-anchor" href="#可变数据-不可变数据" aria-label="Permalink to &quot;可变数据&amp;不可变数据&quot;">​</a></h2><p>可变数据：</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">let</span><span style="color:#E1E4E8;"> objA </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> { name: </span><span style="color:#9ECBFF;">&quot;小明&quot;</span><span style="color:#E1E4E8;"> };</span></span>
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
<span class="line"><span style="color:#6F42C1;">setFormConfig</span><span style="color:#24292E;">(tempFormConfig);</span></span></code></pre></div><h2 id="use-immer-代码实例" tabindex="-1">use-immer 代码实例 <a class="header-anchor" href="#use-immer-代码实例" aria-label="Permalink to &quot;use-immer 代码实例&quot;">​</a></h2><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> React </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&quot;react&quot;</span><span style="color:#E1E4E8;">;</span></span>
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
<span class="line"><span style="color:#24292E;">  }, []);</span></span></code></pre></div><h2 id="use-immer-原理" tabindex="-1">use-immer 原理 <a class="header-anchor" href="#use-immer-原理" aria-label="Permalink to &quot;use-immer 原理&quot;">​</a></h2><p>通过 proxy 实现</p><ul><li>当我们调用 immer 的 API produce 时，immer 将内部暂时存储着我们的目标对象（以 state 为例）</li><li>immer 暴露一个 draft （草稿）给我们</li><li>我们在 draft 上作修改</li><li>immer 接收修改后的 draft，immer 基于传入的 state 照着 draft 的修改 返回一个新的 state</li></ul>`,18),e=[o];function t(c,r,E,y,i,d){return a(),n("div",null,e)}const u=s(p,[["render",t]]);export{F as __pageData,u as default};
