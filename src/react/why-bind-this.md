---
layout: doc
---

# 为什么类组件需要手动绑定 this

## 问题本质

在类组件的方法里读不到 this。

首先，这不是 react 的问题。而是在 js 语法中，本身就是无法读取到的。

```js
class Test {
  prop = "Test class";

  unboundFunction() {
    console.log(this.prop);
  }
}

let test = new Test();

// 提取并调用函数，'this' 是 'undefined'
let func = test.unboundFunction;
func(); // => TypeError: Cannot read property 'prop' of undefined
```

在 js 中解决该问题的方法就是 bind 和 箭头函数（这两种仍然与 react 没有关系）

```js
// bind
class Test {
  prop = "Test class";

  constructor() {
    this.boundFunction = this.boundFunction.bind(this);
  }

  boundFunction() {
    console.log(this.prop);
  }
}

let test = new Test();

// 提取并调用函数，'this' 现在指向 'test'
let func = test.boundFunction;
func(); // => 输出: 'Test class'
```

```js
// 箭头函数
class Test {
  prop = "Test class";

  constructor() {
    // this.boundFunction = this.boundFunction.bind(this);
  }

  boundFunction = () => {
    console.log(this.prop);
  };
}

let test = new Test();

// 提取并调用函数，'this' 现在指向 'test'
let func = test.boundFunction;
func(); // => 输出: 'Test class'
```

## 总结 react 绑定 this 的四种方法

### 1. 在调用时 bind 绑定 this

```js
class Button extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={this.handleClick.bind(this)}>Click me</button>;
  }
}
```

### 2. 在调用的时候使用箭头函数绑定 this

```js
class Button extends React.Component {
  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={() => this.handleClick()}>Click me</button>;
  }
}
```

方式 1 和方式 2 都是在调用的时候再绑定

优点：写法比较简单，当组件中没有 state 的时候就不需要添加类构造函数来绑定 this

缺点：每一次调用都会生成一个新的方法实例，因此对性能有影响，并且当这个函数作为属性值传入低阶组件的时候，这些组件可能会进行额外的重新渲染，因为每一次都是新的方法实例作为的新的属性传递

### 3. 在构造函数中使用 bind 绑定 this

```js
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log("this is:", this);
  }

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

### 4. 使用属性初始化器语法绑定 this

```js
class Button extends React.Component {
  handleClick = () => {
    console.log("this is:", this);
  };

  render() {
    return <button onClick={this.handleClick}>Click me</button>;
  }
}
```

方式 3 和方式 4 是一次绑定，多次调用

方式 4：将方法初始化为箭头函数，因此在定义函数的时候就绑定了 this，不需要在类构造函数中绑定，调用的时候不需要再作绑定

## 相关链接

链接：https://juejin.cn/post/7280787657013477437

链接：https://juejin.cn/post/6855590027873288206
