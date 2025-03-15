import{_ as a,o as e,c as t,Q as o}from"./chunks/framework.874cb1ca.js";const u=JSON.parse('{"title":"浮点数精度问题","description":"","frontmatter":{"layout":"doc"},"headers":[],"relativePath":"jsCommon/floatNumber.md","filePath":"jsCommon/floatNumber.md"}'),r={name:"jsCommon/floatNumber.md"},n=o('<h1 id="浮点数精度问题" tabindex="-1">浮点数精度问题 <a class="header-anchor" href="#浮点数精度问题" aria-label="Permalink to &quot;浮点数精度问题&quot;">​</a></h1><p>简言之：<strong>有的十进制数转为二进制的时候，可能会出现循环，位数超过了 64 位双精度浮点数的存储空间，而被截断</strong></p><h2 id="二进制数据的存储" tabindex="-1">二进制数据的存储 <a class="header-anchor" href="#二进制数据的存储" aria-label="Permalink to &quot;二进制数据的存储&quot;">​</a></h2><p>64 位双精度浮点数是一种二进制的科学计数法，它采用 64 个比特，也就是 8 个字节来存储数值。通俗的理解我们可以认为有 64 个格子来表示一个数。并且每一位只能是 0 或者 1。</p><h2 id="_0-1-0-2" tabindex="-1">0.1+0.2 <a class="header-anchor" href="#_0-1-0-2" aria-label="Permalink to &quot;0.1+0.2&quot;">​</a></h2><p>0.1 -&gt; 0.0001 1001 1001 1001...(1100 循环)</p><p>0.2 -&gt; 0.0011 0011 0011 0011...(0011 循环)</p><p>IEEE 754 标准的 64 位双精度浮点数的小数部分最多支持 53 位二进制位，所以两者相加之后得到二进制为：</p><p>0.0100110011001100110011001100110011001100110011001100</p><p>因浮点数小数位的限制而截断的二进制数字，再转换为十进制，就成了 0.30000000000000004。所以在进行算术计算时会产生误差。</p>',10),s=[n];function _(c,l,i,p,d,m){return e(),t("div",null,s)}const f=a(r,[["render",_]]);export{u as __pageData,f as default};
