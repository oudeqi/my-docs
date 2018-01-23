# 前端安全问题主要有XSS、CSRF攻击。
> XSS：跨站脚本攻击，它允许用户将恶意代码植入到提供给其他用户使用的页面中，可以简单的理解为一种javascript代码注入。

XSS的防御措施：
1. 过滤转义输入输出
2. 避免使用eval、new Function等执行字符串的方法，除非确定字符串和用户输入无关
3. 使用cookie的httpOnly属性，加上了这个属性的cookie字段，js是无法进行读写的
4. 使用innerHTML、document.write的时候，如果数据是用户输入的，那么需要对象关键字符进行过滤与转义

> CSRF：跨站请求伪造,其实就是网站中的一些提交行为，被黑客利用，在你访问黑客的网站的时候进行操作，会被操作到其他网站上

CSRF防御措施：
1. 检测http referer是否是同域名
2. 避免登录的session长时间存储在客户端中
3. 关键请求使用验证码或者token机制

其他的一些攻击方法还有HTTP劫持、界面操作劫持

# 使用箭头函数需要注意的地方
当要求动态上下文的时候，你就不能使用箭头函数，比如：定义方法，用构造器创建对象，处理事件时用 this 获取目标。

# webpack.load的原理
loaders是你用在app源码上的转换元件。他们是用node.js运行的，把源文件作为参数，返回新的资源的函数。

# ES6 let、const
let是更完美的var
1. let声明的变量拥有块级作用域,let声明仍然保留了提升的特性，但不会盲目提升。
2. let声明的全局变量不是全局对象的属性。不可以通过window.变量名的方式访问
3. 形如for (let x…)的循环在每次迭代时都为x创建新的绑定
4. let声明的变量直到控制流到达该变量被定义的代码行时才会被装载，所以在到达之前使用该变量会触发错误。
5. const定义常量值，不可以重新赋值，但是如果值是一个对象，可以改变对象里的属性值

# CSS3 box-sizing的作用
box-sizing属性可以为三个值之一：
1. content-box，默认值，border和padding不计算入width之内
2. padding-box，padding计算入width内
3. border-box，border和padding计算入width之内

#HTML5中有趣的标签（新标签及语义化）
如果代码写的语义化，有利于SEO。搜索引擎就会很容易的读懂该网页要表达的意思。例如文本模块要有大标题，合理利用h1-h6，列表形式的代码使用ul或ol，重要的文字使用strong等等。总之就是要充分利用各种HTML标签完成他们本职的工作

# git命令，如何批量删除分支
``` bash
git branch |grep 'branchName' |xargs git branch -D
```
从分支列表中匹配到指定分支，然后一个一个(分成小块)传递给删除分支的命令，最后进行删除。

# 创建对象的三种方法
1. 第一种方式，字面量
``` bash
var o1 = {name: "o1"}
var o2 = new Object({name: "o2"})
```
2. 第二种方式，通过构造函数
``` bash
var M = function(name){ this.name = name }
var o3 = new M("o3")
```
3. 第三种方式，Object.create
``` bash
var  p = {name: "p"}
var o4 = Object.create(p)
// 新创建的对o4的原型就是p，同时o4也拥有了属性name
```
# JS实现继承的几种方式
1. 借用构造函数实现继承
``` bash
function Parent1(){    
    this.name = "parent1"
}
function Child1(){
    Parent1.call(this);    
    this.type = "child1";
}
// 缺点：Child1无法继承Parent1的原型对象，并没有真正的实现继承（部分继承）
```
2. 借用原型链实现继承
``` bash
function Parent2(){    
    this.name = "parent2";    
    this.play = [1,2,3];
}
function Child2(){    
    this.type = "child2";
}
Child2.prototype = new Parent2();
// 缺点：原型对象的属性是共享的
```
3. 组合式继承
``` bash
function Parent3(){ 
    this.name = "parent3";    
    this.play = [1,2,3];
}
function Child3(){
    Parent3.call(this);    
    this.type = "child3";
}
Child3.prototype = Object.create(Parent3.prototype);
Child3.prototype.constructor = Child3;
```

# 当new Foo()时发生了什么
1. 创建了一个新对象
2. 将this指向这个新对象
3. 执行构造函数里面的代码
4. 返回新对象（this）

# 有哪些性能优化
1. 雪碧图
2. 移动端响应式图片
3. 静态资源CDN
4. 减少Dom操作（事件代理、fragment）
5. 压缩JS和CSS、HTML等
6. DNS预解析

# 浏览器渲染原理
1. HTML被解析成DOM Tree，CSS被解析成CSS Rule Tree
2. 把DOM Tree和CSS Rule Tree经过整合生成Render Tree（布局阶段）
3. 元素按照算出来的规则，把元素放到它该出现的位置，通过显卡画到屏幕上

# 前端路由的原理
1. 什么是路由？简单的说，路由是根据不同的 url 地址展示不同的内容或页面
2. 使用场景？前端路由更多用在单页应用上，也就是SPA, 因为单页应用, 基本上都是前后端分离的, 后端自然也就不会给前端提供路由。
3. 前端的路由和后端的路由在实现技术上不一样，但是原理都是一样的。在 HTML5 的 history API 出现之前，前端的路由都是通过 hash 来实现的，hash 能兼容低版本的浏览器。

