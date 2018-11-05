
# TODO

1. 无交互UI组件：栅格、按钮
2. 交互UI组件：element.alert、element.tab
3. 无UI交互组件：tab
4. 封装常用函数：获取、设置原素样式
5. 弹出层如果传递了关闭按钮的回调，则会禁止点击该按钮关闭
6. 不依赖于UI的组件，不依赖状态的组件
7. 分页插件
8. 表单验证
9. 文件上传
10. 进度条：element.progress
11. 预加载，懒加载
12. countdown
13. timeAgo
14. tree
15. treeTable

# 组件的作用
1. 分离代码（在普通的项目中更能体现）
2. 代码复用（除了普通的项目常见，在封装开源组件时更能体现）

# 对组建的思考
1. 组建内部私有为state
2. 单项数据流从父到子，父级提供给子组件的数据使用props
3. 子到父的通信采用：1自定义事件、2调用父组件传递的函数
4. 非父子组件之间共享状态：Redux 
``` bash
Redux是一种架构模式（Flux 架构的一种变种），
它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。
```

# js异步编程方式
1. 纯粹callback方式：回调地狱、剥夺了retrun能力。
2. promise方式：代码的风格优化、多个异步等待合并、拥有retrun能力。
3. async、await方式：最好的异步编程解决方式
4. promise是对象，可以保存状态：pending、fulfilled、rejected。  
``` bash
promise精髓：  

promise以对象的形式保存了异步调用的结果，而这个对象可以放在任何地方，promise不管有多少层，
每一层只需要把对应的promise返回给上层，不需要附带任何回调函数，直到最外层，
想在promise中取得异步操作的结果时才会使用到回调函数。  

而回调函数的方式：函数不能保存状态，每一层异步调用，
都需要传递回调函数，取得上一次异步调用的结果。
```

# 苹果手机下细字体效果
``` bash
font-family: "PingFangSC-Thin";
// PingFangSC-Thin是苹果系统字体，只在苹果下有效果

```
# iOS - 使用自定义字体-苹方字体 
1. 默认字体：Heiti SC（黑体-简，黑体-简的英文名称为Heiti SC。Heiti为黑体的拼音，SC代表简体中文（Simplified 
  Chinese）），是Mac OS X Snow Leopard（版本10.6）包含的简体中文字型，也是iPhone OS 3.0（版本4.0后改名为iOS）及iPod nano第五代以来的预设简体中文字型。  
2. 苹方字体是ios9上的默认中文字体，它代替了使用多年的华文黑体，新的字体 "苹方" 专为电子显示屏而设计，让简体和繁体中文都格外清晰易读。
  
苹方提供了六个字重，font-family 定义如下
``` bash
// 苹方-简 常规体
font-family: PingFangSC-Regular, sans-serif;
// 苹方-简 极细体
font-family: PingFangSC-Ultralight, sans-serif;
// 苹方-简 细体
font-family: PingFangSC-Light, sans-serif;
// 苹方-简 纤细体
font-family: PingFangSC-Thin, sans-serif;
// 苹方-简 中黑体
font-family: PingFangSC-Medium, sans-serif;
// 苹方-简 中粗体
font-family: PingFangSC-Semibold, sans-serif;
```
苹方-繁 的 CSS font-family 使用：
``` bash
font-family: PingFangTC-Regular, sans-serif;
font-family: PingFangTC-Ultralight, sans-serif;
font-family: PingFangTC-Light, sans-serif;
font-family: PingFangTC-Thin, sans-serif;
font-family: PingFangTC-Medium, sans-serif;
font-family: PingFangTC-Semibold, sans-serif;
```
苹方-港 的 CSS font-family 使用：
``` bash
font-family: PingFangHK-Regular, sans-serif;
font-family: PingFangHK-Ultralight, sans-serif;
font-family: PingFangHK-Light, sans-serif;
font-family: PingFangHK-Thin, sans-serif;
font-family: PingFangHK-Medium, sans-serif;
font-family: PingFangHK-Semibold, sans-serif;
```

# 安卓手机自带的思源字体
1. 2014年7月，Adobe与Google宣布推出一款新的开源字体思源黑体， 有七种字体粗细（ExtraLight、Light、Normal、Regular，Medium、Bold 和 Heavy），
2. 完全支持日文、韩文、繁体中文和简体中文，还包括来自 Source Sans字体家族的拉丁文、希腊文和西里尔文字形。
3. 安卓手机自带的思源黑体字重不全，仅Regular字重一个，
4. 而其他需要显示粗体的地方都是靠渲染Regular这个字重加粗而来，就导致了一个问题：笔画黏连

# html 规范
``` bash
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
    <div id="page_container"></div>
    <div class="page-container js__page_container">
        def
    </div>
    <script type="text/html" id="tpl__page">
        <div>abc</div>
    <script/>
    <script type="text/javascript">
    
        let G_age = 12;
        let G_userName = 'jim';
        
        let $age = 12;
        let $userName_s = 'sam';
        
        let userName_i = 2;
        let userName_s = 'sam';
        let userName_o = {};
        let userName_a = [];
        let userName_b = true;
        let userName_$ = $('.js__page');
        
    </script>
</body>
</html>
、、、、、、、、、、、、、、、、
面向对象
代码规范、命名规范：js css html
编程模式：装饰者模式、观察者模式
封装纯函数（便于测试、调试）：结果只收到参数的影响、不会对函数以外的数据造成影响
能用同步的不要使用异步：异步代码不利于阅读，异步使得代码操作被分成两段
封装简洁明了的函数：封装函数的原则，不是按代码量的多少，而是封装后函数能更简洁的描述多条代码语句的作用。

为什么要煞费苦心地构建纯函数？
因为纯函数非常“靠谱”，
执行一个纯函数你不用担心它会干什么坏事，它不会产生不可预料的行为，也不会对外部产生影响。
不管何时何地，你给它什么它就会乖乖地吐出什么。
如果你的应用程序大多数函数都是由纯函数组成，那么你的程序测试、调试起来会非常方便。
```
1. id使用下划线`_`做字符串连接，如果是模板原素要加`tpl__`前缀。如：`#page_container`,`#tpl__page_container`
2. 给样式使用的class使用中横线`-`做字符串连接。如：`.page-container`
3. 给js使用的class使用下划线`_`做字符串连接，并且要加`js__`前缀。如：`.js__page_container`
4. js中的全局变量表示'$'。如：`let $userName = 'jim'`
5. js中的数据类型表示，如果需要的话。如：`let userName_s = 'sam'`、`let $userName_$ = $('.js__page')`
6. 类的私有变量、私有函数前面加前缀`_`。如：`_userName = 'jim';_isYoung = function () {}`
7. 封装函数的原则，不是按代码量的多少，而是封装后函数能更简洁的描述*多条代码语句*的作用。

