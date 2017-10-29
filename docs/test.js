function load(method, url, fn){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200){
			fn(xmlhttp.responseText);
		}
	}
	xmlhttp.open(method || 'get', url, true);
	xmlhttp.send();
}

load('get', 'http://www.baidu.com',function(data){
	console.log(data);
})

vazr load = function(method, url, fn){
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			fn(xmlhttp.responseText);
		}
	}
	xmlhttp.open(method, url, true);
	xmlhttp.send();
}