# 两种实现前端路由的方式：
1. HTML5 History两个新增的API：history.pushState 和 history.replaceState，两个 API 都会操作浏览器的历史记录，而不会引起页面的刷新。
2. Hash就是url 中看到 # ，我们需要一个根据监听哈希变化触发的事件( hashchange) 事件。我们用 window.location 处理哈希的改变时不会重新渲染页面，而是当作新页面加到历史记录中，这样我们跳转页面就可以在 hashchange 事件中注册 ajax 从而改变页面内容。

# 前端路由的优缺点
1. 优点：从性能和用户体验的层面来比较的话，后端路由每次访问一个新页面的时候都要向服务器发送请求，然后服务器再响应请求，这个过程肯定会有延迟。而前端路由在访问一个新页面的时候仅仅是变换了一下路径而已，没有了网络延迟，对于用户体验来说会有相当大的提升。
2. 缺点：使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存。

# Restful 是什么
Restful的意思就是表现层状态转化。
1. "表现层"其实指的是"资源"（Resources）的"表现层"，把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。
2. 所谓"资源"，就是网络上的一个实体，或者说是网络上的一个具体信息。它可以是一段文本、一张图片、一首歌曲、一种服务，总之就是一个具体的实在，每一个URI代表一种资源。
3. 如果客户端想要操作服务器，必须通过某种手段，让服务器端发生"状态转化"（State Transfer）。而这种转化是建立在表现层之上的，所以就是"表现层状态转化"。
4. Restful就是客户端和服务器之间，传递这种资源的某种表现层
5. 客户端通过四个HTTP动词，对服务器端资源进行操作，实现"表现层状态转化"

# Restful API是什么
Restful API就是符合Restful架构的API设计。  
Restful API一些具体实践：
1. 应该尽量将API部署在专用域名之下。如果确定API很简单，不会有进一步扩展，可以考虑放在主域名下。
2. 应该将API的版本号放入URL。
3. 对于资源的具体操作类型，由HTTP动词表示
4. 如果记录数量很多，服务器不可能都将它们返回给用户。API应该提供参数，过滤返回结果
5. 如果状态码是4xx，就应该向用户返回出错信息。一般来说，返回的信息中将error作为键名

# script标签的defer、async的区别 
1. defer是在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行
2. async是在加载完成后立即执行，如果是多个，执行顺序和加载顺序无关

# 什么是同源策略？
限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。一个源指的是主机名、协议和端口号的组合，必须相同。

# 跨域通信的几种方式
1. JSONP
2. Hash
3. postMessage
4. WebSocket
5. CORS

# JSONP原理
基本原理：利用script标签的异步加载特性实现。给服务端传一个回调函数，服务器返回一个传递过去的回调函数名称的JS代码

# 如何进行错误监控
1. 前端错误的分类：即时运行错误（代码错误）、资源加载错误
2. 即时运行错误的捕获方式：try...catch、window.onerror；
3. 资源加载错误：object.onerror（如img,script）、performance.getEntries()、Error事件捕获

# 跨域的js运行错误，错误提示什么，应该怎么处理？
Script error
1.在script标签增加crossorigin属性
2.设置js资源响应头Access-Control-Allow-Orgin:*

# DOM事件类
一. DOM事件的级别
1. DOM0，element.onclick = function(){}
2. DOM2，element.addEventListener('click', function(){}, false);
二. DOM事件模型是什么：指的是冒泡和捕获  
三. DOM事件流是什么：捕获阶段 -> 目标阶段 -> 冒泡阶段
四. 描述DOM事件捕获的具体流程
window --> document --> documentElement(html标签) --> body --> .... --> 目标对象
五. Event对象常见应用
1. event.preventDefault()，阻止默认行为
2. event.stopPropagation()，阻止事件冒泡
3. event.stopImmediatePropagation(),阻止剩余的事件处理函数执行并且防止事件冒泡到DOM树上，这个方法不接受任何参数。
4. event.currentTarget，返回绑定事件的元素
5. event.target，返回触发事件的元素

# 如何自定义事件
Event，不能传递参数
``` bash
var eve = new Event('自定义事件名'); 
ev.addEventListener('自定义事件名', function(){
    console.log('自定义事件')
}); 
ev.dispatchEvent(eve);
```

# 本地起了一个http server，为什么只在局域网访问？
你没有公网IP当然就不能被外网访问了。常见的WIFI情况下，一般的ip会是~192.168.0.x·这样的，只是对局域网(同WIFI下)可见，但是外网是访问不了的。

# 如何写出高性能DOM？
## 为什么要写高性能DOM？
一个网站，在页面上承载最多内容的就是DOM，而且无论是我们通过加载JS、加载图片，他们也是通过写HTML标签来实现的。而我们性能优化要做的无非就是几大块：
1. 站点的网络消耗
2. DOM的初始化过程（浏览器）
3. DOM的结构以及动态操作（人为）
4. JS执行过程（浏览器）
5. JS逻辑组织（人为）

1. 站点的网络消耗我们基本上没法控制的，而且网络环境非常复杂，我们作为一个下行的终端实际上选择不了你接触什么样的网络环境的。
2. DOM的初始化过程其实我们也是无法控制的，因为DOM的初始化是跟浏览器里面的DOM解析引擎相关的，它解析快解析慢我们改不了。
3. DOM的结构以及动态操作，这就是我们相关的。一个页面的DOM结构是我们在制作页面的时候自己来下定义的，我们可以做多层嵌套，也可以做底层嵌套，我们可以做绝对定位也可以做相对定位。动态操作就是DOM在运行到一定阶段之后。
4. JS执行过程跟浏览器的内核相关，它的执行快慢我们也无法改变，我们能优化的就是JS逻辑组织部分。

