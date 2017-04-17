//图片显示变量
var imgshow = document.getElementById('imgshow');
var img = imgshow.getElementsByTagName('img')[0];
var pages = imgshow.getElementsByTagName('a');
var close2 = imgshow.getElementsByTagName('span')[0];
var showname = imgshow.getElementsByTagName('p')[0];

//音乐显示变量
var musicshow = document.getElementById('musicshow');
var rotate = document.getElementById('rotate');
var process = document.getElementById('process');
var time = document.getElementById('time');
var volum = document.getElementById('volum');
var play = document.getElementById('play');
var playDiv = play.getElementsByTagName('div');
var volumDiv = volum.getElementsByTagName('div');
var processDiv = process.getElementsByTagName('div');
var musictime = time.getElementsByTagName('span');
var audios = musicshow.getElementsByTagName('audio')[0];
var songname = musicshow.getElementsByTagName('p')[0];
var close3 = document.getElementById('close');

//音乐显示
audios.volume = 0.5;
//关闭音乐
close3.onclick = function(){
	audios.pause();
	show(musicshow,-800);
	playDiv[1].style.backgroundImage = 'url(img/play.png)';
	clearInterval(timer2);
	clearInterval(timer);
	onoff5 = false;
}
var onoff5 = false;
var timer = null;
var timer2 = null;
var num6 = 0;
var num5 = 0;

//歌曲切换
playDiv[0].onclick = function(){
	num5--;
	songname.innerHTML = Music[num5%Music.length].name;
	audios.src = Music[num5%Music.length].src;
	rotate.style.backgroundImage = 'url('+Music[num5%Music.length].img+')';
	if(onoff5){
		audios.play();
	}
}
playDiv[2].onclick = function(){
	num5++;
	songname.innerHTML = Music[num5%Music.length].name;
	audios.src = Music[num5%Music.length].src;
	rotate.style.backgroundImage = 'url('+Music[num5%Music.length].img+')';
	if(onoff5){
		audios.play();
	}
}

//加载时获取总时间
window.onload = function(){
//获取总时间问题：放在window外获取为NaN
	musictime[1].innerHTML = zero(Math.floor(audios.duration/60))+':'+zero(Math.floor(audios.duration%60));	
}

//歌曲切换时触发改变总时间
audios.ondurationchange = function(){
	musictime[1].innerHTML = zero(Math.floor(audios.duration/60))+':'+zero(Math.floor(audios.duration%60));
}

//音量条拖拽
volumDiv[1].onmousedown = function(ev){
	ev.cancelBubble = true;
	var disx = ev.clientX - this.offsetLeft;
	document.onmousemove = function(ev){
		var left = ev.clientX - disx;
		if(left<0) left=-4;
		if(left>(volum.clientWidth-4)) left=(volum.clientWidth-4);
		volumDiv[1].style.left = left+'px';
		volumDiv[0].style.width = left+'px';
		audios.volume = left/volum.clientWidth;
	}
	document.onmouseup = function(){
		document.onmousemove = null;
	}
	return false;	
}

//歌曲进度条拖拽 
processDiv[1].onmousedown = function(ev){
	ev.cancelBubble = true;
	audios.pause();
	playDiv[1].style.backgroundImage = 'url(img/play.png)';
	clearInterval(timer);
	clearInterval(timer2);
	var disx = ev.clientX - this.offsetLeft;
	document.onmousemove = function(ev){
		var left = ev.clientX - disx;
		if(left<=-6) left=-6;
		if(left>(process.clientWidth-6)) left=(process.clientWidth-6);
		processDiv[1].style.left = left+'px';
		processDiv[0].style.width = left+'px';
		var now = left/process.clientWidth*audios.duration;
		audios.currentTime = now;
		musictime[0].innerHTML = zero(Math.floor(now/60))+':'+zero(Math.floor(now%60));
	}
	document.onmouseup = function(){
		document.onmousemove = null;
		if(onoff5){
			clearInterval(timer);
			clearInterval(timer2);
			audios.play();	
			playDiv[1].style.backgroundImage = 'url(img/pause.png)';
			timer2 = setInterval(function(){
				num==0;
				num6++;
				rotate.style.transform = 'rotate('+num6+'deg)';
			},30);
			timer = setInterval(function(){
				musictime[0].innerHTML = zero(Math.floor(audios.currentTime/60))+':'+zero(Math.floor(audios.currentTime%60));
				processDiv[0].style.width = audios.currentTime/audios.duration*process.clientWidth+'px';
				processDiv[1].style.left = audios.currentTime/audios.duration*process.clientWidth-2+'px';			
				if(audios.currentTime>=audios.duration){
					num5++;
					audios.src = Music[num5%Music.length].src;
					songname.innerHTML = Music[num5%Music.length].name;
					rotate.style.backgroundImage = 'url('+Music[num5%Music.length].img+')';
					audios.play();
				}
			},1000);
		}
	}
	return false;
}

