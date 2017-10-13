$(function(){
	var $canvas = $('#canvas_1').get(0);
	if(!$canvas){
		return false;
	}
	var context = $canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	context.fillStyle = 'rgba(255,0,0,0.5)';
	context.strokeStyle = 'blue';
	context.lineWidth = 1;
	context.fillRect(50,50,100,100);
	context.strokeRect(50,50,100,100);
	context.clearRect(50,50,20,20);
});

$(function(){
	var $canvas = $('#canvas_2').get(0);
	if(!$canvas){
		return false;
	}
	var context = $canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	/*for(var i=0;i<10;i++){
		context.beginPath();
		context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
		context.closePath();
		context.fillStyle = 'rgba(255,0,0,0.25)';
		context.fill();
	}*/
		context.beginPath();
		context.arc(150,150,50,0,Math.PI*2,true);
		context.closePath();
		context.fillStyle = 'rgba(255,0,0,0.25)';
		context.fill();
	
});

$(function(){
	var $canvas = $('#canvas_3').get(0);
	if(!$canvas){
		return false;
	}
	var context = $canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	var dx = 150;
	var dy = 150;
	var s = 100;
	
	context.beginPath();
	context.fillStyle = 'rgb(100,255,100)';
	context.strokeStyle = 'rgb(0,0,100)';
	var x = Math.sin(0);//0
	var y = Math.cos(0);//1
	var dig = Math.PI/15*11;
	for(var i=0;i<30;i++){
		var x = Math.sin(i*dig);
		var y = Math.cos(i*dig);
		context.lineTo(dx+x*s,dy+y*s);
	}
	
	context.closePath();
	context.fill();
	context.stroke();	
});

$(function(){
	var $canvas = $('#canvas_4').get(0);
	if(!$canvas){
		return false;
	}
	var context = $canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	var dx = 150;
	var dy = 150;
	var s = 100;
	
	context.beginPath();
	context.fillStyle = 'rgb(100,255,100)';
	context.strokeStyle = 'rgb(0,0,100)';
	var x = Math.sin(0);//0
	var y = Math.cos(0);//1
	var dig = Math.PI/15*11;
	for(var i=0;i<30;i++){
		var x = Math.sin(i*dig);
		var y = Math.cos(i*dig);
		context.quadraticCurveTo(dx+x*s+100,dy+y*s,dx+x*s,dy+y*s);
		//context.bezierCurveTo(dx+x*s,dy+y*s-100,dx+x*s+100,dy+y*s,dx+x*s,dy+y*s);
		
	}
	context.closePath();
	
	context.fill();
	context.stroke();	
});

$(function(){
	var $canvas = $('#canvas_5').get(0);
	if(!$canvas){
		return false;
	}
	var context = $canvas.getContext('2d');
	var linearGradient = context.createLinearGradient(0,0,0,300);
	linearGradient.addColorStop(0,'rgb(255,255,0)');
	linearGradient.addColorStop(1,'rgb(0,255,255)');
	context.fillStyle = linearGradient;
	context.fillRect(0,0,400,300);
	
	var linearGradient2 = context.createLinearGradient(0,0,300,0);
	linearGradient2.addColorStop(0,'rgba(0,0,255,0.5)');
	linearGradient2.addColorStop(1,'rgba(255,0,0,0.5)');
	for(var i=0; i<10;i++){
		context.beginPath();
		context.fillStyle = linearGradient2;
		context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}
});