## 回流（Reflow）和重绘（Repaint）
提高高性能DOM就不得不提到回流和重绘，那么什么是回流什么是重绘？ 
1. 回流:对于DOM结构中的各个元素都有自己的盒子模型，这些都需要浏览器根据各种样式（浏览器的、开发人员定义的）来计算并根据计算结果将元素放到它该出现的位置，这个过程称为回流。
2. 重绘:当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，浏览器于是便把这些元素都按照各自的特性绘制了一遍，于是页面的内容出现了，这个过程称之为重绘。

## 什么情况下会触发回流和重绘？
1. DOM元素的添加、修改（内容）、删除（回流+重绘），仅修改DOM元素的字体颜色（只有重绘，因为不需要调整布局），回流一定触发重绘，但是重绘不一定触发回流。
2. 我们知道了触发重绘和回流的触发条件，那我们为什么要避免他们？为什么避免他们高性能DOM就能够写出来呢？

## 如何避免触发回流和重绘
Display的值会影响布局，从而影响整个页面元素的位子发生变化，所以会更改render树的结构，先将元素从document中删除，完成修改后再把元素放回原来的位置，如果需要创建多个DOM节点，可以使用documentFragment创建完后一次性的加入document

# JavaScript 数组去重
数组去重，一般需求是给你一个数组，调用去重方法，返回数值副本，副本中没有重复元素。一般来说，两个元素通过 === 比较返回 true 的视为相同元素，需要去重，所以，1 和 "1" 是不同的元素，1 和 new Number(1) 是不同的元素，{} 和 {} 是不同的元素（引用不同）。（当然如果需求认为 {} 和 {} 算作相同的元素，那么解法就不一样了）
1. 我们可以得到 O(n^2) 复杂度的解法。定义一个变量数组 res 保存结果，遍历需要去重的数组，如果该元素已经存在在 res 中了，则说明是重复的元素，如果没有，则放入 res 中。
``` bash
function unique(a) {
    var res = [];
    for (var i = 0, len = a.length; i < len; i++) {
        var item = a[i];
        for (var j = 0, jLen = res.length; j < jLen; j++) {
            if (res[j] === item)
            break;
        }
        if (j === jLen)
        res.push(item);
    }
    return res;
}
var a = [1, 1, '1', '2', 1];
var ans = unique(a);
console.log(ans); // => [1, "1", "2"]
```
如果不考虑浏览器兼容，我们可以用 ES5 提供的 Array.prototype.indexOf 方法来简化代码。
``` bash
function unique(a) {
    var res = [];
    for (var i = 0, len = a.length; i < len; i++) {
        var item = a[i];
        (res.indexOf(item) === -1) && res.push(item);
    }
    return res;
}
var a = [1, 1, '1', '2', 1];
var ans = unique(a);
console.log(ans); // => [1, "1", "2"]
```
既然用了 indexOf，那么不妨再加上 filter。
``` bash
function unique(a) {
    var res = a.filter(function(item, index, array) {
        return array.indexOf(item) === index;
    });
    return res;
} 
var a = [1, 1, '1', '2', 1];
var ans = unique(a);
console.log(ans); // => [1, "1", "2"]
```
2. 法一是将原数组中的元素和结果数组中的元素一一比较，我们可以换个思路，将原数组中重复元素的最后一个元素放入结果数组中。
``` bash
function unique(a) {
    var res = [];
    for (var i = 0, len = a.length; i < len; i++) {
        for (var j = i + 1; j < len; j++) {
            // 这一步十分巧妙
            // 如果发现相同元素
            // 则 i 自增进入下一个循环比较
            if (a[i] === a[j])
            j = ++i;
        }
        res.push(a[i]);
    }
    return res;
}
var a = [1, 1, '1', '2', 1];
var ans = unique(a);
console.log(ans); // => ["1", "2", 1]
// 虽然复杂度还是 O(n^2)，但是可以看到结果不同，1 出现在了数组最后面，因为结果数组取的是元素最后一次出现的位置。
```
3. 如果笔试面试时只答出了上面这样 O(n^2) 的方案，可能还不能使面试官满意，下面就来说几种进阶方案。
将数组用 sort 排序后，理论上相同的元素会被放在相邻的位置，那么比较前后位置的元素就可以了。
``` bash
function unique(a) {
    return a.concat().sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}
var a = [1, 1, 3, 2, 1, 2, 4];
var ans = unique(a);
console.log(ans); // => [1, 2, 3, 4]
```
但是问题又来了，1 和 "1" 会被排在一起，不同的 Object 会被排在一起，因为它们 toString() 的结果相同，所以会出现这样的错误：
``` bash
var a = [1, 1, 3, 2, 1, 2, 4, '1'];
var ans = unique(a);
console.log(ans); // => [1, 2, 3, 4]
// 当然你完全可以针对数组中可能出现的不同类型，来写这个比较函数。不过这似乎有点麻烦。
```
4. 用 JavaScript 中的 Object 对象来当做哈希表，这也是几年前笔试时的解法，跟 sort 一样，可以去重完全由 Number 基本类型组成的数组。
``` bash
function unique(a) {
    var seen = {};
    return a.filter(function(item) {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
}
var a = [1, 1, 3, 2, 1, 2, 4];
var ans = unique(a);
console.log(ans); // => [1, 3, 2, 4]
```
还是和方法三一样的问题，因为 Object 的 key 值都是 String 类型，所以对于 1 和 "1" 无法分别，我们可以稍微改进下，将类型也存入 key 中。
``` bash
function unique(a) {
    var ret = [];
    var hash = {};
    for (var i = 0, len = a.length; i < len; i++) {
        var item = a[i];
        var key = typeof(item) + item;
        if (hash[key] !== 1) {
            ret.push(item);
            hash[key] = 1;
        }
    }
    return ret;
}
var a = [1, 1, 3, 2, '4', 1, 2, 4, '1'];
var ans = unique(a);
console.log(ans); // => [1, 3, 2, "4", 4, "1"]
```
虽然解决了讨厌的 1 和 "1" 的问题，但是还有别的问题！
``` bash
var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, String]
// 但是如果数组元素全部是基础类型的 Number 值，键值对法应该是最高效的！
```