//播放/暂停音乐
playDiv[1].onclick = function(){
	if(!onoff5){
		audios.play();
		this.style.backgroundImage = 'url(img/pause.png)';
		timer2 = setInterval(function(){
			num6++;
			rotate.style.transform = 'rotate('+num6+'deg)';
		},30);
		timer = setInterval(function(){
			musictime[0].innerHTML = zero(Math.floor(audios.currentTime/60))+':'+zero(Math.floor(audios.currentTime%60));
			processDiv[0].style.width = audios.currentTime/audios.duration*process.clientWidth+'px';
			processDiv[1].style.left = audios.currentTime/audios.duration*process.clientWidth-6+'px';
			if(audios.currentTime>=audios.duration){
				num5++;
				audios.src = Music[num5%Music.length].src;
				songname.innerHTML = Music[num5%Music.length].name;
				rotate.style.backgroundImage = 'url('+Music[num5%Music.length].img+')';
				audios.play();
			}
		},1000);
	}else{
		audios.pause();
		this.style.backgroundImage = 'url(img/play.png)';
		clearInterval(timer2);
		clearInterval(timer);	
	}
	onoff5 = !onoff5;
}


var files_con2 = document.getElementById('files_con2');
var files_con = document.getElementById('files_con');
var leftbar = files_con.getElementsByTagName('a');
var title = document.getElementById('title');
var tips = document.getElementById('tip');
var back = title.children;
var flag = true;
var all = document.getElementById('all');
all.onff = false;
var check = files_con2.querySelectorAll('.checkbox');	
var selec = document.getElementById('select');
var flodes = files_con2.querySelectorAll('.floder');
var a = selec.getElementsByTagName('a');
var num = document.getElementById('num');
var sum = 0;
var arr = data;
var flag2 = 1;
var list = [];
var near = [];
var Music=[];
var Image = [];
var Docu= [];
var Video=[];
var Note = [];
var recycle = [];

