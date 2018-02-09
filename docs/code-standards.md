# ESLint是一个语法规则和代码风格的检查工具，可以用来保证写出语法正确、风格统一的代码
1. 安装 ESLint。`$ npm i -g eslint`
2. 安装 Airbnb 语法规则，以及 import、a11y、react 插件。
``` bash
$ npm i -g eslint-config-airbnb
$ npm i -g eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
```
3. 在项目的根目录下新建一个.eslintrc文件，配置 ESLint。
``` bash
{
  "extends": "eslint-config-airbnb"
}
```
-------------------------------------------------------------
# Airbnb javascript编码规范
1. 对所有的引用使用 const ，不要使用 var，这能确保你无法对引用重新赋值，也不会导致出现 bug 或难以理解
2. 如果一定需要可变动的引用，使用 let 代替 var。因为 let 是块级作用域，而 var 是函数作用域。
3. 使用字面值创建对象。
``` bash
// bad
const item = new Object();
// good
const item = {};
```
4. 使用对象方法的简写。
``` bash
const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};
```
5. 使用对象属性值的简写。
``` bash
const lukeSkywalker = 'Luke Skywalker';
const obj = {
	lukeSkywalker,
};
```
6. 不要直接调用 Object.prototype 的方法，如：hasOwnProperty, propertyIsEnumerable, 和 isPrototypeOf
``` bash
// bad
console.log(object.hasOwnProperty(key));
// good
console.log(Object.prototype.hasOwnProperty.call(object, key));
// best
const has = Object.prototype.hasOwnProperty; // cache the lookup once, in module scope.
/* or */
const has = require('has');
console.log(has.call(object, key));
```
7. 浅拷贝对象的时候最好是使用 … 操作符而不是 Object.assign
``` bash
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); // this mutates `original`
delete copy.a; // so does this
// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```
8. 使用字面值创建数组。
``` bash
// bad
const items = new Array();
// good
const items = [];
```
http://blog.csdn.net/haoshidai/article/details/52833377
-------------------------------------------------------------
# Airbnb React/JSX 编码规范

-------------------------------------------------------------
# Airbnb css/sass编码规范

-------------------------------------------------------------


mongod --dbpath "D:\Program Files\MongoDB\data\db" --logpath "D:\Program Files\MongoDB\data\log\mongodb.log" --serviceName "mongodb" --serviceDisplayName "mongodb" --install


JavaScript 语言是传值调用，在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
将其替换成一个只接受回调函数作为参数的单参数函数。

异步 Generator 函数出现以后，JavaScript 就有了四种函数形式：普通函数、async 函数、Generator 函数和异步 Generator 函数
基本上，如果是一系列按照顺序执行的异步操作（比如读取文件，然后写入新内容，再存入硬盘），可以使用 async 函数；
如果是一系列产生相同数据结构的异步操作（比如一行一行读取文件），可以使用异步 Generator 函数。

var p1 = new Point(2,3);
var p2 = new Point(3,2);
p1.__proto__ === p2.__proto__
//true，这也意味着，可以通过实例的__proto__属性为“类”添加方法
//__proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，虽然目前很多现代浏览器的 JS 引擎中都提供了这个私有属性，
//但依旧不建议在生产中使用该属性，避免对环境产生依赖。
//生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型,这样不会对环境产生依赖，然后再来为原型添加方法/属性。


ES6 定义静态方法用 static 表示。
ES6 规定 Class 内部没有静态属性。
ES6 模拟静态属性写法：
class Foo {}
Foo.prop = 1;
Foo.prop // 1
//ES6 定义实例属性，只能写在类的constructor方法里面，新提案提出了实例属性、静态属性的新写法,

es5 无法继承原生构造函数，就算继承，行为和原来的构造函数也不一致，
Array.apply(this, arguments);
通过Array.apply()或者分配给原型对象都不行。原生构造函数会忽略apply方法传入的this，也就是说，
原生构造函数的this无法绑定，导致拿不到内部属性。
ES5 是先新建子类的实例对象this，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数

