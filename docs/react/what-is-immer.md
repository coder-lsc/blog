---
layout: doc
---

# 什么是 immer

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

## use-immer 代码实例

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

## use-immer 原理

通过 proxy 实现

- 当我们调用 immer 的 API produce 时，immer 将内部暂时存储着我们的目标对象（以 state 为例）
- immer 暴露一个 draft （草稿）给我们
- 我们在 draft 上作修改
- immer 接收修改后的 draft，immer 基于传入的 state 照着 draft 的修改 返回一个新的 state