# `<script>`标签放在`<body>`标签的外部的后面产生的坑
如果`<script>`标签写在`<body>`标签的后面，浏览器在解析的时候会把`<script>`标签的内容放到`<body>`标签里面最后去
``` bash
<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

</body>
<script type="text/javascript">
    console.log('abc')
</script>
</html>

// 如上的代码，在浏览器解析的时候，会变成下面这样

<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>

<script type="text/javascript">
    console.log('abc')
</script>
</body>
</html>

// 这就会造成一个问题：
// 如果使用过 $('body').html('')设置body的内容，
// 设置之后 所有body内的script都会找不到，就可能会发生意想不到的错误。

// 解决办法：
// 不要使用$('body').html('')设置body的内容，使用替换方式 $('body>#page_container').html('')
// 并且，为了规范script标签写在body内部的后面。
```

# `location.href`页面跳转 与 `a`超链接跳转 的兼容问题
``` bash
// 部分设备，页面跳转后，再返回 页面不刷新问题
// 解决办法：更改跳转方式
$.href = function(url, no_history) {
    if(no_history) {
        location.replace(url);
        return;
    }
    window.history.pushState("", "", url);
    window.history.forward(1);
    location.reload();
};

$(window).on("popstate", function() {
    if($._loction != $.getUrl()) { // $._loction 当前页面全局保存的 loction // $.getUrl 部分保存快照的设备，获取当前的url
        location.reload();
    }
});
```
# 封装数据访问的函数
1. 让api变得简洁
2. 采用公共配置，并且该配置，能在使用的时候被改写，或者扩展
3. 回调函数除了要提取出所有请求要执行的操作，还要暴露出具体业务逻辑部分
``` bash
var utils = {
    get: function (url, params, success, error) {
        $.get(url + '?' + $.param(params), function(data, textStatus){
            if(data.success) {
                success(data); //具体业务逻辑部分
            } else {
                if (data.code === 'authFail') {
                    commom.toast("登录超时，请重新登录！"); // 公共操作
                    location.href = "/view/login"; // 公共操作
                } else {
                    success(data); //具体业务逻辑部分
                }
            }
        }, function (err) {
            commom.toast("网络异常");  // 公共操作
            if (typeof error == 'function') {
                error(err); //具体业务逻辑部分
            }
        });
    }
}
utils.get('/abc/500', {a:1, b: 2}, function (res) {
    if (res.success) {
        $('div').text(res.data);
    } else {
        $('div').text('');
    }
}, function (err) {
    $('err').text(err);
})
```

# 关于javascript中的分号
1. 函数申明式、代码块 ==》后面不用加分号
2. 函数表达式、变量申明、函数调用 不是代码块或者函数内的最后一行 ==》后面需要加分号
3. 函数表达式、变量申明、函数调用 是代码块或者函数内的最后一行 ==》后面可以不用加分号

# iPhone 手机中横线格式的时间字符串实例化会失败
``` bash
new Date('2018-12-24'); // Invalid Date
new Date('2018-12-24 12:20:20'); // Invalid Date
new Date('2018/12/24'); // 不报错
new Date('2018/12/24 12:20:20'); // 不报错
```

# iPhone手机事件委托不生效，除非在被委托的原素上添加样式`cursor: pointer;`

# 关于 history.back()、history.go()回退但刷新页面无法兼容的问题
1. `window.history.back();` 确实可以做到后退的功能，但是后退的同时，无法刷新后退的页面信息。
2. `document.referrer` 可以取到上一个页面的具体路径
3. `window.location.href = document.referrer;` 实现后退并且刷新
4. `document.referrer` 在很多情况下会丢失，避免使用

# document.referrer 丢失的情况
1. 用户手动输入网址、从收藏夹中访问、鼠标拖拽文档打开窗口 获取不到document.referrer
2. 对https等加密协议是不带Referrer的
3. 跨域
4. 使用修改 Location 进行页面导航的方法，会导致在IE下丢失 referrer
5. Chrome4.0以下，IE 5.5+以下返回空的字符串
6. 使用location.reload()刷新（location.href或者location.replace()刷新有信息）
7. 在微信对话框中，点击进入微信自身浏览器
8. 扫码进入微信或QQ的浏览器
9. 从https的网站直接进入一个http协议的网站（Chrome下亲测）
10. a标签设置rel="noreferrer"（兼容IE7+）`<a href="test.html" target="_blank" rel="noreferrer">点我到test.html</a>`
11. meta标签来控制不让浏览器发送referer`<meta name="referrer" content="never">`
12. 点击 flash 内部链接

# iframe的坏处
- 创建iframe比创建其他 DOM 元素（包括 style 和 script）更消耗性能，iframe过多会导致页面卡顿、内存增长很快
- iframe阻塞主页面加载:window的 onload 事件直到它所包含的所有 iframe，以及所有 iframe中的资源完全加载完成后才会触发。在 Safari和 Chrome 中，用 javascritpt 动态的给 iframe 的 src 赋值可以避免这种阻塞行为。
- 连接池:对每个 web 服务器来说，浏览器在同一时间只打开几个连接数， iframe和主页面共享同一个连接池。这意味着有可能 iframe 中的资源占用了可用连接而阻塞了主页面的资源加载，在通常情况下 iframe 中的内容对页面来说不太重要，iframe 占用连接数是不可取的。一个解决方案是在优先级更高的资源下载完成后再动态的给 iframe 的 src 赋值。
- 在一个网页中加载iFrame的四个方法：普通加载Iframe,在onload以后加载Iframe,Iframe setTimeout 和动态Iframe.每个方法都在IE8测试过，并用瀑布图表示。我推荐动态加载iframe技术因为他的性能比较好
``` bash

1. 普通加载iframe
Iframe在主页面的onload之前加载
iframe会在所有的iframe的内容加载完成后触发iframe的onload事件
iframonload会在iframe onload完成之后再触发，iframe阻塞了主页的加载
当iframe加载期间，一个或多个浏览指示器显示忙表示一些事在加载

<iframe src="/path/to/file" frameborder="0" width="728" height="90" scrolling="auto"></iframe>

2. 在onload之后加载iframe
在主页面的onload事件之后iframe开始加载
主页面的onload事件触发不需要iframe干涉，ifrae不会阻塞主页面加载
当iframe加载时候，一个或更多的浏览器忙标识显示一些内容正在加载
设想你想要加载一些内容在一个iframe，但对于页面不是很重要的，或者不一定要立刻显示iframe内容给用户看，因为隐藏在链接或tab之后下载，可以考虑延迟加载直到主页面加载完后。

function createIframe(){
    var i = document.createElement("iframe");
    i.src = 'path/to/file';
    i.scrolling = "auto";
    i.frameborder = "0";
    i.width = "200px";
    i.height = "100px";
    document.getElementById("div-that-holds-the-iframe").appendChild(i);
};

if (window.addEventListener) {
    window.addEventListener("load", createIframe, false);
} else if (window.attachEvent) {
    window.attachEvent("onload", createIframe);
} else {
    window.onload = createIframe;
}

3. Iframe setTimeout
在 Safari和 Chrome 中，用 javascritpt 动态的给 iframe 的 src 赋值可以避免阻塞主页面加载
document.querySelector('iframe').src = 'path/to/file'

4. 动态Iframe
setTimeout(function () {
    createIframe()
}, 5)

```