5. ES6 部署了 Set 以及 Array.from 方法，太强大了！如果浏览器支持，完全可以这样：
``` bash
function unique(a) {
    return Array.from(new Set(a));
}
var a = [{name: "hanzichi"}, {age: 30}, new String(1), new Number(1)];
var ans = unique(a);
console.log(ans); // => [Object, Object, String, Number]
```
6. 最后来看看 underscore 对此的实现方式，underscore 将此封装到了 _.unique 方法中，调用方式为 _.unique(array, [isSorted], [iteratee])。其中第一个参数是必须的，是需要去重的数组，第二个参数可选，如果数组有序，则可以传入布尔值 true，第三个参数可选，如果需要对数组迭代的结果去重，则可以传入一个迭代函数。而数组元素去重是基于 === 运算符的。
``` bash
for (var i = 0, length = getLength(array); i  length; i++) {
    var value = array[i],
    // 如果指定了迭代函数
    // 则对数组每一个元素进行迭代
    computed = iteratee ? iteratee(value, i, array) : value;

    // 如果是有序数组，则当前元素只需跟上一个元素对比即可
    // 用 seen 变量保存上一个元素
    if (isSorted) {
        // 如果 i === 0，则直接 push
        // 否则比较当前元素是否和前一个元素相等
        if (!i || seen !== computed) result.push(value);
        // seen 保存当前元素，供下一次对比
        seen = computed;
    } else if (iteratee) {
        // 如果 seen[] 中没有 computed 这个元素值
        if (!_.contains(seen, computed)) {
            seen.push(computed);
            result.push(value);
        }
    } else if (!_.contains(result, value)) {  
        // 如果不用经过迭代函数计算，也就不用 seen[] 变量了
        result.push(value);
    }
}
```
外面的循环遍历数组元素，对于每个元素，如果数组有序，则和前一个元素比较，如果相同，则已经出现过，不加入到结果数组中，否则则加入。而如果有迭代函数，则计算传入迭代函数后的值，对值去重，调用 .contains 方法，而该方法的核心就是调用 .indexOf 方法，和我们上面说的方法一异曲同工。

# 深拷贝与浅拷贝是什么
浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。
1. 实现浅拷贝
``` bash
var obj1 = { a: 10, b: 20, c: 30 }; 
var obj2 = obj1; 
obj2.b = 100; 
console.log(obj1); 
// { a: 10, b: 100, c: 30 } <-- b 被改到了 
console.log(obj2); 
// { a: 10, b: 100, c: 30 }
```
2. 实现深拷贝
``` bash
var obj1 = { a: 10, b: 20, c: 30 }; 
var obj2 = { a: obj1.a, b: obj1.b, c: obj1.c }; 
obj2.b = 100; console.log(obj1); // { a: 10, b: 20, c: 30 } <-- b 沒被改到 
console.log(obj2); 
// { a: 10, b: 100, c: 30 }
```

# 代码优化基本方法
减少HTTP请求
1. HTML优化：使用语义化标签、避免重定向、减少iframe，iframe是SEO的大忌，iframe有好处也有弊端
2. CSS优化：布局代码写前面、删除空样式、不滥用浮动，字体，需要加载的网络字体根据网站需求再添加、选择器性能优化、避免使用表达式，避免用id写样式
3. js优化：压缩、减少重复代码
4. 图片优化：使用WebP、图片合并，CSS sprite技术
5. 减少DOM操作：缓存已经访问过的元素、"离线"更新节点, 再将它们添加到树中、避免使用 JavaScript 输出页面布局--应该是 CSS 的事儿
6. 使用JSON格式来进行数据交换、使用CDN加速、使用HTTP缓存：添加 Expires 或 Cache-Control 信息头、使用DNS预解析
Chrome内置了DNS Prefetching技术, Firefox 3.5 也引入了这一特性，由于Chrome和Firefox 3.5本身对DNS预解析做了相应优化设置，所以设置DNS预解析的不良影响之一就是可能会降低Google Chrome浏览器及火狐Firefox 3.5浏览器的用户体验。

# 预解析的实现：
1. 用meta信息来告知浏览器, 当前页面要做DNS预解析:
``` bash
<meta http-equiv="x-dns-prefetch-control" content="on" />
```
2. 在页面header中使用link标签来强制对DNS预解析: 
``` bash
<link rel="dns-prefetch" href="http://bdimg.share.baidu.com" />
```

