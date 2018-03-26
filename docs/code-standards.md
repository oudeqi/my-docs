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
9. 使用拓展运算符 … 复制数组
``` bash
// bad
const items = new Array();
// good
const items = [];
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
```
10. 使用 Array#from 把一个类数组对象转换成数组
``` bash
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```
11. 使用函数声明代替函数表达式
> 因为函数声明是可命名的，所以他们在调用栈中更容易被识别。此外，函数声明会把整个函数提升（hoisted），而函数表达式只会把函数的引用变量名提升。这条规则使得箭头函数可以取代函数表达式
``` bash
// bad
const foo = function () {};
// good
function foo() {}
```
12. 函数表达式
``` bash
// 立即调用的函数表达式 (IIFE)
(() => {
   console.log('Welcome to the Internet. Please follow me.');
})();
```
13. 永远不要在一个非函数代码块（if、while等）中声明一个函数，把那个函数赋给一个变量。浏览器允许你这么做，但它们的解析表现不一致
``` bash
// bad
if (currentUser) {
  function test() {
    console.log('Nope.');
  }
}
// good
let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
```
14. 不要使用 arguments。可以选择 rest 语法 … 替代
> 为什么？使用 … 能明确你要传入的参数。另外 rest 参数是一个真正的数组，而 arguments 是一个类数组。
``` bash
// bad
function concatenateAll() {
	const args = Array.prototype.slice.call(arguments);
	return args.join('');
}
// good
function concatenateAll(...args) {
	return args.join('');
}
```
15. 当你必须使用函数表达式（或传递一个匿名函数）时，使用箭头函数符号
> 为什么?因为箭头函数创造了新的一个 this 执行环境，通常情况下都能满足你的需求，而且这样的写法更为简洁。
> 为什么不？如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个函数声明上。
``` bash
// bad
[1, 2, 3].map(function (x) {
	return x * x;
});
// good
[1, 2, 3].map((x) => {
	return x * x;
});
```
16. 如果一个函数适合用一行写出并且只有一个参数，那就把花括号、圆括号和 return都省略掉。如果不是，那就不要省略
> 为什么？语法糖。在链式调用中可读性很高。 
> 为什么不？当你打算回传一个对象的时候。
``` bash
// good
[1, 2, 3].map(x => x * x);

// good
[1, 2, 3].reduce((total, n) => {
	return total + n;
}, 0);
```
17. 总是使用 class。避免直接操作 prototype
> 为什么? 因为 class 语法更为简洁更易读。
``` bash
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
```
18. 使用 extends 继承。
> 为什么？因为 extends 是一个内建的原型继承方法并且不会破坏 instanceof。
19. 方法可以返回 this 来帮助链式调用。
20. 总是使用模组 (import/export)
> 而不是其他非标准模块系统。你可以编译为你喜欢的模块系统。 
> 为什么？模块就是未来，让我们开始迈向未来吧。
21. 不要使用通配符 import
> 为什么？这样能确保你只有一个默认 export。
``` bash
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```
22. 不要从 import 中直接 export
> 为什么？虽然一行代码简洁明了，但让 import 和 export 各司其职让事情能保持一致。
``` bash
// bad
// filename es6.js
export { es6 as default } from './airbnbStyleGuide';
// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```
23. 不要使用 iterators,使用高阶函数例如 map() 和 reduce() 替代 for-of
> 为什么？这加强了我们不变的规则。处理纯函数的回调值更易读，这比它带来的副作用更重要。
``` bash
const numbers = [1, 2, 3, 4, 5];
// bad
let sum = 0;
for (let num of numbers) {
	sum += num;
}
sum === 15;
// good
let sum = 0;
numbers.forEach((num) => sum += num);
sum === 15;
// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
```
24. 现在还不要使用 generators?
> 为什么？因为它们现在还没法很好地编译到 ES5。 (目前Chrome 和 Node.js 的稳定版本都已支持 generators)
25. 一直使用 const 来声明变量
> 如果不这样做就会产生全局变量。我们需要避免全局命名空间的污染。
``` bash
// bad
superPower = new SuperPower();
// good
const superPower = new SuperPower();
```
26. 将所有的 const 和 let 分组
> 为什么？当你需要把已赋值变量赋值给未赋值变量时非常有用。
``` bash
// bad
let i, len, dragonball,
  items = getItems(),
  goSportsTeam = true;

// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;

// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```
27. var 声明会被提升至该作用域的顶部，但它们赋值不会提升。
> let 和 const 被赋予了一种称为「暂时性死区（Temporal Dead Zones, TDZ）」的概念。
> 这对于了解为什么 type of 不再安全相当重要。
28. 匿名函数表达式的变量名会被提升，但函数内容并不会。

