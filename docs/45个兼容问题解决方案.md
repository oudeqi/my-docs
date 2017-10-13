1. 默认的内外边距不同
问题：
各个浏览器默认的内外边距不同
解决：
*{margin:0;padding:0;}
 
2. 水平居中的问题
问题：
设置 text-align: center   
ie6-7文本居中，嵌套的块元素也会居中
ff /opera /safari /ie8文本会居中，嵌套块不会居中
解决：
块元素设置 
1、margin-left:auto;margin-right:auto
2、margin:0 auto;
3、<div align=”center”></div>
3. 垂直居中的问题
问题：
在浏览器中 想要垂直居中，设置vertical-align:middle; 不起作用。例如：ie6下文本与文本输入框对不齐，需设置vertical-align:middle，但是文本框的内容不会垂直居中
解决：
给容器设置一个与其高度相同的行高
line-height:与容器的height一样
4. 关于高度问题
问题：
如果是动态地添加内容，高度最好不要定义。浏览器可以自动伸缩，然而如果是静态的内容，高度最好定好。
如果设定了高度，内容过多时，ie6下会自动增加高度、其他浏览器会超出边框
解决：
1.设置overflow:hidden;
2.高度自增height:auto!important;height:100px;  
 
5. IE6 默认的div高度
问题：
ie6默认div高度为一个字体显示的高度，所在ie6下div的高度大于等于一个字的高度，因此在ie6下定义高度为1px的容器，显示的是一个字体的高度
解决：
为这个容器设置下列属性之一
1、设置overflow:hidden;
2、设置line-height:1px;
3、设置zoom:0.08
 
6. IE6 最小高度(宽度)的问题
问题：
ie6不支持min-height、min-width属性，默认height是最小高度，width是最小宽度。
解决：
使用ie6不支持但其余浏览器支持的属性!important。
设置属性min-height:200px; height:auto !important; height:200px;  
 
7. td高度的问题
问题：
table中td的宽度都不包含border的宽度，但是oprea和ff中td的高度包含了border的高度
解决：
设置line-height和height一样。在ie中如果td中的没有内容，那么border将不会显示
8. div嵌套p时，出现空白行
问题：
div中显示<p>文本</p>，ff、oprea、Chrome：top和bottom都会出现空白行，但是在ie下不会出现空白行。
解决：
设置p的margin:0px，再设置div的padding-top和padding-bottom
9. IE6-7图片下面有空隙的问题
问题：
块元素中含有图片时，ie6-7中会出现图片下有空隙
解决：  
1、在源代码中让</div>和<img>在同一行
2、将图片转换为块级对象display:block;
3、设置图片的垂直对齐方式  vertical-align:top/middle/bottom
4、改变父对象的属性，如果父对象的宽、高固定，图片大小随父对象而定，那么可以对父元素设置： overflow:hidden; 
5、设置图片的浮动属性  float:left;
10. IE6双倍边距的问题
问题：
ie6中设置浮动，同时又设置margin时，会出现双倍边距的问题
例float:left;width:100px;margin:0 100px; 
解决：
设置display:inline;
 
11. IE6 weidth为奇数，右边多出1px的问题
问题：
父级元素采用相对定位，且宽度设置为奇数时，子元素采用绝对定位，在ie6中会出现右侧多出1像素 
解决：
将宽度的奇数值改成偶数
 
12. IE6两个层之间3px的问题
问题：
左边层采用浮动，右边没有采用浮动，这时在ie6中两层之间就会产生3像素的间距
解决：
1、右边层也采用浮动  float
2、左边层添加属性  margin-right:-3px;
 
13. IE6 子元素绝对定位的问题
问题：
父级元素使用padding后，子元素使用绝对定位，不能精确定位
解决：
在子元素中设置  _left:-20px; _top:-1px;
 
14. 显示手型cursor:hand
问题：
ie6/7/8、opera       都支持  但是safari 、 ff 不支持
解决：
写成 cursor:pointer;  (所有浏览器都能识别)   
 
15. IE6-7 line-height失效的问题
问题：
在ie中img与文字放一起时， line-height不起作用  
解决：
都设置成float
16. td自动换行的问题
问题：
Table宽度固定，td自动换行
解决：
设置Table的table-layout:fixed，td的word-wrap:break-word
17. 子容器浮动后，父容器扩展问题
问题：
子容器都float以后，父容器没有设定高度,父容器将不会扩展
解决：
只需要添加一个clear:both的div，代码如下：
<div style="border:1px solid #333;width:204px">
    <div style="width:100px;border:1px solid #333; float:left; ">子容器a</div>
    <div style="width:100px;border:1px solid #333; float:left;">子容器b</div>
    <div style="clear:both"></div>
