 
css技巧和兼容问题
分类： HTML/CSS2011-12-01 09:50 508人阅读 评论(0) 收藏 举报
cssfirefoxie浏览器float
css控制截断文字溢出：
[css] view plaincopyprint?
1..块{  
2.    display: block;  
3.    overflow: hidden;  
4.    white-space: nowrap;  
5.    text-overflow: ellipsis;  
6.    text-align: left;  
7.}  
自动换行
[css] view plaincopyprint?
1.dd{white-space:normal; word-break:break-all;}  
强制不换行
[css] view plaincopyprint?
1.dd{white-space:nowrap;}  
解决IE6margin双倍的问题
[css] view plaincopyprint?
1..fl{float:left;display:inline}  
2..fr{float:right;display:inline}  
自适应高度
(1)在父div中加入一个子div
[css] view plaincopyprint?
1..clear{clear:both}  
(2)在父div的css中加入属性
[css] view plaincopyprint?
1.#wrapper{ overflow:hidden; zoom:1; margin:5px auto;}  
CSS清除浮动 万能float闭合
[css] view plaincopyprint?
1..clearfix:after{content:”.”;display:block;height:0;clear:both;visibility:hidden;}  
2..clearfix{display:inline-block;}  
3.*html .clearfix{height:1%;}  
4.*+html .clearfix{height:1%;}  
5..clearfix {display:block;}  
字体简写
[css] view plaincopyprint?
1.font:italic bold 12px/20px arial,sans-serif;  
背景颜色半透明
[css] view plaincopyprint?
1./*半透明状态*/  
2.background: #000;  
3.opacity: 0.6;   
4./* For IE 5-7 */  
5.filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=60);  
6./* For IE 8 */  
7.-MS-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=60)";  
[css] view plaincopyprint?
1./*这种不用设置背景颜色，避免半透明*/  
[css] view plaincopyprint?
1.filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#BF000000,endColorstr=#BF000000)'  
去掉链接（包括图片链接）的虚线边框
[css] view plaincopyprint?
1./* for IE */  
2.a,area { blr:expression(this.onFocus=this.blur()) }  
3.  
4./* for Firefox */  
5.:focus { outline: none; }   
图标和文字对齐
[html] view plaincopyprint?
1.<span style="vertical-align:middle;" ><img src="b-grade.png" ></span><a style="vertical-align:middle;"  href="">链接链接链接链接</>  
如何对齐文本与文本输入框
[css] view plaincopyprint?
1.input {  
2.     width:200px;  
3.     height:30px;  
4.     border:1px solid red;  
5.     vertical-align:middle;  
6.}  
文字与文本域怎么顶部对齐
[css] view plaincopyprint?
1.textarea{  
2.  vertical-align:top;  
3.}  
区别IE和非IE浏览器CSS HACK代码
[css] view plaincopyprint?
1.#divcss5{  
2.background:blue; /*非IE 背景藍色*/  
3.background:red \9; /*IE6、IE7、IE8背景紅色*/  
4.}   
区别IE6,IE7,IE8,FF CSS HACK 
【区别符号】：「\9」、「*」、「_」
【示例】：
[css] view plaincopyprint?
1.#divcss5{  
2.background:blue; /*Firefox 背景变蓝色*/  
3.background:red \9; /*IE8 背景变红色*/  
4.*background:black; /*IE7 背景变黑色*/  
5._background:orange; /*IE6 背景变橘色*/  
6.}  
【说明】：因为IE系列浏览器可读「\9」，而IE6和IE7可读「*」(米字号)，另外IE6可辨识「_」(底线)，因此可以依照顺序写下来，就会让浏览器正确的读取到自己看得懂得CSS语法，所以就可以有效区分IE各版本和非IE浏览器(像是Firefox、Opera、Google Chrome、Safari等)。
区别IE6、IE7、Firefox (EXP 1) 
【区别符号】：「*」、「_」
【示例】：
[css] view plaincopyprint?
1.#divcss5{  
2.background:blue; /*Firefox背景变蓝色*/  
3.+background:black; /*IE6和IE7 背景变黑色*/  
4.}   
【说明】：IE7和IE6可读「*」(米字号)，IE6又可以读「_」(底线)，但是IE7却无法读取「_」，至于Firefox(非IE浏览器)则完全无法辨识「*」和「_」，因此就可以透过这样的差异性来区分IE6、IE7、Firefox
区别IE6、IE7、Firefox (EXP 2) 
【区别符号】：「*」、「!important」
【示例】：
[css] view plaincopyprint?
1.#divcss5{  
2.background:blue; /*Firefox 背景变蓝色*/  
3.*background:green !important; /*IE7 背景变绿色*/  
4.*background:orange; /*IE6 背景变橘色*/  
5.}   
【说明】：IE7可以辨识「*」和「!important」，但是IE6只可以辨识「*」，却无法辨识「!important」，至于Firefox可以读取「!important」但不能辨识「*」因此可以透过这样的差异来有效区隔IE6、IE7、Firefox。
如何让已知高度的容器在页面中水平垂直居中
[css] view plaincopyprint?
1.#test{position:absolute;top:50%;left:50%;width:200px;height:200px;margin:-100px 0 0 -100px;}   
如何让未知尺寸的图片在已知宽高的容器内水平垂直居中
[css] view plaincopyprint?
1.#test{display:table-cell;*display:block;*position:relative;width:200px;height:200px;text-align:center;vertical-align:middle;}  
2.#test p{*position:absolute;*top:50%;*left:50%;margin:0;}  
3.#test p img{*position:relative;*top:-50%;*left:-50%;vertical-align:middle;}    
#test是img的祖父节点，p是img的父节点。Know More：未知尺寸的图片如何水平垂直居中
如何让某个元素充满整个页面
[css] view plaincopyprint?
1.html,body{height:100%;margin:0;}#test{height:100%;}  
禁用调整文本框大小
[css] view plaincopyprint?
1.textarea {  
2.      resize: none;  
3.}  
广告图直角变圆角
[css] view plaincopyprint?
1.外层div {  
2.      border-radius:6px;overflow:hidden  
3.}  
子层一个左浮动，一个右浮动，父层清浮动
使用css制作正三角和倒三角
[css] view plaincopyprint?
1..triangle_up {position:absolute; left:0; top:0;width:0;height:0;overflow:hidden;border-left:4px solid transparent; border-right:4px solid transparent;border-bottom:4px solid #ca0309;_border-left:4px solid #fff;_border-right:4px solid #fff; cursor: pointer;}  
2..triangle_down {position:absolute; left:0; top:0;width:0;height:0;overflow:hidden;border-left:4px solid transparent; border-right:4px solid transparent;border-top:4px solid #ca0309;_border-left:4px solid #fff;_border-right:4px solid #fff; cursor: pointer;}  
