---
layout: doc
---

# 浏览器强缓存&协商缓存

## 强缓存

（老协议中会使用 Expires，Expires 是会上传本地时间戳给服务端，但是本地时间戳不准）

首次请求，服务端响应头设置了 Cache-Control

二次请求时，Cache-Control 中设置的 max-age 没有过期，则取缓存中的资源。状态码为 200，（from disk)

Cache-Control 的值：

- max-age 决定客户端资源被缓存多久。
- s-maxage 决定代理服务器缓存的时长。
- no-cache 表示是强制进行协商缓存。（禁止强缓存）
- no-store 是表示禁止任何缓存策略。
- public 表示资源即可以被浏览器缓存也可以被代理服务器缓存。
- private 表示资源只能被浏览器缓存。

（注：chrome 在点击刷新时不会触发强缓存，只有在路由跳转、回退时才会触发；但会自动校验协商缓存）

## 协商缓存

首次请求，服务端响应头设置了 last-modified：时间戳 和 Cache-control:no-cache

二次请求时，浏览器请求头中携带一个字段：If-Modified-Since：首次响应的时间戳。服务端收到后再进行逻辑判断返回新的资源还是返回 304

http1.1 后，改用 ETag 和 if-None-Match 来进行验证哈希值判断资源是否变化

## 使用场景

文件名中包含了 webpack 哈希值的文件，设置强缓存

文件名中不包含哈希值的文件，设置协商缓存
