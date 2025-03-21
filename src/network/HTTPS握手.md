---
layout: doc
---

# HTTPS 握手 (TLS)

![An image](/tls.jpg)

## 中间人攻击

在非对称加密通信过程中，服务器需要将公钥发送给客户端，在这一过程中，公钥很可能会被第三方拦截并替换，然后这个第三方就可以冒充服务器与客户端进行通信，这就是传说中的“中间人攻击”(man in the middle attack)。

## 数字证书

解决此问题的方法是通过受信任的第三方交换公钥，具体做法就是服务器不直接向客户端发送公钥，而是要求受信任的第三方，也就是证书认证机构 (Certificate Authority, 简称 CA)将公钥合并到数字证书中，然后服务器会把公钥连同证书一起发送给客户端，私钥则由服务器自己保存以确保安全。

## 过程总结

- 非对称加密确认密钥

- 对称加密进行通信

## 参考链接

https://juejin.cn/post/6844904132071948295