# HTTPS的握手过程
1. 浏览器将自己支持的一套加密规则发送给服务器。
2. 服务器从中选出一组加密算法与HASH算法，并将自己的身份信息以证书的形式发回给浏览器。证书里面包含了网站地址，加密公钥，以及证书的颁发机构等信息。
3. 浏览器获得网站证书之后浏览器要做以下工作：
验证证书的合法;
如果证书受信任，或者是用户接受了不受信的证书，浏览器会生成一串随机数的密码，并用证书中提供的公钥加密;
使用约定好的HASH算法计算握手消息，并使用生成的随机数对消息进行加密，最后将之前生成的所有信息发送给服务器
4. 网站接收浏览器发来的数据之后要做以下的操作：
使用自己的私钥将信息解密取出密码，使用密码解密浏览器发来的握手消息，并验证HASH是否与浏览器发来的一致;
使用密码加密一段握手消息，发送给浏览器。
5. 浏览器解密并计算握手消息的HASH，如果与服务端发来的HASH一致，此时握手过程结束，之后所有的通信数据将由之前浏览器生成的随机密码并利用对称加密算法进行加密。

# BFC相关问题
BFC(Block formatting context)直译为"块级格式化上下文"。它是一个独立的渲染区域，只有 Block-level box 参 与， 它规定了内部的 Block-level Box 如何布局，并且与这个区域外部毫不相干。
## BFC的渲染规则
1. BFC这个元素的垂直方向的边距会发生重叠
2. BFC的区域不会与浮动元素的box重叠（清除浮动原理）
3. BFC在页面上是一个独立的容器，外面的元素不会影响它里面的元素，反过来它里面的元素也不会影响外面的元素
4. 计算BFC的高度的时候，浮动元素也会参与计算

## 如何创建BFC？
1. overflow属性不为visible
2. float属性不为none
3. position属性为absolute或fixed
4. display属性为inline-block、table-cell、table-caption、flex、inline-flex

## BFC的使用场景
他的很常用的一个应用场景就是解决边距重叠的问题.

# 响应式图片
1. JS或者服务端硬编码，resize事件，判断屏幕大小加载不同的图片
2. img srcset 方法
3. picture标签 -> source
4. svg
5. 第三方库polyfill

# 判断一个变量是否是数组
``` bash
var a = []; 
// 基于instanceof 
a instanceof Array; 
// 基于constructor 
a.constructor === Array; 
// 基于Object.prototype.isPrototypeOf 
Array.prototype.isPrototypeOf(a); 
// 基于getPrototypeOf 
Object.getPrototypeOf(a) === Array.prototype; 
// 基于Object.prototype.toString 
Object.prototype.toString.apply(a) === '[object Array]';
// Array.isArray
Array.isArray([]); // true
```
以上，除了Object.prototype.toString外，其它方法都不能正确判断变量的类型。

# UTF-8和Unicode的区别
1. UTF-8就是在互联网上使用最广的一种unicode的实现方式。
2. Unicode的出现是为了统一地区性文字编码方案，为解决unicode如何在网络上传输的问题，于是面向传输的众多 UTF（UCS Transfer Format）标准出现了，顾名思义，UTF-8就是每次8个位传输数据，而UTF-16就是每次16个位。ASCII --> 地区性编码（GBK） --> Unicode --> UTF-8

------------------------------------------------------

# 去掉数组重复元素
1. 将数组逐个搬到另一个数组中，当遇到重复元素时，不移动，若元素不重复则移动到新数组中
``` bash
function unique(arr){
	var len = arr.length;
	var result = []
	for(var i=0; i<len; i++){
		var flag = true;
		for(var j = i; j<arr.length-1; j++){
			if(arr[i] == arr[j+1]){
				flag = false;
				break;
			}
		}
		if(flag){
			result.push(arr[i])
		}
	}
	return result;
}
```

2. 遍历数组arr，把元素分别放入另一个数组result中，判断arr中的元素在result中是否存在，不存在即加入temp中
``` bash
function unique(arr){
	var result = [];
	for(var i=0; i<arr.length; i++){
		if(result.indexOf(arr[i]) == -1){
			result.push(arr[i])
		}
	}
	return result;
}
```

3. 将数组的值作为对象的属性，通过对象的属性值来判断数组是否重复，若该项不重复则给对象对应属性值赋为true,便于之后的判断，并将数据项加入结果集中
``` bash
function unique(arr) {
	var result = [];
	var obj = {};
	for(var i=0; i<arr.length; i++){
		if(!obj[arr[i]]){
			result.push(arr[i]);
			obj[arr[i]] = true;
		}
	}
	return result;
}
```

4. 将数组的值赋给另一个数组的键，此时重复的元素都被删除，然后取新数组的键作为去重后的结果
``` bash
function unique(arr){
	var result = []
	var temp = []
	for(var i in arr){
		temp[arr[i]] = 1;
	}
	for(var i in temp){
		result.push(i)
	}
	return result;
}
```

# 跨域解决方法
1. 动态创建script,因为script标签不受同源策略的限制
``` bash
function loadScript(url, func) {
	var head = document.head || document.getElementByTagName('head')[0];
	var script = document.createElement('script');
	script.src = url;
	script.onload = script.onreadystatechange = function(){
		if(!this.readyState || this.readyState=='loaded' || this.readyState=='complete'){
			func();
			script.onload = script.onreadystatechange = null;
		}
	};
	head.insertBefore(script, 0);
}
loadScript('http://suggestion.baidu.com/su?wd=w', function(){
	console.log('loaded')
});
```