29. 命名的函数表达式的变量名会被提升，但函数名和函数函数内容并不会。

30. 函数声明的名称和函数体都会被提升。
``` bash
// bad
const foo = function () {};
// 函数声明 good
function foo() {}
```
31. 比较运算符 & 等号
32. 优先使用 === 和 !== 而不是 == 和 !=
33. 条件表达式例如 if 语句通过抽象方法 ToBoolean 强制计算它们的表达式并且总是遵守下面的规则：
``` bash
对象 被计算为 true 
Undefined 被计算为 false 
Null 被计算为 false 
布尔值 被计算为 布尔的值 
数字 如果是 +0、-0、或 NaN 被计算为 false, 否则为 true 
字符串 如果是空字符串 ” 被计算为 false，否则为 true
```
34. 使用 /* … / 作为多行注释。包含描述、指定所有参数和返回值的类型和值
``` bash
// bad
// make() returns a new element
// based on the passed in tag name
// @param {String} tag
// @return {Element} element
function make(tag) {
  // ...stuff...
  return element;
}

// good
/**
 * make() returns a new element
 * based on the passed in tag name
 *
 * @param {String} tag
 * @return {Element} element
 */
function make(tag) {
  // ...stuff...
  return element;
}
```
35. 使用 // 作为单行注释。在注释对象上面另起一行使用单行注释。在注释前插入空行
36. 给注释增加 FIXME 或 TODO 的前缀
> 帮助其他开发者快速了解这是一个需要复查的问题，或是给需要实现的功能提供一个解决方式。
> 这将有别于常见的注释，因为它们是可操作的。使用 FIXME – need to figure this out 或者 TODO – need to implement。
``` bash
class Calculator {
  constructor() {
    // FIXME: shouldn't use a global here
    total = 0;
  }
}

class Calculator {
  constructor() {
    // TODO: total should be configurable by an options param
    this.total = 0;
  }
}
```
37. 使用 2 个空格作为缩进。
38. 在花括号前要放一个空格
39. 在控制语句（if、while 等）的小括号前放一个空格。
> 在函数调用及声明中，不在函数的参数列表前加空格。
40. 在文件末尾插入一个空行
41. 在使用长方法链时进行缩进。使用放置在前面的点 . 强调这是方法调用而不是新语句。

-------------------------------------------------------------
# Airbnb React/JSX 编码规范
1. 基本规范
``` bash
每个文件只写一个模块. 
多个无状态模块可以放在单个文件中. eslint: react/no-multi-comp.
不要使用 React.createElement，除非从一个非JSX的文件中初始化app.
```
2. 如果模块有内部状态或者是refs, 推荐使用 class extends React.Component 而不是 React.createClass.
``` bash
eslint: react/prefer-es6-class react/prefer-stateless-function
```
3. 如果模块没有状态或是没有引用refs， 推荐使用普通函数（非箭头函数）而不是类:
``` bash
  // bad
  class Listing extends React.Component {
    render() {
      return <div>{this.props.hello}</div>;
    }
  }

  // bad (relying on function name inference is discouraged)
  const Listing = ({ hello }) => (
    <div>{hello}</div>
  );

  // good
  function Listing({ hello }) {
    return <div>{hello}</div>;
  }