# 使用iframe的好处
1. 从其弊中我们可以联想到例外一个html中常用的标签nofollow，既然使用iframe标签可以让蜘蛛对该部分抓取困难，那我们就可以把我们网站的一些需要给用户看的，而不需要给搜索引擎看到的信息使用iframe标签来设计，这样就可以让iframe变废为宝了，而且有代码瘦身的作用，举一个例子，比如一些大型网站首页的备-案信息，荣誉zhengshu，认证等之类的链接，这些我们不需要给搜索引擎看，因为这样稀释了网站首页的权重，我们就可以搭配iframe来使用，（注意不要占用连接池）而且只需要在首页被使用，其他页面可以不需要这些信息，是不是很完美呢。
2. 可以使用iframe来调用广告，这样会避免seo的拒收录的情况；各大门户网站新浪、腾讯、网页、搜狐等等......都用了iframe标签调用广告


# 阻止移动端浏览器点击图片默认放大的几种方法
> 在一些移动端浏览器上，如果点击图片，会产生一个浏览图片的行为(vivo手机微信浏览器网页点击图片，图片会自动放大)
``` bash
// 1. 在img元素上添加 onclick="return false"
<img src="a.png" onclick="return false" />
// 2. 图片用背景图的方式插入
background:url(a.png) norepeat center;
// 3. 使用js事件阻止默认行为的方法，这里需要注意哦
// 关于这里的click事件，其实也可以是touchend事件，不建议使用touchstart和touchmove事件，特殊情况的限制
document.getElementById('banner').addEventListener('click',function(e){
　　e.preventDefault();
});
// 4. 禁止放大效果的同时，禁止长按识别二维码或保存图片
img{ pointer-events: none; }
```
# postcss
> https://www.postcss.parts/
# 选中效果
``` bash
<label class="btn-checkbox">
    <input type="checkbox">
    <span class="icon"></span>
</label>

<style type="text/css">
    /*选中*/
    .btn-checkbox {
        user-select:none;
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
    }
    .btn-checkbox input[type="checkbox"] {
        display: none;
    }
    .btn-checkbox input[type="checkbox"] + .icon {
        cursor: pointer;
        float: left;
        width: 24px;
        height: 24px;
        border: 1px solid #e0e0e0;
        display: inline-flex;
        justify-content: center;
        align-items: center;
    }
    .btn-checkbox input[type="checkbox"]:disabled + .icon {
        cursor: initial;
    }
    .btn-checkbox input[type="checkbox"] + .icon:after {
        content: " ";
        display: block;
        width: 16px;
        height: 16px;
        background-color: #ccc;
    }
    .btn-checkbox input[type="checkbox"]:checked + .icon:after {
        background-color: red;
    }
</style>
```
# 开关效果
``` bash
<!-- 开关一 -->
<label class="btn-switch">
    <input type="checkbox">
    <span class="switch"></span>
</label>

<!-- 开关二 -->
<label class="btn-switch-2">
    <input type="checkbox">
    <span class="switch">
        <span>关</span>
        <span class="icon"></span>
        <span>开</span>
    </span>
</label>

<style type="text/css">
    /*开关一*/
    .btn-switch {
        user-select:none;
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
    }
    .btn-switch .switch {
        display: inline-block;
        float: left;
        width: 60px;
        height: 30px;
        border-radius: 30px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
    }
    .btn-switch .switch:before {
        content: "关";
        display: block;
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        background-color: #ccc;
        text-align: left;
        transition: all .3s ease;
    }
    .btn-switch .switch:after {
        content: " ";
        display: block;
        width: 26px;
        height: 26px;
        background-color: red;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        top: 2px;
        transform: translateX(32px);
        transition: all .3s ease;
    }
    .btn-switch input[type="checkbox"] {
        display: none;
    }
    .btn-switch input[type="checkbox"]:disabled + .switch {
        cursor: initial;
    }
    .btn-switch input[type="checkbox"]:checked + .switch:before {
        content: "开";
        background-color: #ccc;
        text-align: right;
    }
    .btn-switch input[type="checkbox"]:checked + .switch:after {
        transform: translateX(2px);
    }
    /*开关二*/
    .btn-switch-2 {
        user-select:none;
        display: inline-block;
        vertical-align: middle;
        margin: 0;
        padding: 0;
        width: 60px;
        height: 30px;
        border-radius: 30px;
        overflow: hidden;
    }
    .btn-switch-2 .switch {
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        background: #ccc;
        transition: all .3s ease;
        margin-left: 0;
        cursor: pointer;
    }
    .btn-switch-2 .switch span {
        float: left;
        width: 30px;
        height: 30px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
        box-sizing: border-box;
    }
    .btn-switch-2 .switch .icon {
        background: #aaa;
        width: 26px;
        height: 26px;
        border-radius: 50%;
    }
    .btn-switch-2 input[type="checkbox"] {
        display: none;
    }
    .btn-switch-2 input[type="checkbox"]:checked + .switch {
        margin-left: -26px;
        background: purple;
    }
    .btn-switch-2 input[type="checkbox"]:checked + .switch .icon{
        background: red;
    }
</style>
```

-----------------------------------------------------------------------
# 浏览器的缓存机制
> 在产品开发的时候我们总是想办法避免缓存产生，以及新发布版本的时候只缓存未修改的代码，而在生产环境又在想策略管理缓存提升网页的访问速度。

## 浏览器缓存的优点：
1. 减少了冗余的数据传输，节省了网费
2. 减少了服务器的负担，大大提升了网站的性能
3. 加快了客户端加载网页的速度

## 浏览器请求服务器资源的过程：
1. 判断资源是否缓存过：如果没有缓存过，直接发送请求，服务器返回最新资源；如果缓存过，则进一步判断
2. 资源缓存过：判断是否命中强缓存，如果命中强缓存则直接取缓存，不发送请求；否则发送请求，由服务器判断是否命中协商缓存
3. 如果命中协商缓存：返回304，不返回资源，获取浏览器缓存资源；如果没有命中协商缓存，则返回最新资源

