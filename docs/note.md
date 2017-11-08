# 完美运动框架

1. 先清除定时器
2. 开启定时器，计算速度
3. 判断停止条件，执行运动

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
var t = 0, b = 0, c = 100, d = 10;
var step = function () {
    // value就是当前的位置值
    // 例如我们可以设置DOM.style.left = value + 'px'实现定位
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
