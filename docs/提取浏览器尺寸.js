/*
body是DOM对象里的body子节点，即 <body> 标签；
documentElement 是整个节点树的根节点root，即<html> 标签；

没使用DTD情况即怪异模式BackCompat下：
复制代码 代码如下:

document.documentElement.clientHeight=0document.body.clientHeight=618

使用DTD情况即标准模式CSS1Compat下：
复制代码 代码如下:

document.documentElement.clientHeight=618 document.body.clientHeight=28(表示内容的高度)

因此提取浏览器的尺寸是要注意了。可以参考以下代码：
*/

if (document.compatMode == "BackCompat") {
cWidth = document.body.clientWidth;
cHeight = document.body.clientHeight;
sWidth = document.body.scrollWidth;
sHeight = document.body.scrollHeight;
sLeft = document.body.scrollLeft;
sTop = document.body.scrollTop;
}
else { //document.compatMode == "CSS1Compat"
cWidth = document.documentElement.clientWidth;
cHeight = document.documentElement.clientHeight;
sWidth = document.documentElement.scrollWidth;
sHeight = document.documentElement.scrollHeight;
sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft;
sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop;
} 