2. postMessage（HTML5中的XMLHttpRequest Level 2中的API）
``` bash
// a.com/index.html中的代码
<iframe id="ifr" src="b.com/index.html"></iframe>
<script type="text/javascript">
window.onload = function() {
    var ifr = document.getElementById('ifr');
    var targetOrigin = 'http://b.com';  // 若写成'http://b.com/c/proxy.html'效果一样
                                        // 若写成'http://c.com'就不会执行postMessage了
    ifr.contentWindow.postMessage('I was there!', targetOrigin);
};
</script>
// b.com/index.html中的代码
<script type="text/javascript">
    window.addEventListener('message', function(event){
        // 通过origin属性判断消息来源地址
        if (event.origin == 'http://a.com') {
            alert(event.data);    // 弹出"I was there!"
            alert(event.source);  // 对a.com、index.html中window对象的引用
                                  // 但由于同源策略，这里event.source不可以访问window对象
        }
    }, false);
</script>
```

3. JSONP
``` bash
function handleResponse(response){
    console.log('The responsed data is: '+response.data);
}
var script = document.createElement('script');
script.src = 'http://www.baidu.com/json/?callback=handleResponse';
document.body.insertBefore(script, document.body.firstChild);
/*handleResonse({"data": "zhe"})*/
//原理如下：
//当我们通过script标签请求时
//后台就会根据相应的参数(json,handleResponse)
//来生成相应的json数据(handleResponse({"data": "zhe"}))
//最后这个返回的json数据(代码)就会被放在当前js文件中被执行
//至此跨域通信完成
```

3. web sockets
> web sockets 的目标是在一个单独的持久连接上提供全双工、双向通信。(同源策略对web sockets不适用)
``` bash
// 只有在支持web socket协议的服务器上才能正常工作
var socket = new WebSockt('ws://www.baidu.com');
socket.send('hello WebSockt');
socket.onmessage = function(event){
    var data = event.data;
}
```

4. CORS (跨域资源共享)
> CORS是由W3C制定的跨站资源分享标准，可以让AJAX实现跨域访问。
``` bash
res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json;charset=utf-8"
});
```

# AJAX
``` bash
function loadXMLDoc(){
	var xmlhttp;
	if (window.XMLHttpRequest) {
		//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
		xmlhttp=new XMLHttpRequest();
	} else {
		// IE6, IE5 浏览器执行代码
		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
		}
	}
	xmlhttp.open("GET","/try/ajax/ajax_info.txt",true);
	xmlhttp.send();
}
```

# js-对象深度克隆方法
1. 序列化对象
``` bash
function cloneObj(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //序列化对象
        newobj = JSON.parse(str); //还原
    } else {//如果不支持以上方法
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
```

2. 递归
``` bash
function clone(Obj) {
    var buf;   
    if (Obj instanceof Array) {
        buf = [];  // 创建一个空的数组
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i]);
        }
        return buf;
    } else if (Obj instanceof Object){
        buf = {};  // 创建一个空对象
        for (var k in Obj) {  // 为这个对象添加新的属性
            buf[k] = clone(Obj[k]);
        }
        return buf;
    }else{
        return Obj;
    }
}
```

# 常用那几种浏览器测试？有哪些内核(Layout Engine)?
1. 浏览器：IE，Chrome，FireFox，Safari，Opera。
2. 内核：Trident，Gecko，Presto，Webkit。

# 行内元素和块级元素的区别？行内块元素的兼容性使用？（IE8 以下）
1. 行内元素：会在水平方向排列，不能包含块级元素，width、height无效，margin、padding上下无效。块级元素：各占据一行，垂直方向排列。
2. 兼容性：display:inline-block;*display:inline;*zoom:1;

# 清除浮动有哪些方式？比较好的方式是哪一种
1. 结尾处加空div标签clear:both。
2. 父级div定义伪类:after和zoom。
3. 父级div定义overflow:hidden/auto。
4. 父级div也浮动，需要定义宽度。
5. 父级div定义display:table

# box-sizing常用的属性有哪些？分别有什么作用？
1. box-sizing: content-box|border-box|inherit;
2. content-box:在设置的宽度和高度之**外**绘制元素的内边距和边框
3. border-box:在设置的宽度和高度之**内**绘制元素的内边距和边框

# Doctype作用？标准模式与兼容模式各有什么区别
1. <!DOCTYPE>告知浏览器的解析器用什么文档标准解析这个文档。DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现
2. 标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容的方式显示,模拟老式浏览器的行为

# HTML5 为什么只需要写 <!DOCTYPE HTML>
1. HTML5不基于 SGML，因此不需要对DTD进行引用，但是需要doctype来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。
2. 而HTML4.01基于SGML,所以需要对DTD进行引用，才能告知浏览器文档所使用的文档类型。

# 页面导入样式时，使用link和@import有什么区别
1. link属于XHTML标签，除了加载CSS外，还能用于定义RSS，定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;
2. 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;

# 介绍一下你对浏览器内核的理解
1. 主要分成两部分：渲染引擎、JS引擎。
2. 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。
3. JS引擎则：解析和执行javascript来实现网页的动态效果