</div>
18. 透明png图片会带背景色
问题：
在ie6下透明的png图片会带一个背景色
解决：
background-image: url(icon_home.png);/* 其他浏览器 */
background-repeat: no-repeat;
_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src='icon_home.png'); /* IE6 */
_background-image: none; /* IE6 */
19. list-style-position默认值的问题
问题：
ie下list-style-position默认为inside,   firefox默认为outside
解决：
css中指定为outside即可解决兼容性问题
 
20. list-style-image准确定位的问题
问题：
li前设置图片时，图片与其后的文字对齐问题
解决：
1、采用背景定位 和 字符缩进的方法
background:url() no-repeat left center; text-index:16px;
2、采用相对定位方法
li 设置list-style:url();
li的子元素position:relative;top:-5px;
21. ul标签默认值的问题
问题：
ul标签在ff中默认是有padding值的,而在ie中只有margin有值
解决：
定义ul{margin:0;padding:0;}就能解决大部分问题
22. IE中li指定高度后，出现排版错误
问题：
在ie下如果为li指定高度可能会出现排版错位
解决：
设置line-height
23. ul或li浮动后，显示在div外
问题：
div中的ul或li设置float以后，都不在div中
解决：
必须在ul标签后加<div style="clear:both"></div>来闭合外层div
24. ul浮动后，margin变大
问题：
ul设置 float后，在ie中margin将变大
解决：
设置ul的display:inline，li的list-style-position:outside
25. li浮动后，margin变大
问题：
li设置 float后，在ie中margin将变大
解决：
设置li的display:inline
26. 嵌套使用ul、li的问题
问题： 
ie的bug，嵌套使用ul、li时，里层的li设置float以后，外层li不设置float, 里面的ul顶部和它外面的li总是有一段间距
解决：
设置里面的ul的zoom:1
 
27. IE6-7 li底部有3px的问题
问题：
这个bug产生的充要条件是li的子元素浮动并且li设置了以下CSS属性之一：width、height、zoom、padding-top、padding-bottom、margin-top、margin-bottom。
解决：
1、div设置clear:left|both，这时li不能设置width、height、zoom。 
2、li设置float:left，这时li可以设置width、height、zoom。 
3、li设置clear:left|both，这时li不能设置width、height、zoom。 
4、IE6/IE7的这个Bug可以通过给li中的div设置vertical-align:top|middle|bottom解决。
 
28. IE6 垂直列表间隙的问题
问题：
li中有a且设置display:block时，ie6中列表间会出现空隙
解决：
1、li中加display:inline;
2、li使用float  然后 clear:both;
3、给包含的文本末尾添加一个空格
4、设置width
 
29. IE6 列表背景颜色失效的问题
问题：
当父元素设置position:relative;时，在ie6中第一个ul、ol、dl的背景颜色失效
解决：
ul、ol、dl 都设置为position:relative;
 
30. IE6-7 列表背景颜色失效的问题2
问题：
做横向导航栏时，ul设置为float且有背景色，li设置为float。ie6-7背景颜色失效
解决：
很多ie的bug都可以通过触发layout来解决 ul添加属性
1、height:1%;
2、float:left;
3、zoom:1;
 
31. 列表不能换行的问题
问题：
li设置为浮动，后面的li紧随其后，不能换行
解决：
1、为这个ul定义合适的宽高
2、给包含这个ul 的父div定义合适的宽高。
 
32. li中的内容以省略号显示
问题：
li中内容超过长度时，想以省略号显示， 此方法适用于ie6-7-8、opera、safari浏览器 
ff浏览器不支持
解决：
li{width:200px; white-space:nowrap;text-overflow:ellipsis; 
-o-text-overflow:ellipsis; overflow: hidden; }
 
33. 超链接访问过后hover样式不出现的问题
问题：
点击超链接后，hover、active样式没有效果
解决：
改变CSS属性的排列顺序: L-V-H-A  
 
34. 禁用中文输入法的问题
问题：
不能在输入框中输入汉字
解决：
只在ie系列 和ff中有效
ime-mode:disabled    (但可以粘贴)
禁用粘贴：
onpaste="return false"
 
