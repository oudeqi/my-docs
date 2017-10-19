# ECMAScript 6 语法特性
> 覆盖 ES6 与上一个版本 ES5 的所有不同之处

## ECMAScript 和 JavaScript 的关系
> ECMA 是国际标准化组织，它制定的关于 JavaScript 规范就是 ECMAScript，JavaScript 是 ECMAScript 的实现

## ES6 与 ECMAScript 2015 的关系
> 2011年，ECMAScript 5.1版发布
> 2015年6月发布了 ES6 的第一个版本，正式名称就是《ECMAScript 2015标准》（简称 ES2015）
> ES6 是一个泛指，含义是5.1版以后的 JavaScript 的下一代标准，涵盖了ES2015、ES2016、ES2017 等等
> 标准委员会决定，标准在每年的6月份正式发布一次，作为当年的正式版本。接下来的时间，就在这个版本的基础上做改动，直到下一年的6月份，草案就自然变成了新一年的版本。这样一来，就不需要以前的版本号了，只要用年份标记就可以了。

## babel-node
> babel-cli工具自带一个babel-node命令，提供一个支持ES6的REPL环境。它支持Node的REPL环境的所有功能，而且可以直接运行ES6代码。
> babel-node命令可以直接运行ES6脚本。使用babel-node替代node，这样script.js本身就不用做任何转码处理。
``` bash
$ babel-node
> (x => x * 2)(1)
2
```

## babel-register
> babel-register模块改写require命令，为它加上一个钩子。此后，每当使用require加载.js、.jsx、.es和.es6后缀名的文件，就会先用Babel进行转码。
> 使用时，必须首先加载babel-register。然后，就不需要手动对index.js转码了
``` bash
require("babel-register");
require("./index.js");
```

## babel-core
> 如果某些代码需要调用 Babel 的 API 进行转码，就要使用babel-core模块
``` bash
var es6Code = 'let x = n => n + 1';
var es5Code = require('babel-core')
  .transform(es6Code, {
    presets: ['latest']
  })
  .code;
// '"use strict";\n\nvar x = function x(n) {\n  return n + 1;\n};'
```

## babel-polyfill
> Babel 默认只转换新的 JavaScript 句法（syntax），而不转换新的 API。如果想转换新的 API，必须使用babel-polyfill，为当前环境提供一个垫片。
> 比如Iterator、Generator、Set、Maps、Proxy、Reflect、Symbol、Promise等全局对象，以及一些定义在全局对象上的方法（比如Object.assign）都不会转码。
``` bash
import 'babel-polyfill';
// 或者
require('babel-polyfill');
```

## let 命令
> let所声明的变量，只在let命令所在的代码块内有效。
> for循环的计数器，就很合适使用let命令。
``` bash
for (let i = 0; i < 10; i++) {
  // ...
}
console.log(i);
// ReferenceError: i is not defined
```
``` bash
var a = [];
for (var i = 0; i < 10; i++) { //如果使用var，最后输出的是10。
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10
```
``` bash
var a = [];
//如果使用let，声明的变量仅在块级作用域内有效，最后输出的是6。
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6
```
> for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
``` bash
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
// abc
// abc
// abc
```
> 上面代码正确运行，输出了3次abc。这表明函数内部的变量i与循环变量i不在同一个作用域，有各自单独的作用域。

> 不存在变量提升
> 暂时性死区
> 不允许重复声明
> ES6 的块级作用域