//初始化渲染(非列表显示)
render(data);
function render(data){
	files_con2.innerHTML = '';
	data.forEach(function(ele,index){
		var folder = document.createElement('div');
		folder.className = 'floder';
		var span1 = document.createElement('span');
		span1.className = 'f_bg';
		var span2 = document.createElement('span');
		span2.innerHTML = ele.name;
		var checked = document.createElement('div');
		var span3 = document.createElement('span');
		checked.className = 'checkbox';
		if(ele.file_type == 'floder'){
				span1.style.backgroundPosition = '-731px -383px';
		}
		if(flag){  //非列表模式
			if(ele.file_type.slice(0,5) == 'audio'){
				span1.style.backgroundPosition = '-957px -721px';
				folder.className += ' music';
				folder.ondblclick = function(){ //音乐双击打开播放器
					if(!ele.img){
						ele.img = 'pic/8.jpg';
					}
					near.indexOf(ele)>-1&&near.splice(near.indexOf(ele),1);
					near.unshift(ele);
					show(musicshow,0);
					audios.src = ele.src;
					songname.innerHTML = ele.name;
					rotate.style.backgroundImage = 'url('+ele.img+')';
					
				}
			}
			if(ele.file_type.slice(0,5) == 'image'){
				span1.style.backgroundPosition = '-567px -383px';
				folder.ondblclick = function(){	//图片双击展示
					near.indexOf(ele)>-1&&near.splice(near.indexOf(ele),1);
					near.unshift(ele);
					show(imgshow,0);
					img.src = ele.src;
					showname.innerHTML = ele.name;
				}
				folder.className += ' image';
			}
			if(ele.file_type.slice(-4) == 'word'){
				span1.style.backgroundPosition = '-761px -256px';
				folder.className += ' word';
			}
			if(ele.file_type.slice(-5) == 'excel'){
				span1.style.backgroundPosition = '-720px -256px';
				folder.className += ' excel';
			}
			if(ele.file_type.slice(-10) == 'powerpoint'){
				span1.style.backgroundPosition = '-702px -320px';
				folder.className += ' ppt';
			}
			if(ele.file_type.slice(0,4) == 'text'){
				span1.style.backgroundPosition = '-444px -383px';
				folder.className += ' note';
			}
		}else{  //列表模式
			folder.style.float = 'none';
			folder.style.marginLeft = '40px';
			folder.style.width = '90%';
			checked.style.display = 'block';
			checked.style.left = '-40px';
			checked.style.top = '14px';
			var task = document.createElement('div');
			task.id = 'task';
			task.innerHTML = '<span>'+ele.time+'</span><a href="javsript:;"></a><a href="javascript:;"><span  style="margin-top:13px;"></span>删除</a><a href="javascript:;"><span style="margin-top:13px;"></span>还原</a><a href="javascript:;"><span style="margin-top:13px;"></span>重命名</a><a href="javascript:;"><span style="margin-top:13px;"></span>移动到</a><a href="javascript:;"><span style="margin-top:13px;"></span>下载</a>';
			
			var task_a = task.getElementsByTagName('a');
			if(flag2 == 8){  //回收站模式
				task_a[2].style.display = 'block';
				task_a[5].style.display = 'none';
				//列表单条还原
				task_a[2].onclick = function(ev){
					ev.cancelBubble = true;
					find2(arr,(recycle.splice(index,1))[0]);
					sum = 0;
					show(selec,-60);
					render(recycle);
				}
			}
			//列表单条删除
			task_a[1].onclick = function(ev){
				console.log(ev);
				ev.cancelBubble = true;
				if(!confirm('确认删除该文件')) return;
				var data;
				if(flag2 != 8){
					data = changeDate();
					recycle.unshift(data.splice(index,1)[0]);
				}else if(flag2 == 8){
					data = recycle;
					data.splice(index,1);
				}
				sum = 0;
				show(selec,-60);
				render(data);
			}
			//列表单条重命名
			task_a[3].onclick = function(ev){
				ev.cancelBubble = true;
				sum = 0;
				show(selec,-60);
				changename(index);
			}
			//列表单条移动
			task_a[4].onclick = function(ev){
				ev.cancelBubble = true;
				sum = 0;
				show(selec,-60);
				movefile(ev,index);
			};
			if(ele.file_type.slice(0,5) == 'audio'){
				span1.style.backgroundPosition = '-957px -721px';			
				folder.ondblclick = function(){  //音乐双击打开播放器			
					if(!ele.img){
						ele.img = 'pic/8.jpg';
					}
					near.indexOf(ele)>-1&&near.splice(near.indexOf(ele),1);
					near.unshift(ele);
					show(musicshow,0);
					audios.src = ele.src;
					songname.innerHTML = ele.name;
					rotate.style.backgroundImage = 'url('+ele.img+')';
					
				}
			}
			if(ele.file_type.slice(0,5) == 'image'){
				span1.style.backgroundPosition = '-567px -383px';
				folder.ondblclick = function(){  //图片双击打开展示
					near.indexOf(ele)>-1&&near.splice(near.indexOf(ele),1);
					near.unshift(ele);
					show(imgshow,0);
					img.src = ele.src;
					showname.innerHTML = ele.name;
				}
			}
			if(ele.file_type.slice(-4) == 'word'){
				span1.style.backgroundPosition = '-761px -256px';
			}
			if(ele.file_type.slice(-5) == 'excel'){
				span1.style.backgroundPosition = '-720px -256px';
			}
			if(ele.file_type.slice(-10) == 'powerpoint'){
				span1.style.backgroundPosition = '-702px -320px';
			}
			if(ele.file_type.slice(0,4) == 'text'){
				span1.style.backgroundPosition = '-444px -383px';
			}
			folder.style.background = 'rgba(59,147,255,.4)';
		}	
		checked.appendChild(span3);
		folder.appendChild(span1);
		folder.appendChild(span2);
		folder.appendChild(checked);
		if(task){
			folder.appendChild(task);
		}
		files_con2.appendChild(folder);
		checked.onff = false;	
		if(ele.file_type == 'floder'){  
			//文件夹双击打开到下一层
			folder.ondblclick = function(ev){
				//添加title
				title.lastChild.style.color = '#00A4FF';
				var now = document.createElement('a');
				now.innerHTML = ">"+ele.name;
				now.href = 'javascript:;';
				title.appendChild(now);
				
				if(onoff2){ //按时间排序模式
					sortTime(ele.child);
				}
				render(ele.child); //渲染下一次数据
				slided();  //检测是否显示滚动条
				list.push(data);
				if(flag2 == 1){  //全部模式
					arr = ele.child;
				}
				if(flag2 == 8){  //回收站模式
					recycle = ele.child;
				}
				ev.preventDefault();			
			}
		}
	});
	
	back = title.children;
	check = files_con2.querySelectorAll('.checkbox');	
	flodes = files_con2.querySelectorAll('.floder');
	//返回上一级或上上一级
	for(var i=0;i<back.length-1;i++){
		back[i].index = i;
		back[i].onclick = function(ev){
			ev.cancelBubble = true;
			render(list[this.index]);
			if(flag2 == 1){
				arr = list[this.index];
			}
			if(flag2 == 8){
				recycle = list[this.index];
			}
			this.style.color = '';
			for(var j=back.length-1;j>this.index;j--){
				title.removeChild(back[j]);
				list.pop();
			}
		}
	}
	
	//单个选中
	for(var i=0;i<check.length;i++){
		check[i].index = i;
		check[i].onclick = function(ev){
			ev.cancelBubble = true;
			this.onff = !this.onff;
			if(this.onff){
				sum++;
				flodes[this.index].className += ' act';
			}else{
				sum--;
				flodes[this.index].className = flodes[this.index].className.slice(0,-4);
			}
			if(sum<=0){
				show(selec,-60);
			}else{
				show(selec,0);
				num.innerHTML = sum;
			}
			for(var i=0;i<check.length;i++){
				if(!check[i].onff){
					all.className = 'checkbox';	
					all.onff = false;
					return;
				}	
			}
			all.className = 'checkbox active';	
			all.onff = true;
		}
	}
}

	
//添加板块
var add = document.getElementById('add');
var li = add.getElementsByTagName('li');
var Sinput = li[0].getElementsByTagName('input')[0];
//上传
Sinput.onchange = function(){
	if(this.length<=0) return;
	var that = this;
    var time;
    var data2 = new Date;
	time = data2.getFullYear()+'.'+(data2.getMonth()+1)+'.'+data2.getDate();
	//ajax上传文件
	var Upload = document.getElementById('upload');
	var Utotal = document.getElementById('total');
	var Uloaded = document.getElementById('loaded');
	var Uname = Upload.getElementsByTagName('p')[0];
	var Uprogress = Upload.getElementsByTagName('span')[0];
	Upload.style.transform = 'translateY(0)';
    Uname.innerHTML = '正在上传'+this.files[0].name;
    var xhr = new XMLHttpRequest();
	xhr.onload = function(){	//响应完成
		var respon = JSON.parse(xhr.responseText);//返回数据
        Upload.style.transform = 'translateY(-320px)';
        arr.push({
			name: that.files[0].name.slice(0,15),
			file_type: that.files[0].type,
			src:respon.url,	//读取返回文件上传的地址
			Pid:arr[0].Pid,
			id:arr.length+1,
			time:time,
			child:[]
		});
        var date = [];
		date[0] = arr[arr.length-1];
		find(date);
		render(arr);
        slided();
        tips.innerHTML = '上传文件成功(暂时只支持单文件上传)';
        setTimeout(tip(tips),3000);
	};

	var upload = xhr.upload;
	upload.onprogress = function(ev){
		var scale = ev.loaded/ev.total;
		Uprogress.innerHTML = Math.abs(scale*100)+'%';
		Uloaded.style.width = scale*Utotal.clientWidth+'px';
	};
	xhr.open('post','post_file.php',true);
	xhr.setRequestHeader('X-Request-With','XMLHttpRequest');
	var oFormdata = new FormData();
	oFormdata.append('file',Sinput.files[0]);
	xhr.send(oFormdata);

	//h5读取文件地址模拟上传
	// for(var i=0;i<this.files.length;i++){
	// 	time = data.getFullYear()+'.'+(data.getMonth()+1)+'.'+data.getDate();
	// 	var fd = new FileReader();
	// 	fd.readAsDataURL(this.files[i]);
	// 	var name = this.files[i].name.slice(0,15);
	// 	var file_type =  this.files[i].type;
	// 	fd.onload = function(){  //读取文件完成触发
	// 		arr.push({
	// 			name: name,
	// 			file_type: file_type,
	// 			src:fd.result,	//读取文件的地址
	// 			Pid:arr[0].Pid,
	// 			id:arr.length+1,
	// 			time:time,
	// 			child:[]
	// 		});
	// 		var data = [];
	// 		data[0] = arr[arr.length-1];
	// 		find(data);
	// 		render(arr);
	// 	}
	// }

};