# html5有哪些新特性？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
1. 新的功能API：canvas、video、audio、localStorage、sessionStorage 
2. 语意化更好的内容元素：article、footer、header、nav、section;
3. 表单控件：calendar、date、time、email、url、search;
4. 新的技术：webworker、websocket、Geolocation;
5. IE8/IE7/IE6支持通过document.createElement方法产生的标签，可以利用这一特性让这些浏览器支持HTML5新标签，浏览器支持新标签后，还需要添加标签默认的样式。当然也可以直接使用成熟的框架、比如html5shim;

# 简述一下你对HTML语义化的理解？
1. 用正确的标签做正确的事情。
2. html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
3. 即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;

# 介绍js的基本数据类型
Undefined、Null、Boolean、Number、String

# js有哪些内置对象
1. 数据封装类对象：Object、Array、Boolean、Number、String
2. 其他对象：Function、Arguments、Math、Date、RegExp、Error

# this对象的理解
1. this总是指向函数的直接调用者（而非间接调用者）
2. 如果有new关键字，this指向new出来的那个对象
3. 在事件中，this指向触发这个事件的对象。特殊情况：IE中的attachEvent中的this总是指向全局对象Window

# eval是做什么的
1. 它的功能是把对应的JS字符串解析成JS代码并运行
2. 应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）
3. 由JSON字符串转换为JSON对象的时候可以用eval，var obj =eval('('+ str +')');

# DOM怎样添加、移除、移动、复制、创建和查找节点
``` bash
// 创建新节点
createDocumentFragment()    //创建一个DOM片段
createElement()   //创建一个具体的元素
createTextNode()   //创建一个文本节点
// 添加、移除、替换、插入
appendChild()
removeChild()
replaceChild()
insertBefore() //在已有的子节点前插入一个新的子节点
// 查找
getElementsByTagName()    //通过标签名称
getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
getElementById()    //通过元素Id，唯一性
```

# null 和 undefined 的区别
1. 换成对象都会报错
2. null 转为数值时为0；undefined 转为数值时为NaN。
3. 变量被声明了，但没有赋值时，就等于undefined
4. 调用函数时，应该提供的参数没有提供，该参数等于undefined。
5. 函数没有返回值时，默认返回undefined。
6. 作为对象原型链的终点

# new操作符具体干了什么呢
1. 创建一个空对象，并且继承该函数的原型
2. this 变量引用该对象，属性和方法被加入到 this 引用的对象中。
3. 隐式的返回 this 

# JSON 的了解
JSON是一种轻量级的数据交换格式。它是JavaScript的一个子集，数据格式简单，易于读写，占用带宽小。

# call()、apply()、bind()的区别和作用
1. apply() 函数有两个参数：第一个参数是上下文，第二个参数是参数组成的数组
2. call() 的第一个参数是上下文，后续是实例传入的参数序列
3. bind() 一个函数调用bind，会返回另一个函数，这个函数的上下文被绑定到bind()调用时传递的参数上

# HTTP状态码知道哪些
1. 100：Continue 继续，一般发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后再发送具体参数信息
2. 200：OK 正常返回信息
3. 302：Found 临时性重定向。
4. 304：Not Modified 自从上次请求后，请求的网页未修改过。
5. 400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
6. 401 Unauthorized 请求未授权。
7. 403 Forbidden 禁止访问。
8. 404 Not Found 找不到与URI相匹配的资源。
9. 500 Internal Server Error 最常见的服务器端错误。
10. 503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。

# 你有哪些性能优化的方法
1. 减少http请求次数：CSS Sprites, JS、CSS源码合并
2. 减少数据传输：JS、CSS源码压缩、图片大小控制合适、网页Gzip，
3. 利用缓存：CDN托管、过期时间、data缓存、图片服务器。
4. 编码：减少dom操作、优化javascript性能、将样式表放在顶部，将脚本放在底部、预加载资源、设置className而不是直接操作style、缓存DOM节点查找的结果，减少IO读取操作

# 什么叫优雅降级和渐进增强
1. 优雅降级：Web站点在所有新式浏览器中都能很好的工作，为那些无法支持功能的旧的浏览器增加候选方案，使之在旧式浏览器上以某种形式，降级体验却不至于完全失效
2. 渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能,向页面增加无害于基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。

# 哪些常见操作会造成内存泄漏
1. 内存泄漏：任何对象在不需要他时，它仍然存在。
2. 垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0，那么该对象的内存即可回收。
3. 闭包、两个对象彼此引用且彼此保留时、控制台日志、setTimeout的第一个参数使用字符串而非函数

# 线程与进程的区别
1. 一个程序至少有一个进程,一个进程至少有一个线程
2. 进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率
3. 线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制
4. 多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配

# cookies，sessionStorage 和 localStorage 的区别
1. cookie是网站为了标示用户身份而储存在用户本地终端上的数据（通常经过加密）
2. cookie数据始终在同源的http请求中携带（即使不需要），会在浏览器和服务器间来回传递
3. sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存
4. cookie数据大小不能超过4k，sessionStorage和localStorage比cookie大得多，可以达到5M或更大
5. localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据
6. sessionStorage 数据在当前浏览器窗口关闭后自动删除
7. cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

# iframe有那些缺点
1. 搜索引擎的检索程序无法解读这种页面，不利于SEO
2. iframe会阻塞主页面的Onload事件
3. iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载
4. 最好是通过javascript动态给iframe添加src属性值，这样可以绕开2、3两个问题

