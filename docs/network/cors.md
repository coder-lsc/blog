---
layout: doc
---

# 浏览器跨域问题

## 同源策略

- 协议
- 域名
- 端口号

## CORS 跨域资源共享

### 简单请求

满足条件：

- GET, POST, HEAD
- Content-Type 为 text/plain ，multipart/form-data，application/x-www-form-urlencoded

### 复杂请求&预请求（options）

复杂请求发起前，浏览器会自动发起预请求向服务器验证请求信息是否通过

```js
// 允许cors跨域资源共享
'Access-Control-Allow-Origin': '*'

// 允许所有方法 如put delete
'Access-Control-Allow-Methods': '*',
// 允许 Content-Type 头部
'Access-Control-Allow-Headers': 'Content-Type',

```

## jsonp

原理：script 标签访问时，可以跨越同源策略限制

特点：

- 通过 script 标签发起 get 请求
- 从其它域加载 JavaScript 脚本并直接执行，需要提前定义 callback 函数接收数据

缺点：

- 只支持 get 请求
- 从其它域加载 JavaScript 脚本时易被攻击

## 代理

原理：用一个可以实现跨域的服务器去转发请求，因为服务器和服务器间发送请求没有同源策略的限制

## 其他

- iframe
- postmessage
- websocket