//新建文件夹
li[1].onclick = function(ev){
	ev.cancelBubble = true;
	var data = new Date;
	var time = data.getFullYear()+'.'+(data.getMonth()+1)+'.'+data.getDate();
	arr.unshift({
		name: '新建文件夹',
		file_type: 'floder',
		Pid:arr[0].Pid,
		id:arr.length+1,
		time:time,
		child:[]
	});
	render(arr);
	slided();
	changename(0);
	tips.innerHTML = '新建文件夹成功';
	setTimeout(tip(tips),3000);
}	

//新建笔记
li[2].onclick  = function(){
	tips.innerHTML = '非常抱歉，该功能还未实现！';
	tip(tips);
}

//当前层全选
all.onclick = function(ev){
	ev.cancelBubble = true;
	this.onff = !this.onff;
	for(var i=0;i<flodes.length;i++){
		if(this.onff){
			show(selec,0);
			if(!check[i].onff){
				flodes[i].className += ' act';
			}	
			sum = flodes.length;
			num.innerHTML = flodes.length;
			this.className = 'checkbox active';
		}else{
				flodes[i].className = flodes[i].className.slice(0,-4);
			show(selec,-60);
			sum = 0;
			this.className = 'checkbox';
		}
		check[i].onff = this.onff;
	}	
	console.log(sum)
}	

