---
layout: doc
---

# immer

## 可变数据&不可变数据

可变数据：

```js
let objA = { name: "小明" };
let objB = objA;
objB.name = "小红";
console.log(objA.name); // objA 的name也变成了小红
```

不可变数据：
加上一层 deepclone/json.parse(json.stringify)

### 为什么要在 react 中追求不可变数据？

因为 react diff 算法时会对保存的数据进行浅比较，因此如果对象地址没有变，就不会引起重新渲染。

## 使用场景

useState 在 set 时会对保存的数据进行浅比较，因此我们通常有以下两种写法：

写法一：解构赋值
缺点：代码可读性差，书写麻烦，难以维护

```js
  setFormConfig((prevState) => {
      ...prevState,
      fieldForm: prevState.fieldForm.map((item,idx) => {
          if(idx === selectIndex){
              return {
                  ...item,
                  fieldName:newName
              }
          }
          return item
      })
  });
```

写法二：深拷贝
缺点：深拷贝消耗性能较大

```js
let tempFormConfig = deepClone(formConfig);
tempFormConfig.fieldForm[1].fieldName = newName;
setFormConfig(tempFormConfig);
```

## use-immer 代码实例 (use-immer 是对 immer 的 hooks 包装)

```js
import React from "react";
import { useImmer } from "use-immer";

const TodoList = () => {
  const [todos, setTodos] = useImmer([
    {
      id: "111",
      title: "react 111",
      done: true
    },
    {
      id: "222",
      title: "react 222",
      done: false
    }
  ]);

  const handleToggle = useCallback((id) => {
    setTodos((draft) => {
      const todo = draft.find((todo) => todo.id === id);
      todo.done = !todo.done;
    });
  }, []);

```

## immer 原理

理念：

- 当我们调用 immer 的 API produce 时，immer 将内部使用 proxy 代理劫持传入的对象
- 当触发 getter 时暴露一个 draft （草稿）给我们
- 我们在 draft 上作修改时触发 setter
- immer 接收修改后的 draft，immer 基于传入的 state 照着 draft 的修改 返回一个新的 state

## 核心源码

此源码参考的是老版本 immer v1.0.1。并对其进行了精简，删除了 es5 的 polyfill 和 freeze 等代码

```js
let proxies = null;

function source(state) {
  return state.modified === true ? state.copy : state.base;
}

// 如读取a.b state为a  state.base[prop]为b （执行a.b.c = 1 则会读取a.b）
function get(state, prop) {
  if (state.modified) {
    // a没有被修改过
    const value = state.copy[prop];
    if (value === state.base[prop]) {
      // 在a上创b的proxy 放在a.copy中
      return (state.copy[prop] = createProxy(state, value));
    }
    return value;
  } else {
    // a没被修改过 在a上创b的proxy 放在a.proxies中
    if (has(state.proxies, prop)) return state.proxies[prop];
    const value = state.base[prop];
    return (state.proxies[prop] = createProxy(state, value));
  }
}

// a.b.c = 1 会对触发a.b的setter
function set(state, prop, value) {
  if (!state.modified) {
    // a.b没有被修改过
    if (
      (prop in state.base && is(state.base[prop], value)) ||
      (has(state.proxies, prop) && state.proxies[prop] === value)
    )
      return true;
    // 对a.b进行修改
    markChanged(state);
  }
  // a.b被修改过
  // 给a.b.c赋值存放在a.b的copy中（在此之前copy已经被初始化为state.base的浅拷贝了）
  state.copy[prop] = value;
  return true;
}

function markChanged(state) {
  if (!state.modified) {
    // 将a.b的modified置为true
    state.modified = true;
    // 将a.b的copy初始化为state.base的浅拷贝
    state.copy = shallowCopy(state.base);

    Object.assign(state.copy, state.proxies); // yup that works for arrays as well

    // 对a进行相同的修改
    if (state.parent) markChanged(state.parent);
  }
}

function createProxy(parent, base) {
  const proxy = Proxy.revocable(
    {
      modified: false,
      finalized: false,
      parent,
      base, // 原始数据
      copy: undefined, // 修改过的数据
      proxies: {},
    },
    {
      get,
      set,
      has(target, prop) {
        return prop in source(target);
      },
    }
  );
  proxies.push(proxy);
  return proxy.proxy;
}

// produce函数入口
export function produceProxy(baseState, producer) {
  const previousProxies = proxies;
  proxies = [];
  try {
    // 1.给根节点创建proxy
    const rootClone = createProxy(undefined, baseState);
    // 执行操作draft的代码
    producer.call(rootClone, rootClone);
    // 递归整理所有proxy代理的值
    const res = finalize(rootClone);
    // 销毁所有proxy
    each(proxies, (_, p) => p.revoke());
    return res;
  } finally {
    proxies = previousProxies;
  }
}

export function finalize(base) {
  if (isProxy(base)) {
    const state = base[PROXY_STATE];
    if (state.modified === true) {
      if (state.finalized === true) return state.copy;
      state.finalized = true;
      return finalizeObject(state.copy, state);
    } else {
      return state.base;
    }
  }
  return base;
}

function finalizeObject(copy, state) {
  const base = state.base;
  each(copy, (prop, value) => {
    if (value !== base[prop]) copy[prop] = finalize(value);
  });
  return copy;
}
```
