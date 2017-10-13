select默认样式美化代码兼容移动端和pc端
来源：互联网 作者：佚名 时间：07-16 17:42:56 【大 中 小】 
在搞前端时发现select样式已经丑到爆了。于是找了一些资源对其进行美化，个人感觉是相当不错的，最起码兼容移动端和pc端，这可是它的优势哦
最近在搞前端时发现select样式已经丑到爆了，找了一些资源修改了一下，稍微好了一点。废话不说了直接上代码 
复制代码
代码如下:

<div class="select" style="margin-top:0px;outline:none;border:1px solid #BBBBBB;border-radius:4px;position:relative;"> 
<select id="orderTimeDataSel" class="text" style="height:40px;-webkit-appearance:none;appearance:none;border:none;font-size:18px;padding:0px 10px;display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;background-color: #FFFFFF;color:#333333;border-radius:4px;"> 
<option>--预约日期--</option> 
</select> 
</div> 