//取消选择
a[0].onclick = function(ev){
	ev.cancelBubble = true;
	var data = changeDate();
	for(var j=0;j<data.length;j++){
		if(check[j].onff){
			show(selec,-60);
			flodes[j].className = flodes[j].className.slice(0,-4);
			check[j].onff = false;
			tips.innerHTML = '取消选择'+sum+'项';
		}	
		if(all.onff){
			all.className = 'checkbox';	
			all.onff = false;
		}
	}
	sum = 0;
	render(data);
	tip(tips);
}

//头部批量删除
a[1].onclick = function(ev){
	ev.cancelBubble = true; 
	if(all.onff){
		all.className = 'checkbox';	
		all.onff = false;
	}
	if(flag2 !=8){
		var data = changeDate();
		if(!confirm('确认删除已选中文件')){
			sum = 0;
			show(selec,-60);
			for(var j=0;j<data.length;j++){
				if(check[j].onff){		
					flodes[j].className = flodes[j].className.slice(0,-4);
					check[j].onff = false;
				}				
			}
			return;
		}
		var i=0;
		for(var j=i+1;j<data.length+1;j++){
			if(check[i].onff){
				recycle.unshift(data.splice(--j,1)[0]);
			}
			i++;				
		}
		render(data);
	}else if(flag2 == 8){
		var i=0;
		for(var j=i+1;j<recycle.length+1;j++){
			if(check[i].onff){
				recycle.splice(--j,1);
			}
			i++;				
		}
		render(recycle);
	}
	tips.innerHTML = '删除了'+sum+'项';
	sum = 0;
	tip(tips);
	show(selec,-60);
}

//批量还原
a[2].onclick = function(ev){
	ev.cancelBubble = true;
	for(var i=0;i<check.length;i++){
		if(check[i].onff){
			find2(arr,(recycle.splice(i,1))[0]);	
		}
	}	
	if(all.onff){
		all.className = 'checkbox';	
		all.onff = false;
	}	
	tips.innerHTML = '还原了'+sum+'项';
	sum = 0;
	tip(tips);
	show(selec,-60);
	render(recycle);
}

//重命名
a[3].onclick = function(ev){
	ev.cancelBubble = true;
	if(sum>1){
		tips.innerHTML = '只能对单个文件重命名';
		tip(tips);
		return;
	}
	for(var i=0;i<check.length;i++){
		if(check[i].onff){
			changename(i);
			check[i].onff = false;
		}
	}	
}

//文件移动
var filemove = document.getElementById('move_file');
var movewindow = document.getElementById('M_window');
var move_catalog =  movewindow.getElementsByTagName('h4')[0];
var Sa = movewindow.getElementsByTagName('a');
var catalog = document.getElementById('catalog');
var sh2 = catalog.getElementsByTagName('h2');
var sli = catalog.getElementsByTagName('li');

//批量移动
a[4].onclick = movefile;