$(function(){
	var $canvas = $('#canvas_6').get(0);
	if(!$canvas){
		return false;
	}
	var context = $canvas.getContext('2d');
	var linearGradient = context.createRadialGradient(400,0,0,400,0,400);
	linearGradient.addColorStop(0.1,'red');
	linearGradient.addColorStop(0.3,'green');
	linearGradient.addColorStop(1,'blue');
	context.fillStyle = linearGradient;
	context.fillRect(0,0,400,300);
	/*
	var linearGradient2 = context.createRadialGradient(255,255,0,255,255,300);
	linearGradient2.addColorStop(0.1,'rgba(255,0,0,0.5)');
	linearGradient2.addColorStop(0.7,'rgba(255,255,0,0.5)');
	linearGradient2.addColorStop(1,'rgba(0,0,255,0.5)');
	for(var i=0; i<10;i++){
		context.beginPath();
		context.fillStyle = linearGradient2;
		context.arc(i*25,i*25,i*10,0,Math.PI*2,true);
		context.closePath();
		context.fill();
	}*/
});




function draw(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	context.translate(200,50);
	context.fillStyle = 'rgba(255,0,0,0.25)';
	for(var i=0;i<50;i++){
		context.translate(25,25);
		context.scale(0.95,0.95);
		context.rotate(Math.PI/10);
		context.fillRect(0,0,100,50);
	}
}

function draw2(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	context.translate(200,50);
	for(var i=0;i<50;i++){
		context.translate(25,25);
		context.scale(0.95,0.95);
		context.rotate(Math.PI/10);
		create5Star(context);
		context.fill();
	}
}

function create5Star(context){
	var n = 0;
	var dx = 100;
	var dy = 0;
	var s = 50;
	
	context.beginPath();
	context.fillStyle = 'rgba(255,0,0,0.5)';
	var x = Math.sin(0);
	var y = Math.cos(0);
	var dig = Math.PI/5*4;
	for(var i=0;i<5;i++){
		var x = Math.sin(i*dig);
		var y = Math.cos(i*dig);
		context.lineTo(dx+x*s,dy+y*s);
	}
	context.closePath();
}

function draw3(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	var options = new Array(
	"source-atop",
	"source-in",
	"source-out",
	"source-over",
	"destination-atop",
	"destination-in",
	"destination-out",
	"destination-over",
	"lighter",
	"copy",
	"xor");
	var i=3;
	context.fillStyle = 'blue';
	context.fillRect(10,10,60,60);
	context.globalCompositeOperation = options[i];
	context.beginPath();
	context.fillStyle = 'red';
	context.arc(60,60,30,0,Math.PI*2,false);
	context.fill();
	
}

function draw3(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	context.shadowOffsetX = 10;
	context.shadowOffsetY = 10;
	context.shadowColor = 'rgba(0,0,0,1)';
	context.shadowBlur = 7.5;
	context.translate(0,50);
	for(var i=0;i<3;i++){
		context.translate(50,50);
		create5Star(context);
		context.fill();
	}
}

function draw4(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	
	var img = new Image();
	img.src = './img/1.gif';
	img.onload = function(){
		drawImg(context,img);
	}
}

function drawImg(context,img){
	for(var i=0;i<=4;i++){
		context.drawImage(img,0,0,100,100,i*50,i*50,50,50);
	}
}

function draw5(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	
	var img = new Image();
	img.src = './img/1.gif';
	img.onload = function(){
		drawImg2(canvas,context,img);
	}
}

function drawImg2(canvas,context,img){

	var scale = 3;
	var width2 = img.width/scale;
	var height2 = img.height/scale;
	var x = canvas.width/width2;
	var y = canvas.height/height2;
	
	for(var i=0;i<x;i++){
		for(var j=0;j<y;j++){
			context.drawImage(img,i*width2,j*height2,width2,height2);
		}
	}
}

function draw6(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '#eeffff';
	context.fillRect(0,0,400,300);
	
	var img = new Image();
	img.src = './img/1.gif';
	img.onload = function(){
		var pattern = context.createPattern(img,'repeat');
		context.fillStyle = pattern;
		context.fillRect(0,0,400,300);
		
	}
	
}

function draw7(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.save();
	var gr = context.createLinearGradient(0,400,300,0);
	gr.addColorStop(0,'rgb(255,255,0)');
	gr.addColorStop(1,'rgb(0,255,255)');
	context.fillStyle = gr;
	context.fillRect(0,0,400,300);
	
	var img = new Image();
	img.onload = function(){
		drawImg3(context,img);
		context.restore();
		context.drawImage(img,200,200,100,100);
	}
	img.src = './img/1.gif';
}

