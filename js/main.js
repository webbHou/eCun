var con = document.getElementById('con');
var slide = document.getElementById('slide');
var scrol_box = document.getElementById('scrol_box');
var files = document.getElementById('files');
var files_con = document.getElementById('files_con');

var slide2 = document.getElementById('slide2');
var scrol_box2 = document.getElementById('scrol2_box');
var files2 = document.getElementById('files2');
var files_con2 = document.getElementById('files_con2');


window.onresize = slided;

//滚动条
slided();
function slided(){
con.style.height = document.documentElement.clientHeight-62+'px';
files.style.height = document.documentElement.clientHeight-200+'px';
files2.style.height = document.documentElement.clientHeight-122+'px';
				slide.style.height = getpos(files).height/getpos(files_con).height*getpos(scrol_box).height+'px';
				slide2.style.height = getpos(files2).height/getpos(files_con2).height*getpos(scrol_box2).height+'px';
				var s = getpos(files2).height/getpos(files_con2).height;
				var h = getpos(files).height/getpos(files_con).height;
				if(s<1){
					slide2.style.display = 'block';
					scrol_box2.style.display = 'block';
				}else{
					slide2.style.display = 'none';
					scrol_box2.style.display = 'none';
				}
				if(h<1){
					slide.style.display = 'block';
					scrol_box.style.display = 'block';
				}else{
					slide.style.display = 'none';
					scrol_box.style.display = 'none';
				}
			} 


slide2.onmousedown = function(ev){
	document.documentElement.style.cursor = 'default';
				ev.preventDefault();
				var disy = ev.clientY - this.offsetTop;
				document.onmousemove = function(ev){
					var y = ev.clientY-disy;
					var maxy = scrol_box2.clientHeight - slide2.offsetHeight;
					if(y<0)y=0;
					if(y>maxy)y=maxy;
					scale = y/maxy;
					slide2.style.top = y+'px';
					value = (getpos(files2).height-getpos(files_con2).height)*scale;
					files_con2.style.top = value+'px';
				}
				document.onmouseup = function(){
					document.onmousemove = null;
				}
}
slide.onmousedown = function(ev){
				document.documentElement.style.cursor = 'default';
				ev.preventDefault();
				var disy = ev.clientY - this.offsetTop;
				console.log(getpos(this));
				document.onmousemove = function(ev){
					var y = ev.clientY-disy;
					var maxy = scrol_box.clientHeight - slide.offsetHeight;
					if(y<0)y=0;
					if(y>maxy)y=maxy;
					scale = y/maxy;
					slide.style.top = y+'px';
					value = (getpos(files).height-getpos(files_con).height)*scale;
					files_con.style.top = value+'px';
				}
				document.onmouseup = function(){
					document.onmousemove = null;
				}
			}
			
			files.onmousewheel = fn;
			files.addEventListener('DOMMouseScroll',fn);
			files2.onmousewheel = fn2;
			files2.addEventListener('DOMMouseScroll',fn2);
			function getpos(obj){
				return obj.getBoundingClientRect();
			}
			
			function fn(ev){
				var datile;
				if(ev.wheelDelta){
					datile = ev.wheelDelta;
				}else{
					datile = -ev.detail;
				}
				var num = 10;
				var top = slide.offsetTop;
				var max = scrol_box.clientHeight - slide.offsetHeight;
				if(datile<0){
					top += 10;
				}else{
					top-=10;
				}
				if(top<0)top=0;
				if(top>max)top=max;
				slide.style.top = top+'px';
				var scale = top/max;
				value = (getpos(files).height-getpos(files_con).height)*scale;
					files_con.style.top = value+'px';
				//阻止默认行为
				ev.preventDefault();
				return false;
			}
			
			function fn2(ev){
				var datile;
				if(ev.wheelDelta){
					datile = ev.wheelDelta;
				}else{
					datile = -ev.detail;
				}
				var num = 10;
				var top = slide2.offsetTop;
				var max = scrol_box2.clientHeight - slide2.offsetHeight;
				if(datile<0){
					top += 10;
				}else{
					top-=10;
				}
				if(top<0)top=0;
				if(top>max)top=max;
				slide2.style.top = top+'px';
				var scale = top/max;
				value = (getpos(files2).height-getpos(files_con2).height)*scale;
					files_con2.style.top = value+'px';
				//阻止默认行为
				ev.preventDefault();
				return false;
			}

//add添加板块
var add = document.getElementById('add');
var ul = add.getElementsByTagName('ul')[0];
var li = ul.getElementsByTagName('li');
var timer;
add.onmouseover = function(){
	ul.style.display = 'block'
	clearTimeout(timer);
	mTween(ul,{
		top: {
			target:50,//目标位置
			duration:500,//运动时间
			fx:'linear',//运动方式
		},
		opacity:{
			target:100,
			duration:500,
			fx:'easeBothStrong'
		}
	});
}
add.onmouseout = function(){
	timer = setTimeout(function(){
		mTween(ul,{
			top: {
				target:30,//目标位置
				duration:300,//运动时间
				fx:'linear',//运动方式
			},
			opacity:{
				target:0,
				duration:300,
				fx:'easeBothStrong'
			}
		},function(){
			ul.style.display = 'none';
		});
	},400);
	
}
ul.onmousemover = function(){
	clearTimeout(timer);
}
ul.onmousemout = function(){
	timer = setTimeout(function(){
		mTween(ul,{
			top: {
				target:30,//目标位置
				duration:300,//运动时间
				fx:'linear',//运动方式
			},
			opacity:{
				target:0,
				duration:300,
				fx:'easeBothStrong'
			}
		},function(){
			ul.style.display = 'none';
		});
	},400)
}
for(var i=0;i<li.length;i++){
	li[i].onmouseover = function(){
		this.style.backgroundColor = 'rgba(80,153,244,.4)';
	}
	li[i].onmouseout = function(){
		this.style.backgroundColor = '';
	}
}

