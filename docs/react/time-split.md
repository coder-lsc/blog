---
layout: doc
---

# 时间切片

## 为什么需要时间切片

在老版本 react 中（react v15），更新操作在单线程的 js 中无法被打断，一旦执行大批量更新操作会造成页面卡顿。react v16 希望可以打断更新操作，让整个过程在不阻塞渲染的情况下进行，因此将更新操作分配给每一帧进行，即时间切片。

浏览器在绘制一帧的时候会处理很多事物，包括事件处理，js 执行，requestAnimationFrame 回调，布局，绘制页面等等。同时谷歌浏览器提供了 requestIdleCallback API。这个 api 可以在“浏览器重排/重绘”后如果当前帧还有空余时间时被调用的。听起来这是个完美实现时间切片的 api，但由于兼容性的问题，react 并没有使用 requestIdleCallback，而是模拟实现了 requestIdleCallback，这就是 Scheduler

### 浏览器每一帧的具体行为

https://juejin.cn/post/6844903808762380296?searchId=202309281909181190521133F5F1D9C41C

https://segmentfault.com/a/1190000014018604

## 如何模拟 requestIdleCallback

- setImmediate 是给 ie 和老版本 node 使用的
- MessageChannel 是给大部分场景使用的
- 不支持 setImmediate 和 MessageChannel 的场景将会使用 setTimeout 兜底

```js
// react源码

var frameYieldMs = 5; // 分片设为5ms

var schedulePerformWorkUntilDeadline;

if (typeof localSetImmediate === "function") {
  // Node.js and old IE.
  // There's a few reasons for why we prefer setImmediate.
  //
  // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
  // (Even though this is a DOM fork of the Scheduler, you could get here
  // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
  // https://github.com/facebook/react/issues/20756
  //
  // But also, it runs earlier which is the semantic we want.
  // If other browsers ever implement it, it's better to use it.
  // Although both of these would be inferior to native scheduling.
  schedulePerformWorkUntilDeadline = function () {
    localSetImmediate(performWorkUntilDeadline);
  };
} else if (typeof MessageChannel !== "undefined") {
  // DOM and Worker environments.
  // We prefer MessageChannel because of the 4ms setTimeout clamping.
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = performWorkUntilDeadline;

  schedulePerformWorkUntilDeadline = function () {
    port.postMessage(null);
  };
} else {
  // We should only fallback here in non-browser environments.
  schedulePerformWorkUntilDeadline = function () {
    localSetTimeout(performWorkUntilDeadline, 0);
  };
}
```

## MessageChannel 解析

选择 MessageChannel 的原因，是首先异步得是个宏任务，因为宏任务中会在下次事件循环中执行，不会阻塞当前页面的更新。MessageChannel 是一个宏任务。

没选常见的 setTimeout，是因为 MessageChannel 能较快执行，在 0 ～ 1ms 内触发，像 setTimeout 即便设置 timeout 为 0 还是需要 4 ～ 5ms。相同时间下，MessageChannel 能够完成更多的任务。

另外，也没有选择使用 requestAnimationFrame，是因为它的机制比较特别，是在更新页面前执行，但更新页面的时机并没有规定，执行时机并不稳定。

## 为什么不用 requestAnimationFrame

**Event Loop 中的执行顺序（一般情况）：**
同步任务 > 微任务 > requestAnimationFrame > DOM 渲染 > 宏任务

```js
setTimeout(() => {
  console.log("setTimeout");
}, 0);

const { port1, port2 } = new MessageChannel();
port2.onmessage = (e) => {
  console.log(e.data);
};
port1.postMessage("MessageChannel");

requestAnimationFrame(() => {
  console.log("requestAnimationFrame");
});

Promise.resolve().then(() => {
  console.log("Promise1");
});
```

输出为：

```
Promise; // 微任务先执行
requestAnimationFrame;
setTimeout; // 宏任务，先定义先执行
MessageChannel; // 宏任务，后定义后执行
```

MDN：window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

严格意义上来说，raf 并不是一个宏任务，因为：

- 执行时机和宏任务完全不一致；（raf 在渲染前，宏任务在渲染后）
- raf 任务队列被执行的时候，会将其此刻 raf 队列中所有的 raf 回调都执行完；(如图 1，raf1 和 raf2 在同一个任务中执行)
- 如图 2，raf 和重绘重排提交共同组成了一个 task

![An image](/raf1.jpeg)

![An image](/raf2.jpeg)

代码如下：

```html
<script>
  requestAnimationFrame(function raf() {
    console.log("raf");
    for (let i = 0; i <= 100000000; i++) {
      if (i === 10000) {
        console.log("raf end");
      }
    }
  });
  requestAnimationFrame(function raf2() {
    console.log("raf2");
    for (let i = 0; i <= 100000000; i++) {
      if (i === 10000) {
        console.log("raf2 end");
      }
    }
  });
</script>
```

### 为什么说 raf 不稳定

raf 真正的回调时机是在浏览器进行重绘渲染的时候，而宏任务如果执行很快，两个宏任务在一帧内执行完成，第一个宏任务结束时是不会触发渲染的，不渲染也就意味着两次宏任务却只触发了一次 raf。
示例：

1. 当两次 setTimeout 没设置间隔，在一帧内完成。

```js
setTimeout(() => {
  box1.style.backgroundColor = "black";
  setTimeout(() => {
    box1.style.backgroundColor = "yellow";
  });
});
```

如图，没有黑色的一帧（但不是必现）

![An image](/raf3.jpeg)

2. 当给 setTimeout 设置时间间隔，则必在至少两帧进行

```js
setTimeout(() => {
  box1.style.backgroundColor = "black";
  setTimeout(() => {
    box1.style.backgroundColor = "yellow";
  }, 18);
});
```

![An image](/raf4.jpeg)

## 代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .box {
        width: 200px;
        height: 200px;
      }
      .green {
        background-color: green;
      }
    </style>
  </head>
  <body>
    <div id="box1" class="box green">box1</div>
    <script>
      // requestAnimationFrame(function raf() {
      //   console.log("raf");
      //   for (let i = 0; i <= 100000000; i++) {
      //     if (i === 10000) {
      //       console.log("raf end");
      //     }
      //   }
      // });
      // requestAnimationFrame(function raf2() {
      //   console.log("raf2");
      //   for (let i = 0; i <= 100000000; i++) {
      //     if (i === 10000) {
      //       console.log("raf2 end");
      //     }
      //   }
      // });
      setTimeout(() => {
        box1.style.backgroundColor = "black";
        setTimeout(() => {
          box1.style.backgroundColor = "yellow";
        }, 18);
      });
    </script>
  </body>
</html>
```
