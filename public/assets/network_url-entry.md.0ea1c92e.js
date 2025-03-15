import{_ as a,o as t,c as r,Q as e}from"./chunks/framework.874cb1ca.js";const o="/blog/dns.jpg",m=JSON.parse('{"title":"浏览器输入 url 回车","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"network/url-entry.md","filePath":"network/url-entry.md"}'),l={name:"network/url-entry.md"},n=e('<h1 id="浏览器输入-url-回车" tabindex="-1">浏览器输入 url 回车 <a class="header-anchor" href="#浏览器输入-url-回车" aria-label="Permalink to &quot;浏览器输入 url 回车&quot;">​</a></h1><h2 id="解析-url" tabindex="-1">解析 URL <a class="header-anchor" href="#解析-url" aria-label="Permalink to &quot;解析 URL&quot;">​</a></h2><p>如果输入的 URL 中的协议或者主机名不合法，将会把地址栏中输入的内容传递给搜索引擎。如果没有问题，浏览器会检查 URL 中是否出现了非法字符，如果存在非法字符，则对非法字符进行转义后再进行下一过程。</p><h2 id="缓存判断" tabindex="-1">缓存判断 <a class="header-anchor" href="#缓存判断" aria-label="Permalink to &quot;缓存判断&quot;">​</a></h2><p><a href="./browser-cache.html">浏览器强缓存&amp;协商缓存</a></p><h2 id="dns-解析" tabindex="-1">DNS 解析 <a class="header-anchor" href="#dns-解析" aria-label="Permalink to &quot;DNS 解析&quot;">​</a></h2><p>下一步首先需要获取的是输入的 URL 中的域名的 IP 地址。</p><ul><li>首先会判断<strong>本地</strong>是否有该域名的 IP 地址的缓存，如果有则使用，如果没有则向本地 DNS 服务器发起请求。</li><li><strong>本地 DNS 服务器</strong>也会先检查是否存在缓存，如果没有就会先向<strong>根域名服务器</strong>发起请求。</li><li>获得负责的<strong>顶级域名服务器</strong>的地址后，再向顶级域名服务器请求。（如负责.com 的顶级域名服务器）</li><li>然后获得负责的<strong>权威域名服务器</strong>的地址后，再向权威域名服务器发起请求。（如负责.baidu 的权威域名服务器）</li><li>最终获得域名的 IP 地址后，本地 DNS 服务器再将这个 IP 地址返回给请求的用户。</li></ul><p>用户向本地 DNS 服务器发起请求属于递归请求，本地 DNS 服务器向各级域名服务器发起请求属于迭代请求。</p><p><img src="'+o+'" alt="An image"></p><h2 id="tcp-三次握手" tabindex="-1">TCP 三次握手 <a class="header-anchor" href="#tcp-三次握手" aria-label="Permalink to &quot;TCP 三次握手&quot;">​</a></h2><p><a href="./TCP三次握手.html">TCP 三次握手</a></p><h2 id="https-握手" tabindex="-1">HTTPS 握手 <a class="header-anchor" href="#https-握手" aria-label="Permalink to &quot;HTTPS 握手&quot;">​</a></h2><p><a href="./HTTPS握手.html">HTTPS握手</a></p><h2 id="返回数据" tabindex="-1">返回数据 <a class="header-anchor" href="#返回数据" aria-label="Permalink to &quot;返回数据&quot;">​</a></h2><p>当页面请求发送到服务器端后，服务器端会返回一个 html 文件作为响应，浏览器接收到响应后，开始对 html 文件进行解析，开始页面的渲染过程。</p><h2 id="页面渲染" tabindex="-1">页面渲染 <a class="header-anchor" href="#页面渲染" aria-label="Permalink to &quot;页面渲染&quot;">​</a></h2><p>浏览器首先会根据 html 文件构建 DOM 树，根据解析到的 css 文件构建 CSSOM 树，如果遇到 script 标签，则判端是否含有 defer 或者 async 属性，要不然 script 的加载和执行会造成页面的渲染的阻塞。当 DOM 树和 CSSOM 树建立好后，根据它们来构建渲染树。渲染树构建好后，会根据渲染树来进行布局。布局完成后，最后使用浏览器的 UI 接口对页面进行绘制。这个时候整个页面就显示出来了。</p><h2 id="tcp-四次挥手" tabindex="-1">TCP 四次挥手 <a class="header-anchor" href="#tcp-四次挥手" aria-label="Permalink to &quot;TCP 四次挥手&quot;">​</a></h2><p>最后一步是 TCP 断开连接的四次挥手过程。若客户端认为数据发送完成，则它需要向服务端发送连接释放请求。服务端收到连接释放请求后，会告诉应用层要释放 TCP 链接。然后会发送 ACK 包，并进入 CLOSE_WAIT 状态，此时表明客户端到服务端的连接已经释放，不再接收客户端发的数据了。但是因为 TCP 连接是双向的，所以服务端仍旧可以发送数据给客户端。服务端如果此时还有没发完的数据会继续发送，完毕后会向客户端发送连接释放请求，然后服务端便进入 LAST-ACK 状态。客户端收到释放请求后，向服务端发送确认应答，此时客户端进入 TIME-WAIT 状态。该状态会持续 2MSL（最大段生存期，指报文段在网络中生存的时间，超时会被抛弃） 时间，若该时间段内没有服务端的重发请求的话，就进入 CLOSED 状态。当服务端收到确认应答后，也便进入 CLOSED 状态。</p>',20),i=[n];function h(s,c,d,p,u,P){return t(),r("div",null,i)}const T=a(l,[["render",h]]);export{m as __pageData,T as default};