function drawImg3(context,img){
	create5StarClip(context);
	context.drawImage(img,-50,-150,300,300);
}
function create5StarClip(context){
	var n = 0;
	var dx = 100;
	var dy = 0;
	var s = 150;
	context.beginPath();
	context.translate(50,100);
	var x = Math.sin(0);
	var y = Math.cos(0);
	var dig = Math.PI/5*4;
	for(var i=0;i<5;i++){
		var x = Math.sin(i*dig);
		var y = Math.cos(i*dig);
		context.lineTo(dx+x*s,dy+y*s);
	}
	context.clip();	
}

function draw8(id){
	var canvas = document.getElementById(id);
	if(canvas == null){
		return false;
	}
	var context = canvas.getContext('2d');
	var img = new Image();
	img.src = './img/1.gif';
	img.onload = function(){
		context.drawImage(img,0,0);
		var imgData = context.getImageData(0,0,img.width,img.height);
		
		for(var i=0,n=imgData.data.length; i<n; i+=4){
			imgData.data[i+0] = 255-imgData.data[i+0];
			imgData.data[i+1] = 255-imgData.data[i+1];
			imgData.data[i+2] = 255-imgData.data[i+2];
		}
		context.putImageData(imgData,0,0);
	}
}

function draw9(id){
	var canvas = document.getElementById(id);
	if(canvas == null)return false;
	var context = canvas.getContext('2d');
	context.fillStyle = '00f';
	context.font = 'bold 50px sans-serif';
	context.textBaseline = 'top';
	context.fillText('我是蚊子',0,0);
	context.strokeText('我也是蚊子',0,100);
	
	var text = '文字的宽度为：';
	context.font = 'bold 30px sans-serif';
	var tml = context.measureText(text);
	context.strokeText(text,0,200);
	context.strokeText(tml.width,tml.width+10,200);
	
	//window.open(canvas.toDataURL('image/jpeg'));
	
}
function draw10(id){
	var currentX = 0;
	var currentY = 0;
	var canvas = document.getElementById(id);
	if(!canvas){return false;}
	var context = canvas.getContext('2d');
	var img = new Image();
	
	img.onload = function(){
		context.drawImage(img,0,0,100,100,currentX,currentY,50,50);
	}
	img.src='./img/1.gif';

	document.onkeypress = function(e){
		var ev = window.event||e;
		//alert(ev.keyCode);
		switch(ev.keyCode){
			case 37:
				context.clearRect(0,0,canvas.width,canvas.height);
				currentX-=15;
				if(currentX<0){
					currentX=0;
				}
				context.drawImage(img,0,0,100,100,currentX,currentY,50,50);
				break;
			case 38:
				context.clearRect(0,0,canvas.width,canvas.height);
				currentY-=15;
				if(currentY<0){
					currentY=0;
				}
				context.drawImage(img,0,0,100,100,currentX,currentY,50,50);
				break;
			case 39:
				context.clearRect(0,0,canvas.width,canvas.height);
				currentX+=15;
				if(currentX>canvas.width){
					currentX=canvas.width;
				}
				context.drawImage(img,0,0,100,100,currentX,currentY,50,50);
				break;
			case 40:
				context.clearRect(0,0,canvas.width,canvas.height);
				currentY+=15;
				if(currentY>canvas.height){
					currentY=canvas.height;
				}
				context.drawImage(img,0,0,100,100,currentX,currentY,50,50);
				break;
		}
	}

}



$(function(){
	draw('canvas_7');
	draw2('canvas_8');
	draw3('canvas_9');
	draw4('canvas_10');
	draw5('canvas_11');
	draw6('canvas_12');
	draw7('canvas_13');
	draw8('canvas_14');
	draw9('canvas_15');
	draw10('canvas_16');
});