## 命中强缓存：
> 浏览器在请求某一资源时，会先获取该资源缓存的header信息，判断是否命中强缓存（cache-control和expires信息），若命中直接从缓存中获取资源信息，包括缓存header信息；本次请求根本就不会与服务器进行通信。
``` bash
注意：强缓存通常都是针对静态资源使用，动态资源需要慎用，除了服务端页面可以看作动态资源外，那些引用静态资源的html也可以看作是动态资源，
如果这种html也被缓存，当这些html更新之后，可能就没有机制能够通知浏览器这些html有更新，尤其是前后端分离的应用里，页面都是纯html页面，每个访问地址可能都是直接访问html页面，
这些页面通常不加强缓存，以保证浏览器访问这些页面时始终请求服务器最新的资源。
```
1. Expires：该字段是http1.0时的规范，它的值为一个绝对时间的GMT格式的时间字符串，比如Expires:Mon,18 Oct 2066 23:59:59 GMT。这个时间代表着这个资源的失效时间，在此时间之前，即命中缓存。这种方式有一个明显的缺点，由于失效时间是一个绝对时间，所以当服务器与客户端时间偏差较大时，就会导致缓存混乱。
2. Cache-Control：Cache-Control是http1.1时出现的header信息，主要是利用该字段的max-age值来进行判断，它是一个相对时间，例如Cache-Control:max-age=3600，代表着资源的有效期是3600秒。cache-control除了max-age字段外，还有下面几个比较常用的设置值：
``` bash
no-cache：不使用本地缓存，需要使用缓存协商。要与服务器确认返回的响应是否被更改，如果资源未被更改，则可以避免重新下载。
no-store：直接禁止游览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
public：可以被所有的用户缓存，包括终端用户和CDN等中间代理服务器。
private：只能被终端用户的浏览器缓存，不允许CDN等中继缓存服务器对其缓存。
```
3. 如果cache-control与expires同时存在的话，cache-control的优先级高于expires

## 命中协商缓存：
> 如果没有命中强缓存，浏览器会发送请求到服务器，由服务器来确定是否可以访问缓存资源，这主要涉及到两组header字段（Last-Modified/If-Modified-Since和Etag/If-None-Match），这两组搭档都是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified或者Etag），则后续请求则会带上对应的请求字段（If-Modified-Since或者If-None-Match），若响应头没有Last-Modified或者Etag字段，则请求头也不会有对应的字段。
1. Last-Modify/If-Modify-Since:浏览器第一次请求一个资源的时候，服务器返回的header中会加上Last-Modify，Last-modify是一个时间，标识该资源的最后修改时间，例如Last-Modify: Thu,31 Dec 2037 23:59:59 GMT。当浏览器再次请求该资源时，request的请求头中会包含If-Modify-Since，该值为之前返回的Last-Modify。服务器收到If-Modify-Since后，根据资源的最后修改时间判断是否命中缓存。如果命中缓存，则返回304，并且不会返回资源内容，并且不会返回Last-Modify。
2. ETag/If-None-Match:与Last-Modify/If-Modify-Since不同的是，Etag/If-None-Match返回的是一个校验码。ETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。服务器根据浏览器上送的If-None-Match值来判断是否命中缓存。与Last-Modified不一样的是，当服务器返回304 Not Modified的响应时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag跟之前的没有变化。

## 有了Last-Modified，为什么还要有Etag？
> HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：
1. 一些文件也许会周期性的更改，但是他的内容并不改变(仅仅改变的修改时间)，这个时候我们并不希望客户端认为这个文件被修改了，而重新GET；
2. 某些文件修改非常频繁，比如在秒以下的时间内进行修改，(比方说1s内修改了N次)，If-Modified-Since能检查到的粒度是秒级的，这种修改无法判断(或者说UNIX记录MTIME只能精确到秒)；
3. 某些服务器不能精确的得到文件的最后修改时间。
4. Last-Modified与ETag是可以一起使用的，服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。

## 浏览器行为对缓存的影响：
1. 当ctrl+f5强制刷新网页时，直接从服务器加载，跳过强缓存和协商缓存；
2. 当f5刷新网页时，跳过强缓存，但是会检查协商缓存；
3. 地址栏回车、页面链接跳转、新开窗口、前进后退按钮，强缓存，协商缓存均有效

-----------------------------------------------------------------------
# 团队约定
## 关于id选择器和class选择器
1. id和固定前缀的class给JS使用，如：`js__item`给js使用
2. 其他class给css使用

## css class名字规范：
1. `__`双下划线代表B和E连接例如 menu__item
2. `--`双中划线代表B和M或E和M的连接 例如 menu--active 或 menu__item--active
3. `-`中划线同英语里做连字符例如 mod-menu 或 mod-menu__item 这里 B或E或M需要多个单词来描述,就使用中划线
``` bash
.site-search{} /* 块 */  
.site-search__field{} /* 元素 */  
.site-search--full{} /* 修饰符 */   
```

## 关于BEM
1. Block：将所有东西都划分为一个独立的模块,一个header是block,header里嵌套的搜索框是block,甚至一个icon一个logo也是block，block可以相互嵌套
2. Element：一个Block下的所有Element无论相互层级如何,都要摊开扁平的属于Block，所以 BEM 最多只有 B+E+M 三级,不可能出现 B+E+E+..+E+M 超长class名,也要求E不能同名
3. Modifier：之前我们经常写的 .current .active 等表达状态

## BEM如何和后代选择器配合？
1. 先选出样式独立的块，class命名使用BEM
2. 在这个块下使用后代选择器，后代选择器可选择不使用BEM

## css 代码复用：
``` bash
// 1. 变量名不用具体的值，用程度来划分
@fontSizePrimary: 16px;
@fontSizeSmall: @fontSizePrimary * 0.85;
@fontSizeLarge: @fontSizePrimary * 1.25;
// 2. 在公共样式里调用
.ui-fs-medium{font-size: @fontSizePrimary;}
.ui-fs-small{font-size: @fontSizeSmall;}
.ui-fs-large{font-size: @fontSizeLarge;}
```

## 关于移动端适配方案(一套编码，适配多中屏幕尺寸的终极方案)
1. 设置屏幕宽度为设备宽度，不缩放
2. 竖屏根字体大小在一定屏幕宽度范围内，根据宽度动态计算（兼容ie8的情况下使用js动态计算），超出范围的，固定大小（使界面原素不至于过大）
3. 横屏固定根字体大小（使界面原素不至于过大）
4. 页面原素rem作为单位（兼容ie8的情况下em作为单位，因为默认font-size是inherit，这时不改变当前节点字体大小的话原素大小也是可响应的，需要改变字体大小的话，只能改变子节点字体大小）
5. icon的雪碧图不能使用rem为单位的的background-position（原因是缩放的情况下，rem的background-position不准确），使用字体图标或者inline的svg或者inline的图片制作icon（不推荐针对icon写多套媒体查询--滥用媒体查询）
6. 适配屏幕计算原素rem大小时的技巧：css预编处理器实现px2rem或者px2rem函数


----------------------------------------------------------------------------
# pointer-events: none;
1. 禁用鼠标的 hover
2. 禁用鼠标的 点击
3. 让元素实体虚化，使鼠标穿透

# 原素穿透效果
1. 在IE浏览器下，filter滤镜实现的半透明渐变背景元素本身就是镂空的穿透的，我们可以使用鼠标选择或点击半透明背景**下面**的元素（上下层级关系）
2. FireFox或是Chrome等现代浏览器，则半透明覆盖**下面**的元素会被遮住，无法选择或点击。对半透明覆盖元素应用`pointer-events:none`声明使其可以鼠标穿透，于是半透明覆盖**下面**的文字可以选择（上下层级关系）

