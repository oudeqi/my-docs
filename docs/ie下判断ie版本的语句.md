IE下判断IE版本的语句...[if lte IE 8]……[endif]
<!--[if lte IE 6]>
<![endif]-->
IE6及其以下版本可见

<!--[if lte IE 7]>
<![endif]-->
IE7及其以下版本可见

<!--[if IE 6]>
<![endif]-->
只有IE6版本可见

<![if !IE]>
<![endif]>
除了IE以外的版本

<!--[if lt IE 8]>
<![endif]-->
IE8以下的版本可见


<!--[if gte IE 7]>
<![endif]-->
IE7及大于IE7的版本可见


用法：
（1）
可使用如下代码检测当前IE浏览器的版本（注意：在非IE浏览器中是看不到效果的）
 <!––[if IE]>
       <h1>您正在使用IE浏览器</h1>
       <!––[if IE 5]>
           <h2>版本 5</h2>
       <![endif]––>
       <!––[if IE 5.0]>
           <h2>版本 5.0</h2>
       <![endif]––>
       <!––[if IE 5.5]>
           <h2>版本 5.5</h2>
       <![endif]––>
       <!––[if IE 6]>
           <h2>版本 6</h2>
       <![endif]––>
       <!––[if IE 7]>
           <h2>版本 7</h2>
       <![endif]––>
<![endif]––>
那如果当前的浏览器是IE，但版本比IE5还低，该怎么办呢，可以使用<!–[if ls IE 5]>，当然，根据条件注释只能在IE5+的环境之下，所以<!–[if ls IE 5]>根本不会被执行。
lte：就是Less than or equal to的简写，也就是小于或等于的意思。
lt ：就是Less than的简写，也就是小于的意思。
gte：就是Greater than or equal to的简写，也就是大于或等于的意思。
gt ：就是Greater than的简写，也就是大于的意思。
! ： 就是不等于的意思，跟javascript里的不等于判断符相同


（2）
应该如何应用条件注释
    本文一开始就说明了，因为IE各版本的浏览器对我们制作的WEB标准的页面解释不一样，具体就是对CSS的解释不同，我们为了兼容这些，可运用条件注释来各自定义，最终达到兼容的目的。比如：
<!–- 默认先调用css.css样式表 –->
<link rel="stylesheet" type="text/css" href="css.css" />
<!-–[if IE 7]>
<!–- 如果IE浏览器版是7,调用ie7.css样式表- –>
<link rel="stylesheet" type="text/css" href="ie7.css" />
<![endif]–->
<!–-[if lte IE 6]>
<!–- 如果IE浏览器版本小于等于6,调用ie.css样式表 -–>
<link rel="stylesheet" type="text/css" href="ie.css" />
<![endif]–>

    这其中就区分了IE7和IE6向下的浏览器对CSS的执行，达到兼容的目的。同时，首行默认的css.css还能与其他非IE浏览器实现兼容。
    注意：默认的CSS样式应该位于HTML文档的首行，进行条件注释判断的所有内容必须位于该默认样式之后。
    比如如下代码，在IE浏览器下执行显示为红色，而在非IE浏览器下显示为黑色。如果把条件注释判断放在首行，则不能实现。该例题很能说明网页对IE浏览器和非IE浏览器间的兼容性问题解决。
<style type="text/css">
body{
background-color: #000;
}
</style>
<!-–[if IE]>
<style type="text/css">
body{
background-color: #F00;
}
</style>
<![endif]–->

    同时，有人会试图使用<!–-[if !IE]>来定义非IE浏览器下的状况，但注意：条件注释只有在IE浏览器下才能执行，这个代码在非IE浏览下非单不是执行该条件下的定义，而是当做注释视而不见。
    正常就是默认的样式，对IE浏览器需要特殊处理的，才进行条件注释。在HTML文件里，而不能在CSS文件中使用。
现在的DWcs4里面，已经装备了这些注释：在“窗口-->代码片段-->注释”里。其他的版本没太注意到。
