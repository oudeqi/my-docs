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
