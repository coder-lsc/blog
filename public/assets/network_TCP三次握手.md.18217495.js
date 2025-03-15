import{_ as e,o as a,c as t,Q as l}from"./chunks/framework.874cb1ca.js";const o="/blog/tcp.jpg",k=JSON.parse('{"title":"TCP 三次握手","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"network/TCP三次握手.md","filePath":"network/TCP三次握手.md"}'),i={name:"network/TCP三次握手.md"},r=l('<h1 id="tcp-三次握手" tabindex="-1">TCP 三次握手 <a class="header-anchor" href="#tcp-三次握手" aria-label="Permalink to &quot;TCP 三次握手&quot;">​</a></h1><p>首先客户端向服务器发送一个 SYN 连接请求报文段和一个随机序号，服务端接收到请求后向服务器端发送一个 SYN ACK 报文段，确认连接请求，并且也向客户端发送一个随机序号。客户端接收服务器的确认应答后，进入连接建立的状态，同时向服务器也发送一个 ACK 确认报文段，服务器端接收到确认后，也进入连接建立状态，此时双方的连接就建立起来了。</p><p><img src="'+o+'" alt="An image"></p><p><strong>seq</strong>(sequence number)：序号</p><p><strong>ack</strong>(acknoledgement number)：确认号，占 32 位，只有 ACK 标志位为 1 时，确认序号字段才有效，ack=seq+1。</p><h2 id="第一次握手" tabindex="-1">第一次握手 <a class="header-anchor" href="#第一次握手" aria-label="Permalink to &quot;第一次握手&quot;">​</a></h2><ul><li>标志位为 SYN=1，表示请求建立连接；</li><li>序号为 seq = x（x 一般取随机数）；</li><li>随后客户端进入 SYN-SENT 阶段。</li></ul><h2 id="第二次握手" tabindex="-1">第二次握手 <a class="header-anchor" href="#第二次握手" aria-label="Permalink to &quot;第二次握手&quot;">​</a></h2><ul><li>标志位为 SYN=1 和 ACK=1，表示确认客户端的报文 seq 序号有效，服务器能正常接收客户端发送的数据，并同意创建新连接；</li><li>序号为 seq = y；</li><li>确认号为 ack = x + 1，表示收到客户端的序号 seq 并将其值加 1 作为自己确认号 ack 的值，随后服务器端进入 SYN-RECV 阶段。</li></ul><h2 id="第三次握手" tabindex="-1">第三次握手 <a class="header-anchor" href="#第三次握手" aria-label="Permalink to &quot;第三次握手&quot;">​</a></h2><ul><li>标志位为 ACK，表示确认收到服务器端同意连接的信号；</li><li>序号为 seq = x + 1，表示收到服务器端的确认号 ack，并将其值作为自己的序号值；</li><li>确认号为 ack= y + 1，表示收到服务器端序号 seq，并将其值加 1 作为自己的确认号 Ack 的值。</li></ul>',11),s=[r];function n(c,_,d,h,p,u){return a(),t("div",null,s)}const q=e(i,[["render",n]]);export{k as __pageData,q as default};