# 实现按钮、选项卡等的禁用效果
1. input[type=text|button|radio|checkbox]等控件 + disabled属性: 可以实现事件的鼠标、键盘tab键索引的完全禁用（附带UI变化）

2. a标签 + disabled属性: 无法实现兼容的完全（鼠标、键盘）禁用效果。（虽然IE下置灰文字看上去可以禁用）。

3. `pointer-events:none;`可以禁用a标签的鼠标，`without href`可以禁用键盘tab键索引。即使如此，两者结合起来用不是很好，`pointer-events:none;`不能兼容底版本浏览器

# 360浏览器默认以极速模式打开网页
``` bash
<meta name="renderer" content="webkit"> //默认用极速核
<meta name="renderer" content="ie-comp"> //默认用ie兼容内核
<meta name="renderer" content="ie-stand"> //默认用ie标准内核
```

# 不可能使用calc()转换在IE中的translateX
``` bash
// 谷歌、火狐上可以，ie不生效
#myDiv {
    transform: translateX(calc(100% - 50px));
}
// 兼容谷歌、火狐、ie
#myDiv {
    transform: translateX(100%) translateX(-50px);
}
```

# 自定义触摸事件
``` bash
app.directive('tap',function(){
    return function(scope, elem, attrs){
        var start,end,t,moved = false;
        elem.bind('touchstart',function(e){
            start = e.timeStamp;
            moved = false;
            elem.css({
                "opacity":"0.7"
            });
        });
        elem.bind('touchmove',function(e){
            end = e.timeStamp;
            t = end - start;
            if(t>300){
                e.preventDefault();
            }
            moved = true;
        });
        elem.bind('touchend',function(e){
            elem.css({
                "opacity":"1"
            });
            end = e.timeStamp;
            t = end - start;
            if(!moved && t>10 && t<300){
                if(attrs.tap){
                    scope.$apply(attrs.tap);
                }
            }
        });
    };
});
```

# 浅拷贝对象
> 赋值运算符不会创建一个对象的副本，它只分配一个引用。  
> 复制对象的原始方法是循环遍历原始对象，然后一个接一个地复制每个属性。  
> 浅层复制将复制顶级属性，但是**嵌套对象**将在**原始对象**和**副本对象**之间是共享。  

``` bash 
let obj = {
    a: 1,
    b: 2,
};
let objCopy = Object.assign({}, obj);
console.log(objCopy); // result - { a: 1, b: 2 }
objCopy.b = 89;
console.log(objCopy); // result - { a: 1, b: 89 }
console.log(obj); // result - { a: 1, b: 2 }
// 浅拷贝，副本和原始对象共享对象类型的属性
// 可以用于复制对象的方法
// 适用于浅拷贝循环引用对象（自身属性引用自身属性）
```

``` bash
let obj = { 
    a: 1,
    b: { 
        c: 2,
    },
}
let newObj = JSON.parse(JSON.stringify(obj));
obj.b.c = 20;
console.log(obj); // { a: 1, b: { c: 20 } }
console.log(newObj); // { a: 1, b: { c: 2 } } (一个新的对象)
// 深度拷贝对象
// 不能用于复制对象方法
// 复制循环引用对象会报错（自身属性引用自身属性）
```

``` bash
const array = [
    "a",
    "c",
    "d", {
        four: 4
    },
];
const newArray = [...array];
console.log(newArray); // ["a", "c", "d", { four: 4 }]
// 浅拷贝

let obj = {
    one: 1,
    two: 2,
}
let newObj = { ...z };
console.log(newObj); // { one: 1, two: 2 }
// 浅拷贝

```

# 让页面字体变平滑
``` bash
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```

# 对象深拷贝
``` bash
function getType(obj){
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]'  : 'boolean', 
        '[object Number]'   : 'number', 
        '[object String]'   : 'string', 
        '[object Function]' : 'function', 
        '[object Array]'    : 'array', 
        '[object Date]'     : 'date', 
        '[object RegExp]'   : 'regExp', 
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null', 
        '[object Object]'   : 'object'
    };
    if(obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}
```
使用递归来进行深拷贝  
``` bash
function deepClone(data){
    var type = getType(data);
    var obj;
    if(type === 'array'){
        obj = [];
    } else if(type === 'object'){
        obj = {};
    } else {
        //不再具有下一层次
        return data;
    }
    if(type === 'array'){
        for(var i = 0, len = data.length; i < len; i++){
            obj.push(deepClone(data[i]));
        }
    } else if(type === 'object'){
        for(var key in data){
            obj[key] = deepClone(data[key]);
        }
    }
    return obj; 
}
```
使用树的广度优先遍历来实现  
``` bash
//这里为了阅读方便，只深拷贝对象，关于数组的判断参照上面的例子
function deepClone(data){
    var obj = {};
    var originQueue = [data];
    var copyQueue = [obj];
    //以下两个队列用来保存复制过程中访问过的对象，以此来避免对象环的问题（对象的某个属性值是对象本身）
    var visitQueue = [];
    var copyVisitQueue = [];
    while(originQueue.length > 0){
        var _data = originQueue.shift();
        var _obj = copyQueue.shift();
        visitQueue.push(_data);
        copyVisitQueue.push(_obj);
        for(var key in _data){
            var _value = _data[key]
            if(typeof _value !== 'object'){
                _obj[key] = _value;
            } else {
                //使用indexOf可以发现数组中是否存在相同的对象(实现indexOf的难点就在于对象比较)
                var index = visitQueue.indexOf(_value);
                if(index >= 0){
                    _obj[key] = copyVisitQueue[index];
                }
                originQueue.push(_value);
                _obj[key] = {};
                copyQueue.push(_obj[key]);
            }
        }
    }
    return obj;
}
```
``` bash
var cloneObj = function(obj){
    var newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        newobj = JSON.parse(JSON.stringify(obj));
        // 会抛弃原对象的constructor,在深复制之后会变成Object
        // 诸如RegExp对象是无法通过这种方式深复制的
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
```
<a href="https://github.com/zry656565/JustJS" target="_blank">github</a>，
<a href="https://segmentfault.com/a/1190000000501320" target="_blank">原文链接</a>
``` bash
Object.prototype.clone = function () {
    var Constructor = this.constructor;
    var obj = new Constructor();
    for (var attr in this) {
        if (this.hasOwnProperty(attr)) {
            if (typeof(this[attr]) !== "function") {
                if (this[attr] === null) {
                    obj[attr] = null;
                } else {
                    obj[attr] = this[attr].clone();
                }
            }
        }
    }
    return obj;
};
Array.prototype.clone = function () {
    var thisArr = this.valueOf();
    var newArr = [];
    for (var i=0; i<thisArr.length; i++) {
        newArr.push(thisArr[i].clone());
    }
    return newArr;
};
Boolean.prototype.clone = function() { return this.valueOf(); };
Number.prototype.clone = function() { return this.valueOf(); };
String.prototype.clone = function() { return this.valueOf(); };
Date.prototype.clone = function() { return new Date(this.valueOf()); };
RegExp.prototype.clone = function() {
    var pattern = this.valueOf();
    var flags = '';
    flags += pattern.global ? 'g' : '';
    flags += pattern.ignoreCase ? 'i' : '';
    flags += pattern.multiline ? 'm' : '';
    return new RegExp(pattern.source, flags);
};
```