//移动函数
function movefile(ev,index){
	ev.cancelBubble = true;
	filemove.style.display = 'block';
	mTween(movewindow,{
		opacity: {
				target:100,//目标位置
				duration:300,//运动时间
				fx:'easeBothStrong',//运动方式
			},
		top:{
			target:300,
			duration:500,
			fx:'linear'
		}
	});
	fn(data,catalog,index);
	function fn(data,ul,index2){
		ul.innerHTML = '';
		data.forEach(
			function(ele,index){
				if(ele['file_type'] != 'floder'){
					return;
				}
				if(flag2 == 1){
					if(index == index2){
						return;
					}
					for(var i=0;i<check.length;i++){
						if(check[i].onff){
							var span = flodes[i].getElementsByTagName('span')[1];						
							if(ele.name == span.innerHTML){
								return;	
							}
						}	
					}
				}	
				//生成移动弹出层
				var li = document.createElement('li');
				li.innerHTML = '<span></span><h2>'+ele.name+'</h2><ul></ul>';
				var h2 = li.getElementsByTagName('h2')[0];
				h2.onff = true;
				h2.onclick = function(ev){
					ev.cancelBubble = true;
					var sul = this.nextElementSibling;
					move_catalog.innerHTML = '移动到：'+this.innerHTML;
					if(this.onff){
						fn(ele.child,sul);
						this.previousElementSibling.style.borderColor = '#fff';
						sul.style.display = 'block';
					}else{
						sul.innerHTML = '';
						this.previousElementSibling.style.borderColor = '';
						sul.style.display = '';
					}
					this.onff = !this.onff;
					Sa[2].onclick = function(){
						move(ele.child,index2);
					};
				}
				ul.appendChild(li);
			}
		);
	}
}

//取消和关闭按钮弹出层消失
Sa[1].onclick = Sa[0].onclick = function(ev){
	ev.cancelBubble = true;
	mTween(movewindow,{
		opacity: {
				target:0,//目标位置
				duration:300,//运动时间
				fx:'easeBothStrong',//运动方式
			},
		top:{
			target:0,
			duration:500,
			fx:'linear'
		}
	},function(){
		filemove.style.display = 'none';
		show(selec,-60);
		var data = changeDate();
		for(var j=0;j<data.length;j++){
			if(check[j].onff){		
				flodes[j].className = flodes[j].className.slice(0,-4);
				check[j].onff = false;
			}				
		}
		all.className = 'checkbox';
		all.onff = false;		
		sum = 0;
	});
}

//确定移动函数
function move(child,index){
	var data = changeDate();
	var i=0;
	for(var j=i+1;j<data.length+1;j++){
		if(check[i].onff){		
			child.push(data.splice(--j,1)[0]);
		}
		i++;				
	}
	if(index>=0){
		child.push(data.splice(index,1)[0]);
	}
	render(data);
	mTween(movewindow,{
		opacity: {
				target:0,//目标位置
				duration:300,//运动时间
				fx:'easeBothStrong',//运动方式
			},
		top:{
			target:0,
			duration:500,
			fx:'linear'
		}
	},function(){
		filemove.style.display = 'none';
		tips.innerHTML = '移动文件成功';
		if(all.onff){
			all.className = 'checkbox';	
			all.onff = false;
		}
		tip(tips);	
		show(selec,-60);
		sum = 0;
	});
}

//封装顶部提示函数
function tip(tips){
	setTimeout(function(){
		tips.style.transform = 'translateY(	0px)';
	},500);
	setTimeout(function(){
		tips.style.transform = 'translateY(-60px)';
	},2000);
}

//task头部出现隐藏函数
function show(obj,s){
	obj.style.transform = 'translateY('+s+'px)';
}

//重命名函数
function changename(i){
	var Oinput = document.createElement('input');
	Oinput.type = 'text';
	var F_name = flodes[i].getElementsByTagName('span')[1];
	Oinput.value = F_name.innerHTML;
	var now = flodes[i];
	flodes[i].appendChild(Oinput);
	Oinput.select();
	document.onclick = function(){	
		if(now.lastChild == Oinput){
			F_name.innerHTML = Oinput.value;
			now.removeChild(Oinput);
			now.className = now.className.slice(0,-4);
			sum = 0;
			show(selec,-60);
			tips.innerHTML = '重命名成功';
			if(all.onff){
				all.className = 'checkbox';	
				all.onff = false;
			}
			tip(tips);
		}						
	}
}


find(data);  //加载时分类文件并存入不同数组

//所有文档显示
var docu = document.getElementById('document');
docu.onclick = function(){
	if(onoff2){
		sortTime(Docu);
	}
	if(onoff3){
		sortPinyin(arr);
	}
	flag2 = 2;
	addative(this,leftbar);
	render(Docu);
}

//所有图片显示
var images = document.getElementById('image');
images.onclick = function(){
	flag2 = 3;
	addative(this,leftbar);
	if(onoff2){
		sortTime(Image);
	}
	if(onoff3){
		sortPinyin(arr);
	}
	render(Image);
}