35. 除去滚动条的问题
问题：
隐藏滚动条
解决：
1、只有ie6-7支持<body scroll="no">
2、除ie6-7不支持 body{overflow:hidden}
3、所有浏览器 html{overflow:hidden}
 
36. 让层显示在FLASH之上
问题：
 想让层的内容显示在flash上
解决：
把FLASH设置透明
1、<param name=" wmode " value="transparent" />
2、<param name="wmode" value="opaque"/>
 
37. 去除链接虚线边框的问题
问题：
当点击超链接后，ie6/7/8  ff会出现虚线边框 ,而opera、safari没有虚线边框
解决：
ie6/7中 设置为a { blr:expression(this.onFocus=this.blur()) } 
ie8 和 ff 都不支持expression  在ie8 、ff中设置为  :focus { outline: none; }
 
38. css滤镜的问题
问题：
css滤镜只在ie中有效，Firefox, Safari(WebKit), Opera只能够设置透明，它们不支持滤镜filter，无法实现图片切换中间变换的效果，只能通过透明度来设置。
解决：
ff中设置透明度   -moz-opacity:0.10;  opacity:0.6;
ie中只设置filter:alpha(opacity=50); 时，ie6-7失效，还要设置
1、zoom:1;  2、width:100%;
 
39. IE6背景闪烁的问题
问题：
链接、按钮用CSS sprites作为背景，在ie6下会有背景图闪烁的现象。原因是:IE6没有将背景图缓存，每次触发hover的时候都会重新加载
解决：
可以用JavaScript设置ie6缓存这些图片：
document.execCommand("BackgroundImageCache ",false,true);
 
40. 出现重复文字的问题
问题：
<div style="width:400px">
  <div style="float:left"></div>
  <!– _ –>
  <div style="float:right;width:400px">↓这就是多出来的那只猪</div>
</div>
解决：
1、  改变结构，不出现【一个容器包含2两个具有“float”样式的子容器】的结构。
2、减小第二个容器的宽度，使父容器宽度减去第二个容器宽度的值大于3
3、去掉所有的注释。
4、修正注释的写法。<!--[if !IE]>这里是注释内容<![endif]-->
5、在第二个容器后面加一个或者多个<div style="clear"></div>来解决。
41. ff、chrome绝对定位无效
问题：
在IE给td设置position:relative，然后给它包含的一个容器使用position:absolute进行定位是有效的，但在FF和Chrome下却不可以。
解决：
设置td的display:block。
 
42. IE6 绝对定位的问题
问题：
<div style="position:relative;border:1px solid orange;text-align:center;">
<div style="position:absolute;top:0;left:0;
background:#CCC;">dovapour</div>
<a href="#" title="vapour的blog">内容</a>
</div>
解决：
left的定位错误问题
1、给父层设置zoom:1触发layout。 
2、给父层设置宽度width
 
bottom的定位错误问题
1、给父层设置zoom:1触发layout。 
2、给父层设置高度height
 
43. 子容器宽度大于父容器宽度时，内容超出
问题：
子DIV的宽度和父DIV的宽度都已经定义，在IE6中如果其子DIV的宽度大于父DIV的宽度，父DIV的宽度将会被扩展，在其他浏览器中父DIV的宽度将不会扩展，子DIV将超出父DIV
解决：
设置overflow:hidden，子DIV将不会超出父DIV。
44. float的div闭合的问题
问题： 
例如：<#div id=”floatA” ><#div id=”floatB” ><#div id=” NOTfloatC” >这里的NOTfloatC并不希望继续平移，而是希望往下排。(其中floatA、floatB的属性已经设置为 float:left;)   
这段代码在IE中毫无问题，问题出在其他浏览器中。原因是NOTfloatC并非float标签，必须将float标签 闭合。
解决：
在 <#div class=”floatB”> <#div class=”NOTfloatC”>之间加上 < #div class=”clear”>这个div一定要注意位置，而且必须与两个具有float属性的div同级，之间不能存在嵌套关系，否则会 产生异常。并且将clear这种样式定义为为如下即可：.clear{ clear:both;}
 
45. 单选框、复选框与后面的文字对不齐
问题： 
单选框、复选框与后面的文字对不齐。
解决：
.align{font-size:12px;}
.align input{ display:block; float:left;}
.align label{ display:block; float:left; padding-top:3px; *padding-top:5px;}