# 判断对象类型
``` bash
function getType(obj){
    //tostring会返回对应不同的标签的构造函数
    var toString = Object.prototype.toString;
    var map = {
        '[object Boolean]'  : 'boolean', 
        '[object Number]'   : 'number', 
        '[object String]'   : 'string', 
        '[object Function]' : 'function', 
        '[object Array]'    : 'array', 
        '[object Date]'     : 'date', 
        '[object RegExp]'   : 'regExp', 
        '[object Undefined]': 'undefined',
        '[object Null]'     : 'null', 
        '[object Object]'   : 'object'
    };
    if(obj instanceof Element) {
        return 'element';
    }
    return map[toString.call(obj)];
}
```

# 子元素scroll父元素容器不跟随滚动JS实现

<a href="http://www.zhangxinxu.com/wordpress/2015/12/element-scroll-prevent-parent-element-scroll-js/">原文链接1</a>，
<a href="http://blog.csdn.net/duola8789/article/details/73505809">原文链接2</a>
``` bash
$.fn.scrollUnique = function() {
    return $(this).each(function() {
        var eventType = 'mousewheel';
        if (document.mozHidden !== undefined) {
            eventType = 'DOMMouseScroll';
        }
        $(this).on(eventType, function(event) {
            // 一些数据
            var scrollTop = this.scrollTop,
                scrollHeight = this.scrollHeight,
                height = this.clientHeight;

            var delta = (event.originalEvent.wheelDelta) ? event.originalEvent.wheelDelta : -(event.originalEvent.detail || 0);        

            if ((delta > 0 && scrollTop <= delta) || (delta < 0 && scrollHeight - height - scrollTop <= -1 * delta)) {
                // IE浏览器下滚动会跨越边界直接影响父级滚动，因此，临界时候手动边界滚动定位
                this.scrollTop = delta > 0? 0: scrollHeight;
                // 向上滚 || 向下滚
                event.preventDefault();
            }        
        });
    }); 
};
$('#test').scrollUnique();
```


# 几种控制DIV内容滚动的方法
1. 使用锚标记要滚动到的位置，然后通过click方法模拟点击滚动到锚所在位置
2. document.getElementById("nn").scrollIntoView(true)
3. div.scrollTop = div.scrollHeight;
4. 利用DIV+JS+图片构造一个滚动条,外层的DIV加个overflow:hidden属性，通过js代码调整内层DIV的margin-left和margin-top来控制内容的滚动

# 完美运动框架
1. 先清除定时器
2. 开启定时器，计算速度
3. 判断停止条件，执行运动
<a href="http://blog.csdn.net/u011175410/article/details/50351667" target="_blank">文章链接</a>
``` bash
/**  
   * getStyle 获取样式  
   * startMove 运动主程序  
*/                    
function getStyle(obj, attr){    
    if(obj.currentStyle){    
        return obj.currentStyle[attr]; //for ie   
    }else{    
        return getComputedStyle(obj, false)[attr];  // for ff  
    }    
 }    
function Move(obj,json,fn){ 
    //停止上一次定时器    
    clearInterval(obj.timer); //关闭前一个定时器，解决对同个对象同时调用多个Move()时，定时器叠加问题。使用obj.timer给每个调用Move()的对象赋予各自的定时器，防止多个对象同时调用Move()时，同用一个定时器，而导致相关干扰问题。   
    //保存每一个物体运动的定时器    
    obj.timer = setInterval(function(){  
        //判断同时运动标志    
        var bStop = true;    
        for(var attr in json){    
            //取当前值      
            var iCur = 0;  //创建一个变量，用于存储 attr属性每时每刻的值  
            if(attr == 'opacity'){   
                //针对在FF中opacity属性值为浮点数值问题，将属性值 四舍五入、转换成浮点型。乘以100，使opacity属性值与IE统一为百分数  
                iCur = Math.round(parseFloat(getStyle(obj, attr))*100);    
            }else{    
                iCur = parseInt(getStyle(obj,attr)); //将除opacity外的属性(width/fontSize/MarginLeft等)的初始值 转换为整型   
            }    
            //计算速度    
            var iSpeed = (json[attr] - iCur) / 8;  //创建 递减的速度speed变量。实现属性值的变速改变  
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);  //取整，解决浏览器忽略小于1px的数值 导致运动结束时，离目标值Itarget少几个像素的问题  
            //检测同时到达标志    
            if(iCur != json[attr]){    
                bStop = false;    
            }       
            //更改属性，获取动画效果    
            if(attr=='opacity'){    
                iCur += iSpeed    
                obj.style.filter='alpha(opacity:' + iCur + ')';    
                obj.style.opacity=iCur / 100;    
            }else{    
                obj.style[attr]=iCur+iSpeed+'px';    
            }    
        }    
        //检测停止    
        if(bStop){    
            clearInterval(obj.timer);    
            if(fn) fn();    
        }
    },30)    
} 
```
1. 连续点击按钮，物体会运动越来越快。因为每点击一次，就开了一个定时器
2. 分离停止条件,主要是根据目标判断速度的正负。从而在鼠标滑入画出时候进行运动/恢复的效果
3. 改变物体的透明度，由于没有像原生的位置属性那样的offsetLset 需要一个变量来保存透明度的值，用来和速度加减，最后付给元素的透明度样式
4. 缓冲运动原理就是，改变速度的值。每次累加的速度值变小，就是会是整个物体看起来越来越慢，以至于最后停掉
5. 但凡用到缓冲运动，一定要用到向上/向下取整
6. 处理多物体运动，运动函数里面每次都要选取一个元素加事件。如果需要对多个物体进行同样的运动， 需要将运动对象作为参数传进来
7. 将定时器，变成物体的属性，类似给物体添加索引
8. offsetWidth 或者 offsetHeight 等位置属性，一旦给他们加上 border。则会有诡异的现象出现。解决的方案就是，加减的时候，必须使用物体的内联样式
9. 链式运动,传入回调函数
10. 不能同时该两个属性进行运动，比如同时更改宽和高。这个要求传入的属性是不同的几个值。则考虑传入一个 json用来保存需要更改的属性
11. 同时运动的某个属性，如果变化很小，马上就停止了，即关掉了定时器。那么会造成其他属性的变化也停止。因为这些属性都共用了一个定时器。一开始，设立一个检查量，为真。假设所有人都到了，然后循环，只有有一个人没有到，检查就为假。直到所有的都到了，检测为真。则停止定时器