```
4. 避免使用数组的index来作为属性key的值，推荐使用唯一ID
``` bash
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}
// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```
5. 总是在Refs里使用回调函数. eslint: react/no-string-refs
``` bash
// bad
<Foo
  ref="myRef"
/>
// good
<Foo
  ref={ref => { this.myRef = ref; }}
/>
```
6. 对于没有子元素的标签来说总是自己关闭标签.
``` bash
// bad
<Foo
  bar="bar"
  baz="baz" />

// good
<Foo
  bar="bar"
  baz="baz"
/>
```
7. 当在 render() 里使用事件处理方法时，提前在构造函数里把 this 绑定上去.
> 为什么? 在每次 render 过程中， 再调用 bind 都会新建一个新的函数，浪费资源.
``` bash
// bad
  class extends React.Component {
    onClickDiv() {
      // do stuff
    }
    render() {
      return <div onClick={this.onClickDiv.bind(this)} />
    }
  }

  // good
  class extends React.Component {
    constructor(props) {
      super(props);

      this.onClickDiv = this.onClickDiv.bind(this);
    }
    onClickDiv() {
      // do stuff
    }
    render() {
      return <div onClick={this.onClickDiv} />
    }
  }
```
-------------------------------------------------------------
# Airbnb css/sass编码规范
1. 格式
``` bash
类名建议使用破折号代替驼峰法。如果你使用 BEM，也可以使用下划线（参见下面的 OOCSS 和 BEM）。 
不要使用 ID 选择器。 
在一个规则声明中应用了多个选择器时，每个选择器独占一行。 
在规则声明的左大括号 { 前加上一个空格。 
在属性的冒号 : 后面加上一个空格，前面不加空格。 
规则声明的右大括号 } 独占一行。 
规则声明之间用空行分隔开。
```
2. 注释
``` bash
建议使用行注释 (在 Sass 中是 //) 代替块注释。 
建议注释独占一行。避免行末注释。
```
3. OOCSS 和 BEM
``` bash
出于以下原因，我们鼓励使用 OOCSS 和 BEM 的某种组合： 
• 可以帮助我们理清 CSS 和 HTML 之间清晰且严谨的关系。 
• 可以帮助我们创建出可重用、易装配的组件。 
• 可以减少嵌套，降低特定性。 
• 可以帮助我们创建出可扩展的样式表。

OOCSS，也就是 “Object Oriented CSS（面向对象的CSS）”，是一种写 CSS 的方法，其思想就是鼓励你把样式表看作“对象”的集合：创建可重用性、可重复性的代码段让你可以在整个网站中多次使用。

BEM，也就是 “Block-Element-Modifier”，是一种用于 HTML 和 CSS 类名的命名约定。BEM 最初是由 Yandex 提出的，要知道他们拥有巨大的代码库和可伸缩性，BEM 就是为此而生的，并且可以作为一套遵循 OOCSS 的参考指导规范。
```
``` bash
<article class="listing-card listing-card--featured">
  <h1 class="listing-card__title">Adorable 2BR in the sunny Mission</h1>
  <div class="listing-card__content">
    <p>Vestibulum id ligula porta felis euismod semper.</p>
  </div>
</article>

.listing-card { }
.listing-card--featured { }
.listing-card__title { }
.listing-card__content { }

• .listing-card 是一个块（block），表示高层次的组件。 
• .listing-card__title 是一个元素（element），它属于 .listing-card 的一部分，因此块是由元素组成的。 
• .listing-card–featured 是一个修饰符（modifier），表示这个块与 .listing-card 有着不同的状态或者变化。
```
4. 尽量不要使用ID 选择器！！！
> 在 CSS 中，虽然可以通过 ID 选择元素，但大家通常都会把这种方式列为反面教材。ID 选择器给你的规则声明带来了不必要的高优先级，而且 ID 选择器是不可重用的。
5. 推荐使用Scss语法
> 使用 .scss 的语法，不使用 .sass 原本的语法。
6. 变量名应使用破折号
> 例如my−variable代替camelCased和snakecased风格。对于仅用在当前文件的变量，可以在变量名之前添加下划线前缀例如_my-variable。
7. Mixins
> 为了让代码遵循 DRY 原则（Don’t Repeat Yourself）、增强清晰性或抽象化复杂性，应该使用 mixin，这与那些命名良好的函数的作用是异曲同工的。虽然 mixin 可以不接收参数，但要注意，假如不压缩负载（比如通过 gzip），这样会导致最终的样式包含不必要的代码重复。
8. 扩展指令
> 应避免使用 @extend 指令，因为它并不直观，而且具有潜在风险，特别是用在嵌套选择器的时候。即便是在顶层占位符选择器使用扩展，如果选择器的顺序最终会改变，也可能会导致问题。（比如，如果它们存在于其他文件，而加载顺序发生了变化）。其实，使用 @extend 所获得的大部分优化效果，gzip 压缩已经帮助你做到了，因此你只需要通过 mixin 让样式表更符合 DRY 原则就足够了。
9. 不要让嵌套选择器的深度超过 3 层！
``` bash
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}

当遇到以上情况的时候，你也许是这样写 CSS 的： 
• 与 HTML 强耦合的（也是脆弱的）
• 过于具体（强大）
• 没有重用
```




-------------------------------------------------------------


### const优于let有几个原因，
1.是阅读代码的人立刻会意识到不应该修改这个值，
2.是防止了无意间修改变量值所导致的错误。
3.是const比较符合函数式编程思想，运算不改变值，只是新建值
4.是 JavaScript 编译器会对const进行优化，所以多使用const，有利于提高程序的运行效率


### 所有的函数都应该设置为常量。

### 静态字符串一律使用单引号，不使用双引号。动态字符串使用反引号。

### 使用数组成员对变量赋值时，优先使用解构赋值
``` bash
const arr = [1, 2, 3, 4];
const [first, second] = arr;
```

### 函数的参数如果是对象的成员，优先使用解构赋值。
``` bash
function getFullName({ firstName, lastName }){}
getFullName(user)
```

### 如果函数返回多个值，优先使用对象的解构赋值，而不是数组的解构赋值。这样便于以后添加返回值，以及更改返回值的顺序。
``` bash
// bad
function processInput(input) {
  return [left, right, top, bottom];
}
// good
function processInput(input) {
  return { left, right, top, bottom };
}
const { left, right } = processInput(input);
```