ES6 允许继承原生构造函数，定义子类，因为 ES6 是先新建父类的实例对象this，然后再用子类的构造函数修饰this，使得父类的所有行为都可以继承

//类数组对象转换成数组
Array.prototype.slice.call(arguments);
[].slice.call(arguments);
...arguments

ES6 模块之中，顶层的this指向undefined；CommonJS 模块的顶层this指向当前模块

所有的函数都应该设置为常量。

静态字符串一律使用单引号，不使用双引号。动态字符串使用反引号。

使用数组成员对变量赋值时，优先使用解构赋值
const arr = [1, 2, 3, 4];
const [first, second] = arr;

函数的参数如果是对象的成员，优先使用解构赋值。
function getFullName({ firstName, lastName }){}
getFullName（user）

如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
// bad
function processInput(input) {
  return [left, right, top, bottom];
}
// good
function processInput(input) {
  return { left, right, top, bottom };
}
const { left, right } = processInput(input);

单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};

对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
// bad
const a = {};
a.x = 3;
// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });
// good
const a = { x: null };
a.x = 3;

如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
// bad
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;
// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写
var ref = 'some value';
// bad
const atom = {
  ref: ref,
  value: 1,
  addValue: function (value) {
    return atom.value + value;
  },
};
// good
const atom = {
  ref,
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
};

使用扩展运算符（...）拷贝数组
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];

使用 Array.from 方法，将类似数组的对象转为数组。
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);

立即执行函数可以写成箭头函数的形式。
(() => {
  console.log('Welcome to the Internet.');
})();

那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
// bad
[1, 2, 3].map(function (x) {
  return x * x;
});
// good
[1, 2, 3].map((x) => {
  return x * x;
});
// best
[1, 2, 3].map(x => x * x);

箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}
// acceptable
const boundMethod = method.bind(this);
// best
const boundMethod = (...params) => method.apply(this, params);

简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
// bad
function divide(a, b, option = false ) {}
// good
function divide(a, b, { option = false } = {}) {}

不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。
因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
// good
function concatenateAll(...args) {
  return args.join('');
}

使用默认值语法设置函数参数的默认值。
// bad
function handleThings(opts) {
  opts = opts || {};
}
// good
function handleThings(opts = {}) {
  // ...
}

注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
let map = new Map(arr);
for (let key of map.keys()) {
  console.log(key);
}
for (let value of map.values()) {
  console.log(value);
}
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}

总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
// bad
function Queue(contents = []) {
  this._queue = [...contents];
}
Queue.prototype.pop = function() {
  const value = this._queue[0];
  this._queue.splice(0, 1);
  return value;
}
// good
class Queue {
  constructor(contents = []) {
    this._queue = [...contents];
  }
  pop() {
    const value = this._queue[0];
    this._queue.splice(0, 1);
    return value;
  }
}

使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
  Queue.apply(this, contents);
}
inherits(PeekableQueue, Queue);
PeekableQueue.prototype.peek = function() {
  return this._queue[0];
}
// good
class PeekableQueue extends Queue {
  peek() {
    return this._queue[0];
  }
}

首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;
// good
import { func1, func2 } from 'moduleA';

使用export取代module.exports。
// commonJS的写法
var React = require('react');
var Breadcrumbs = React.createClass({
  render() {
    return <nav />;
  }
});
module.exports = Breadcrumbs;

// ES6的写法
import React from 'react';
class Breadcrumbs extends React.Component {
  render() {
    return <nav />;
  }
};
export default Breadcrumbs;

如果模块只有一个输出值，就使用export default，如果模块有多个输出值，
就不使用export default，export default与普通的export不要同时使用。

不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。
// bad
import * as myObject from './importModule';
// good
import myObject from './importModule';

如果模块默认输出一个函数，函数名的首字母应该小写。
function makeStyleGuide() {}
export default makeStyleGuide;

如果模块默认输出一个对象，对象名的首字母应该大写。
const StyleGuide = {
  es6: {
  }
};
export default StyleGuide


### Airbnb 规范
http://blog.csdn.net/haoshidai/article/details/52833377