# 两种Web Worker
1. 专用线程dedicated web worker，随当前页面的关闭而结束，只能被创建它的页面访问
2. 共享线程shared web worker，可以被与之相关联的多个页面访问，所有关联的的页面都关闭的时候才会结束
3. “Work”类型代表Dedicated web worker，而“SharedWorker”类型代表Shared web worker。

# 如何实现浏览器内多个标签页之间的通信
WebSocket、SharedWorker、localstorge、cookies

# 如何在页面上实现一个圆形的可点击区域
1. map+area或者svg
2. border-radius
3. 纯js实现求一个点在不在圆上、获取鼠标坐标等等

# 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的
1. 有两种：IE 盒子模型、W3C盒子模型。
2. 盒模型：内容(content)、填充(padding)、边界(margin)、 边框(border)
3. 区别： IE的content部分把 border 和 padding计算了进去

# CSS优先级算法如何计算
1. 权重大者为准
2. 同权重情况下样式定义最近者为准
3. 同一样式规则内后者覆盖前者;
4. 权重: !important > style >  id > class > tag

# 为什么要使用CSS sprites
CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background-position”的组合进行背景定位，这样可以减少很多图片请求的开销，因为请求耗时比较长；请求虽然可以并发，但是如果请求太多会给服务器增加很大的压力。

# display:none 和 visibility:hidden的区别
1. display:none 在文档布局中不再给它分配空间，它各边的元素会合拢，就当他从来不存在。
2. visibility:hidden 隐藏对应的元素，但是在文档布局中仍保留原来的空间。

# position的absolute与fixed区别
1. absolute浮动定位是相对于父级中设置position为relative或者absolute最近的父级元素
2. fixed浮动定位是相对于浏览器视窗的

# IE8以下版本的浏览器中的盒模型有什么不同
E8以下浏览器的盒模型中定义的元素的宽高不包括内边距和边框

# js操作获取和设置cookie
``` bash
//创建cookie
function setCookie(name, value, expires, path, domain, secure) {
    var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires instanceof Date) {
        cookieText += '; expires=' + expires;
    }
    if (path) {
        cookieText += '; expires=' + expires;
    }
    if (domain) {
        cookieText += '; domain=' + domain;
    }
    if (secure) {
        cookieText += '; secure';
    }
    document.cookie = cookieText;
}
//获取cookie
function getCookie(name) {
    var cookieName = encodeURIComponent(name) + '=';
    var cookieStart = document.cookie.indexOf(cookieName);
    var cookieValue = null;
    if (cookieStart > -1) {
        var cookieEnd = document.cookie.indexOf(';', cookieStart);
        if (cookieEnd == -1) {
            cookieEnd = document.cookie.length;
        }
        cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    }
    return cookieValue;
}
//删除cookie
function unsetCookie(name) {
    document.cookie = name + "= ; expires=" + new Date(0);
}
```

# ajax 有那些优缺点?如何解决跨域问题
1. 通过异步模式，提升了用户体验
2. 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用
3. Ajax可以实现局部刷新
4. 安全问题 AJAX暴露了与服务器交互的细节
5. 对搜索引擎的支持比较弱
6. 跨域：jsonp、iframe、window.name、window.postMessage、服务器上设置代理页面

# JavaScript原型，原型链?有什么特点
1. 原型对象也是普通的对象，是对象一个自带隐式的 __proto__ 属性
2. 原型也有可能有自己的原型，如果一个原型对象的原型不为null的话，我们就称之为原型链
3. 原型链是由一些用来继承和共享属性的对象链

# GET和POST的区别，何时使用POST
1. GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符
2. POST：一般用于修改服务器上的资源，对所发送的信息没有限制。
3. Get是通过地址栏来传值，而Post是通过请求体来传值。
4. 向服务器发送大量数据使用post（POST 没有数据量限制）
5. 发送包含未知字符的用户输入时，POST 比 GET 更可靠

# 解释一下 JavaScript 的同源策略 
1. 概念:同源策略是客户端脚本的重要的安全度量标准。目的是防止某个文档或脚本从多个不同源装载。
2. 同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议
3. 指一段脚本只能读取，来自同一来源的窗口和文档的属性

# 为什么要有同源限制
比如一个黑客程序，他利用Iframe把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过Javascript读取到你的表单中input中的内容，这样用户名，密码就轻松到手了

# Flash、Ajax各自的优缺点，在使用中如何取舍
1. Flash适合处理多媒体、矢量图形、访问机器；对CSS、处理文本上不足，不容易被搜索
2. Ajax对CSS、文本支持很好，支持搜索；多媒体、矢量图形、机器访问不足
3. 共同点：与服务器的无刷新传递消息、用户离线和在线状态、操作DOM

# 什么是闭包
1. 一个闭包就是当一个函数调用返回时，一个没有释放资源的栈区
2. Javascript允许使用内部函数，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数，当这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包

# javascript里面的继承怎么实现，如何避免原型链上面的对象共享
用构造函数和原型链的混合模式去实现继承，避免对象共享可以参考经典的extend()函数，很多前端框架都有封装的，就是用一个空函数当做中间变量

# 一个页面从输入URL到页面加载显示完成，这个过程中都发生了什么
1. 查找浏览器缓存
2. DNS解析、查找该域名对应的IP地址
3. 进行HTTP协议会话
4. 客户端发送报头(请求报头)
5. 服务器回馈报头(响应报头)
6. html文档开始下载
7. 渲染、解析
