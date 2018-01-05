# 前端安全问题主要有XSS、CSRF攻击。
> XSS：跨站脚本攻击，它允许用户将恶意代码植入到提供给其他用户使用的页面中，可以简单的理解为一种javascript代码注入。

XSS的防御措施：
1. 过滤转义输入输出
2. 避免使用eval、new Function等执行字符串的方法，除非确定字符串和用户输入无关
3. 使用cookie的httpOnly属性，加上了这个属性的cookie字段，js是无法进行读写的
4. 使用innerHTML、document.write的时候，如果数据是用户输入的，那么需要对象关键字符进行过滤与转义

> CSRF：跨站请求伪造,其实就是网站中的一些提交行为，被黑客利用，在你访问黑客的网站的时候进行操作，会被操作到其他网站上




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