//所有video显示
var video = document.getElementById('video');
video.onclick = function(){
	flag2 = 4;
	addative(this,leftbar);
	if(onoff2){
		sortTime(Video);
	}
	if(onoff3){
		sortPinyin(arr);
	}
	render(Video);
}

//所有music显示
var music = document.getElementById('music');
music.onclick = function(){
	flag2 = 5;
	addative(this,leftbar);
	if(onoff2){
		sortTime(Music);
	}
	if(onoff3){
		sortPinyin(arr);
	}
	render(Music);
}

//所有note显示
var note = document.getElementById('note');
note.onclick = function(){
	flag2 = 6;
	addative(this,leftbar);
	if(onoff2){
		sortTime(Note);
	}
	if(onoff3){
		sortPinyin(arr);
	}
	render(Note);
}

//时间照片
var pic = document.getElementById('pic');
pic.onclick = function(){
	tips.innerHTML = '非常抱歉，该功能还未实现！';
	tip(tips);
}

//最近打开文件显示
var nears = document.getElementById('near');
nears.onclick = function(){
	flag2 = 0;
	addative(this,leftbar);
	if(near.length>10){
		near.splice(11);
	}
	render(near);
}

//回收站显示
var Rcycle = document.getElementById('recycle');
Rcycle.onclick = function(){
	flag2 = 8;
	addative(this,leftbar);
	render(recycle);
	a[5].style.display = 'none';
	a[2].style.display = 'block';
	a[1].innerHTML = '<span></span>彻底删除';
	if(recycle.length<=0){
		tips.innerHTML = '回收站为空';
		tip(tips);
	}
}	

//全部文件显示
var whole = document.getElementById('whole');
whole.onclick = function(){
	if(onoff2){
		sortTime(arr);
	}
	if(onoff3){
		sortPinyin(arr);
	}
	flag2 = 1;
	addative(this,leftbar);
	add.style.pointerEvents = 'inherit';
	all.style.display = 'block';
	a[2].style.display = 'none';
	a[5].style.display = 'block';
	a[1].innerHTML = '<span></span>删除';
	render(arr);
}


//view视图功能
var view = document.getElementById('view');
var v_style = view.getElementsByTagName('a');

//非列表模式
v_style[1].onclick = function(){
	flag = true;
	this.className = 'active';
	v_style[0].className = '';
	render(changeDate());
}

//列表模式
v_style[0].onclick = function(){
	flag = false;
	this.className = 'active';
	v_style[1].className = '';
	render(changeDate());
	slided();
}



//sort排序
var sort = document.getElementById('sort');
var sortstyle = sort.getElementsByTagName('a');
var onoff2 = false; //当前为乱序
var onoff3 = false; //当前为乱序

//按时间排序
sortstyle[0].onclick = function(){
	if(onoff2){
		tips.innerHTML = '已经是时间排序了';
		tip(tips);
	}else{
		onoff2 = true;
		this.className = 'active';	
		sortstyle[1].className = '';
		sortTime(changeDate());
		render(changeDate());
		onoff3 = false;
	}
}

//按字母排序
sortstyle[1].onclick = function(){
	if(onoff3){
		tips.innerHTML = '已经是字母排序了';
		tip(tips);
	}else{
		onoff3 = true;
		this.className = 'active';	
		sortstyle[0].className = '';
		sortPinyin(changeDate());
		render(changeDate());
		onoff2 = false;
	}
}

//封装不同侧边栏渲染不同数据
function changeDate(){
	var data = [];
	if(flag2 == 1){
		data = arr;
	}else if(flag2 == 0){
		data = near;
	}else if(flag2 == 2){
		data = Docu;
	}else if(flag2 == 3){
		data = Image;
	}else if(flag2 == 4){
		data = Video;
	}else if(flag2 == 5){
		data = Music;
	}else if(flag2 == 6){
		data = Note;
	}else if(flag2 == 8){
		data = recycle;
	}
	return data;
}

//数组按时间排序函数
function sortTime(data){
	data.sort(function(a,b){
		var time1 = a.time.split('.').join('');
		var time2 = b.time.split('.').join('');
		console.log(time1 - time2);
		return time1 - time2;
	});
}

//数组按字母排序
function sortPinyin(data){
	data.sort(function(a,b){
		var aFirst = pinyin.getCamelChars(a.name)[0];
		var bFirst = pinyin.getCamelChars(b.name)[0];
		return aFirst > bFirst;
	});
}

//搜索功能
var search = document.getElementById('search');
var searchBtn = search.getElementsByTagName('a')[0];
searchBtn.onclick = function(){
	tips.innerHTML = '非常抱歉，该功能还未实现！';
	tip(tips);
}