### 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
``` bash
const a = { k1: v1, k2: v2 };
const b = {
  k1: v1,
  k2: v2,
};
```

### 对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用Object.assign方法。
``` bash
// bad
const a = {};
a.x = 3;
// if reshape unavoidable
const a = {};
Object.assign(a, { x: 3 });
// good
const a = { x: null };
a.x = 3;
```

### 如果对象的属性名是动态的，可以在创造对象的时候，使用属性表达式定义。
``` bash
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
```

### 对象的属性和方法，尽量采用简洁表达法，这样易于描述和书写
``` bash
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
```

### 使用扩展运算符（...）拷贝数组
``` bash
// bad
const len = items.length;
const itemsCopy = [];
let i;
for (i = 0; i < len; i++) {
  itemsCopy[i] = items[i];
}
// good
const itemsCopy = [...items];
```

### 使用 Array.from 方法，将类似数组的对象转为数组。
``` bash
const foo = document.querySelectorAll('.foo');
const nodes = Array.from(foo);
```

### 立即执行函数可以写成箭头函数的形式。
``` bash
(() => {
  console.log('Welcome to the Internet.');
})();
```

那些需要使用函数表达式的场合，尽量用箭头函数代替。因为这样更简洁，而且绑定了 this。
``` bash
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
```

### 箭头函数取代Function.prototype.bind，不应再用 self/_this/that 绑定 this。
``` bash
// bad
const self = this;
const boundMethod = function(...params) {
  return method.apply(self, params);
}
// acceptable
const boundMethod = method.bind(this);
// best
const boundMethod = (...params) => method.apply(this, params);
```

### 简单的、单行的、不会复用的函数，建议采用箭头函数。如果函数体较为复杂，行数较多，还是应该采用传统的函数写法。

### 所有配置项都应该集中在一个对象，放在最后一个参数，布尔值不可以直接作为参数。
``` bash
// bad
function divide(a, b, option = false ) {}
// good
function divide(a, b, { option = false } = {}) {}
```

### 不要在函数体内使用 arguments 变量，使用 rest 运算符（...）代替。
``` bash
// 因为 rest 运算符显式表明你想要获取参数，而且 arguments 是一个类似数组的对象，而 rest 运算符可以提供一个真正的数组。
// bad
function concatenateAll() {
  const args = Array.prototype.slice.call(arguments);
  return args.join('');
}
// good
function concatenateAll(...args) {
  return args.join('');
}
```

### 使用默认值语法设置函数参数的默认值。
``` bash
// bad
function handleThings(opts) {
  opts = opts || {};
}
// good
function handleThings(opts = {}) {
  // ...
}
```

### 注意区分 Object 和 Map，只有模拟现实世界的实体对象时，才使用 Object。
如果只是需要key: value的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制。
``` bash
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
```

### 总是用 Class，取代需要 prototype 的操作。因为 Class 的写法更简洁，更易于理解。
``` bash
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
```

### 使用extends实现继承，因为这样更简单，不会有破坏instanceof运算的危险
``` bash
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
```

### 首先，Module 语法是 JavaScript 模块的标准写法，坚持使用这种写法。使用import取代require。
``` bash
// bad
const moduleA = require('moduleA');
const func1 = moduleA.func1;
const func2 = moduleA.func2;
// good
import { func1, func2 } from 'moduleA';
```

### 使用export取代module.exports。
``` bash
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
```

### 如果模块只有一个输出值，就使用export default，如果模块有多个输出值，就不使用export default，export default与普通的export不要同时使用。

### 不要在模块输入中使用通配符。因为这样可以确保你的模块之中，有一个默认输出（export default）。
``` bash
// bad
import * as myObject from './importModule';
// good
import myObject from './importModule';
```

### 如果模块默认输出一个函数，函数名的首字母应该小写。
``` bash
function makeStyleGuide() {}
export default makeStyleGuide;
```

### 如果模块默认输出一个对象，对象名的首字母应该大写。
``` bash
const StyleGuide = {
  es6: {
  }
};
export default StyleGuide
```
---------------------------------------------------------------------------

# 平时整理

// http://blog.csdn.net/haoshidai/article/details/52833377
mongod --dbpath "D:\Program Files\MongoDB\data\db" --logpath "D:\Program Files\MongoDB\data\log\mongodb.log" --serviceName "mongodb" --serviceDisplayName "mongodb" --install


传统的编程语言中将表达式参数转换成Thunk函数，Thunk函数在函数调用时调用；JavaScript 语言是传值调用，在 JavaScript 语言中，Thunk 函数替换的不是表达式，而是多参数函数，
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