# 如何使用Tween.js各类原生动画运动缓动算法
> Tween.js是一个包含各种经典动画算法的JS资源

<a href="http://www.zhangxinxu.com/wordpress/2016/12/how-use-tween-js-animation-easing/" target="_blank">文章链接</a>、
<a href="https://github.com/zhangxinxu/Tween" target="_blank">github</a>  
动算法:
1. Linear：线性匀速运动效果；
2. Quadratic：二次方的缓动（t^2）；
3. Cubic：三次方的缓动（t^3）；
4. Quartic：四次方的缓动（t^4）；
5. Quintic：五次方的缓动（t^5）；
6. Sinusoidal：正弦曲线的缓动（sin(t)）；
7. Exponential：指数曲线的缓动（2^t）；
8. Circular：圆形曲线的缓动（sqrt(1-t^2)）；
9. Elastic：指数衰减的正弦曲线缓动；
10. Back：超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
11. Bounce：指数衰减的反弹缓动。  

每个效果都分三个缓动方式，分别是：
1. easeIn：从0开始加速的缓动，也就是先慢后快；
2. easeOut：减速到0的缓动，也就是先快后慢；
3. easeInOut：前半段从0开始加速，后半段减速到0的缓动。

``` bash
// requestAnimationFrame的兼容处理
if (!window.requestAnimationFrame) {
    requestAnimationFrame = function(fn) {
        setTimeout(fn, 17);
    };  
}
/*
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
*/
// 原理：只要给一个小于持续时间的值，动画算法（如：Tween.Linear）就会返回当前时间应该的坐标
var t = 0, b = 0, c = 100, d = 10;
var step = function () {
    // value就是当前的位置值,例如我们可以设置DOM.style.left = value + 'px'实现定位
    var value = Tween.Linear(t, b, c, d);
    t++;
    if (t <= d) {
         // 继续运动
         requestAnimationFrame(step);
    } else {
        // 动画结束
    }
};
```
刹车缓动到顶部
``` bash
// Math.animation(form, to, duration, easing, callback);
Math.animation(document.documentElement.scrollTop, 0, function (value) {
    document.documentElement.scrollTop = value;
}, 'Quart.easeOut', 600);
```

# requestAnimationFrame
> 解决过度绘制的问题，动画不会掉帧，自然流畅  

<a href="http://www.zhangxinxu.com/wordpress/2013/09/css3-animation-requestanimationframe-tween-动画算法/" target="_blank">文章链接</a>

``` bash
// 兼容处理 requestAnimationFrame
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
```

# 页面是否滚动到底部或者顶部
``` bash
function BottomJumpPage() {  
    var scrollTop = $(this).scrollTop();  
    var scrollHeight = $(document).height();  
    var windowHeight = $(this).height();  
    if (scrollTop + windowHeight == scrollHeight) {  //滚动到底部执行事件  
            console.dir("我到底部了");
            //console.dir()可以显示一个对象所有的属性和方法
    }  
    if (scrollTop == 0) {  //滚动到头部部执行事件  
        console.log("我到头部了");
    }  
 }  

 $(window).scroll(BottomJumpPage); 
```

# 单纯判断滚动条方向
``` bash
function scroll( fn ) {  
    var beforeScrollTop = document.body.scrollTop,  
        fn = fn || function() {};  
    window.addEventListener("scroll", function() {  
        var afterScrollTop = document.body.scrollTop,  
            delta = afterScrollTop - beforeScrollTop;  
        if( delta === 0 ) return false;  
        fn( delta > 0 ? "down" : "up" );  
        beforeScrollTop = afterScrollTop;  
    }, false);  
} 

scroll(function(direction) {
    console.log(direction);
    $('.xx').text(direction);
});  
// 手机苹果浏览器事件会跳动
```

# 判断滚动条方向代码改进
``` bash
function scrollDirect(fn) {  
    var beforeScrollTop = document.body.scrollTop;  
    fn = fn || function () {};  
    window.addEventListener("scroll", function (event) {  
        event = event || window.event;  
        var afterScrollTop = document.body.scrollTop;  
        var delta = afterScrollTop - beforeScrollTop;  
        beforeScrollTop = afterScrollTop;  
        var scrollTop = $(this).scrollTop();  
        var scrollHeight = $(document).height();  
        var windowHeight = $(this).height();  
        if (scrollTop + windowHeight > scrollHeight - 10) {  //滚动到底部执行事件  
            fn('up');  
            return;  
        }  
        if (afterScrollTop < 10 || afterScrollTop > $(document.body).height - 10) {  
            fn('up');  
        } else {  
            if (Math.abs(delta) < 10) {  
                return false;  
            }  
            fn(delta > 0 ? "down" : "up");  
        }  
    }, false);
}  
//调用
var upflag=1;  
var downflag= 1;  
//scroll滑动,上滑和下滑只执行一次！  
scrollDirect(function (direction) {  
       if (direction == "down") {  
           if (downflag) {  
               // $(".footer_wrap").slideUp(200);  
               $('.xx').text(direction);
                downflag = 0;  
                upflag = 1;  
           }  
       }  
       if (direction == "up") {  
           if (upflag) {  
               // $(".footer_wrap").slideDown(200); 
               $('.xx').text(direction); 
                downflag = 1;  
                upflag = 0;  
           }  
       }  
});  
```

# 判断鼠标的滚动方向
``` bash
var scrollFunc = function (e) {
    var direct = 0;
    e = e || window.event;
    if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件             
        if (e.wheelDelta > 0) { //当滑轮向上滚动时
            console.log('↑');
        }
        if (e.wheelDelta < 0) { //当滑轮向下滚动时
            console.log('↓');
        }
    } else if (e.detail) {  //Firefox滑轮事件
        if (e.detail> 0) { //当滑轮向上滚动时
            console.log('↑');
        }
        if (e.detail< 0) { //当滑轮向下滚动时
            console.log('↓');
        }
    }
    // ScrollText(direct);
}
//给页面绑定滑轮滚动事件
if (document.addEventListener) {
    document.addEventListener('DOMMouseScroll', scrollFunc, false);
}
//滚动滑轮触发scrollFunc方法
window.onmousewheel = document.onmousewheel = scrollFunc;
```

# 根据屏幕宽度等比设置字体大小
``` bash
(function(win,doc){
    var docEl = document.documentElement,
        resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize',
        recalc = function() {
            if(docEl.clientWidth > 750){
                docEl.style.fontSize = (750 * 14 / 375) + 'px';
            }else if(docEl.clientWidth <= 320){
                docEl.style.fontSize = (320 * 14 / 375) + 'px';
            }else{
                docEl.style.fontSize = (docEl.clientWidth * 14 / 375) + 'px';
            }
        };
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(window,document);
```