//当前添加其他移除
function  addative(now,all){
	for(var i=0;i<all.length;i++){
		all[i].className  = 'now';
	}
	now.className += ' active2';
}

//还原函数
function find2(data,elements){
	var onoff = true;
	//遍历数组查找父级id和自己pid相同
	data.forEach(function(ele){
		if(elements.Pid == ele.Pid && onoff){
			New = [];
			New = (data.slice(0,elements.id-1));
			New.push(elements);
			data = New.concat(data.slice(elements.id-1));
			onoff  = false;
			return;
		}
	});
	arr = data;	
}

//遍历数组分类文件函数
function find(data){
	data.forEach(function(ele){
		if(ele.file_type.slice(0,5) == 'audio'){
			Music.push(ele);
		}else if(ele.file_type.slice(0,5) == 'image'){
			Image.push(ele);
		}else if(ele.file_type.slice(0,5) == 'video'){
			Video.push(ele);
		}else if(ele.file_type.slice(0,4) == 'text'){
			Note.push(ele);
		}else if(ele.file_type.slice(-4) == 'word' || ele.file_type.slice(-5) == 'excel' || ele.file_type.slice(-10) == 'powerpoint'){
			Docu.push(ele);
		}
		find(ele.child);
	});
}

//图片显示
//图片切换
var num2 = 0;
pages[0].onclick = function(){
	num2--;
	showname.innerHTML = Image[num2%Image.length].name;
	img.src = Image[num2%Image.length].src;
}
pages[1].onclick = function(){
	num2++;
	showname.innerHTML = Image[num2%Image.length].name;
	img.src = Image[num2%Image.length].src;
}
//关闭图片显示
close2.onclick = function(){
	show(imgshow,-800);
}

//补零函数
function zero(n){
	return n<10?'0'+n:''+n;
}

var onff7 = true;
//拖拽选中元素
files2.onmousedown = function(ev){
	//if(window.event.button!=0) return; 
	document.documentElement.style['cursor'] = 'default';
	var dix = ev.clientX;
	var diy = ev.clientY;
	var div = document.createElement('div');				
	div.style.left = dix+'px';
	div.style.top = diy+'px';
	div.style.position = 'absolute';	
	document.documentElement.appendChild(div);
	onff7 = false;
	document.onmousemove = function(ev){
		if(ev.clientX>dix){
			w = ev.clientX-dix+'px';
		}else{
			w = dix-ev.clientX+'px';
			div.style.left = ev.clientX+'px';
		}
		if(ev.clientY>diy){
			h = ev.clientY-diy+'px';
		}else{
			h = diy-ev.clientY+'px';
			div.style.top = ev.clientY+'px';
		}
		div.style.width = w;
		div.style.height = h;
		div.style.background = 'rgba(29,105,199,.3)';
		//div.style['border'] = '1px dashed #ccc';
		for(var i=0;i<flodes.length;i++){
			if(re(div,flodes[i])){
				if(!check[i].onff){
					flodes[i].className += ' act';
					check[i].onff = true;
					sum++;
				}	
			}else{
				if(check[i].onff){
					flodes[i].className = flodes[i].className.slice(0,-4);
					sum--;
				}
				check[i].onff = false;
			}
		}	
		if(sum<=0){
			show(selec,-60);
		}else{
			show(selec,0);
			num.innerHTML = sum;
		}
		for(var i=0;i<check.length;i++){
			if(!check[i].onff){
				all.className = 'checkbox';	
				all.onff = false;
				return;
			}	
		}
		all.className = 'checkbox active';	
		all.onff = true;
	}
	document.onmouseup = function(ev){
		//if(window.event.button!=0) return;
		document.onmousemove = null;
		if(!onff7){
			document.documentElement.removeChild(div);
		}
		onff7 = true;
	}
	return false;
}

//文档点击取消选中文件
document.onclick = function(){
	for(var i=0;i<check.length;i++){
		if(check[i].onff){
			flodes[i].className = flodes[i].className.slice(0,-4);
			check[i].onff = false;	
		}
	}
	if(all.onff){
		all.className = 'checkbox';	
		all.onff = false;
	}
	show(selec,-60);
	sum = 0;
}

//禁止右键
document.oncontextmenu = function(ev){
	return false;
}

//检测碰撞函数
function re(a,b){
	var st = a.getBoundingClientRect();
	var st2 = b.getBoundingClientRect();
	if(st.right<st2.left||st.top>st2.bottom||st.left>st2.right||st.bottom<st2.top){
		return false;
	}else{
		return true;
	}
}