# 判断设备终端
``` bash
const browser = {
    versions: function() {
        var u = navigator.userAgent,
            app = navigator.appVersion; 
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/)||!!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
//  document.writeln("语言版本: "+browser.language+"<br />");
//  document.writeln(" 是否为移动终端: "+browser.versions.mobile+"<br />");
//  document.writeln(" ios终端: "+browser.versions.ios+"<br />");
//  document.writeln(" android终端: "+browser.versions.android+"<br />");
//  document.writeln(" 是否为iPhone: "+browser.versions.iPhone+"<br />");
//  document.writeln(" 是否iPad: "+browser.versions.iPad+"<br />");
//  document.writeln(navigator.userAgent+"<br />");
export default browser;
```

# 获取url参数
1. 正则方式获取
``` bash
function getQueryString(name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'),
        r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURIComponent(r[2]);
    }
    return null;
}
```
2. `split`拆分法
``` bash
function getRequest() {
    let url = location.search,
        theRequest = new Object();
    if (url.indexOf('?') !== -1) {
        let str = url.substr(1),
            strs = str.split('&');
        for(let i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split('=')[0]] = decodeURIComponent(strs[i].split('=')[1]);
        }
    }
    return theRequest;
}
```



# windows如何查看端口
显示所有的端口占用
``` bash
netstat -ano
```
查询指定的端口占用，回车之后就可以看见列表中的PID，然后根据PID在电脑的任务管理器中查看对应的占用程序，接着进行关闭即可
``` bash
netstat -aon|findstr "端口号"
```
查询PID对应的进行进程（程序名）
``` bash
tasklist|findstr "PID"
```
根据程序名称，杀死进程，如：taskkill /f /t /im node.exe
``` bash
taskkill /f /t /im 程序名
```

# 移动端自带滚动条的平滑滚动
``` bash
-webkit-overflow-scrolling: touch;
overflow: auto;
```

# 移动端的hover和active
> 在移动端使用:hover和:active制作按钮点击变色效果会失效，使用下面的代码可以修复
``` bash
document.body.addEventListener('touchstart', function () { }); 
```

# 函数节流、函数去抖
``` bash
var _debounce = function(action, delay) {
    var timer = null;
    return function() {
        var self = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            action.apply(self, args)
        }, delay);
    }
}

var _throttle = function(action, delay){
    var statTime = 0;
    return function() {
        var currTime = +new Date();
        if (currTime - statTime > delay) {
            action.apply(this, arguments);
            statTime = currTime ;
        }
    }
}
```

# 对象的合并
``` bash
Object.assign({}, getJsEntry('./app/pages/**/*.js'), {
    common: './app/assets/styles/common.css',
    vendor: ['jquery', 'bootstrap', 'bootstrap/dist/css/bootstrap.css']
})
```

# 扩展运算符合并数组
``` bash
[
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(NODE_ENV)
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor'],
        minChunks: Infinity,
        filename: 'assets/scripts/[name].[chunkhash:8].js',
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
    }),
    new ExtractTextPlugin({
        filename: 'assets/styles/[name].[contenthash:8].css',
        allChunks: false
    }),
    ...getHtmlEntry('./app/pages/**/*.html').map((item, index) => {
        return new HtmlWebpackPlugin(item)
    })
]
```

# 不要使用浏览器嗅探，尽量使用特性检测和特性模拟
1. 利用特征监测来推测IE的的版本号非常好用，也可利用IE的一些特有对象来识别IE所有系列
2. 可见，没必要再对userAgent耿耿于怀，字符串可以随意伪造，但是浏览器的相关特性却是不会改变，所以还是宁愿花几毫秒来测试一番，而不用提心吊胆的根据字符串随意猜测相关特性。
> 利用特征监测来推测IE的的版本号非常好用，也可利用IE的一些特有对象来识别IE所有系列
``` bash
'VBArray' in window // true
'ActiveXObject' in window //true
if(isIE){
    if(document.documentMode == 11){
        isIE11 = true;  
    }else if('WebSocket' in window){
        isIE10 = true;    
    }else if('HTMLElement' in window){
        isIE9 = true;
    }else if('localStorage' in window){
        isIE8 = true;
    } else if('minHeight' in div.currentStyle){
        isIE7 = true;
    } else{
        isIE6 = true;
        document.execCommad('backgroundimagecache',false,false); //IE6并不会对背景图片进行缓存，故进行修补
    }
}
```



# 汉字两端对齐效果
``` bash
<div class="xxx">
  分厘卡三季稻法律健康
</div>
```

``` bash
.xxx{
    display: inline-block;
    width: 500px;
    overflow: hidden;
    text-align: justify;
    text-justify: distribute-all-lines;
    text-align-last: justify;
    -moz-text-align-last: justify;
    -webkit-text-align-last: justify;
}
.xxx:after{
    content: "";
    width: 100%;
    display: inline-block;
}
```

# 页面的footer部分总是出现在浏览器最底端
``` bash
<div class='example'>
  <div id='layout'>
    <div id='header'><h1>Sticky Footer Example</h1></div>
    <p>This is the main content area.</p>
    <p>In this example you should pretend that the red box is actually the browser window.</p>
    <p>Because, being a contrived example, it's not actually sticking to the bottom of the page.</p>
    <div id='layout_footer'></div>
  </div>
  <div id='footer'>This is the footer area.</div>
</div>
```

``` bash
html, body {
    height: 100%;
}
#layout {
    clear: both;
    min-height: 100%;
    height: auto !important;
    height: 100%;
    margin-bottom: -72px;
}
#layout #layout_footer {
    height: 72px;
}
#footer {
    clear: both;
    position: relative;
    height: 72px;
}

/*---------------------------------------------*/

#header {
    background: #999999;
    height: 72px;
}
#footer {
    background: #cccccc;
}
.example {
    height: 500px;
    border: 3px solid red;
}
.example p {
    margin: 1em 0.5em;
}
```

# handlebarsStr.css.handlebars
> gulp.spritesmith 生成雪碧图样式的模板
``` bash
{{#sprites}}
.icon-{{name}}:before {
    content: " ";
    display: inline-block;
    background-image: url({{{escaped_image}}});
    background-position: calc({{px.offset_x}} / 2) calc({{px.offset_y}} / 2);
    width: calc({{px.width}} / 2);
    height: calc({{px.height}} / 2);
    background-size: calc({{px.total_width}} / 2) calc({{px.total_height}} / 2);
}
{{/sprites}}
```

# angular@1.x 自定义指令
> 注意：angular@1.x 自定义指令使用到异步数据 需要在指令link内 $watch内部scope的数据模型，才能监听到数据的变化。

# angular@1.x 在全局调用控制器里的模型
``` bash
function rewardcb(){
    var appElement = document.querySelector('[ng-controller="content"]');
    var $scope = angular.element(appElement).scope();
    $scope.getRewardList();/*改变了模型，想同步到控制器中，则需要调用$apply()*/
    $scope.$apply();
}
```

#  angular@1.x 获取服务
``` bash
function getAngularService(name){
    var $injector = angular.element("body").injector();
    return $injector.get(name);
}
```

# 
> 
``` bash
```
