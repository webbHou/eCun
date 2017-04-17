function mTween(obj,attrs,callback){
		var options = {};
		var max = 0;
		for(var attr in attrs){
			options[attr] = {};

			for(var att in attrs[attr] ){
				options[attr][att] = attrs[attr][att];

			}
			if(max<options[attr].duration){
				max = options[attr].duration;
			}
			if(attr=='opacity'){
				options[attr].begin = css(obj,attr)*100;
				
			}else{
				options[attr].begin = css(obj,attr);
			   
			}
			 options[attr].count = options[attr].target - options[attr].begin;		
		}

		var time = +new Date();
		
		var timer = setInterval(function(){
			var t = +new Date() - time;
			for(var attr in options){
				options[attr].t = +new Date() - time;
				if(options[attr].t>=options[attr].duration){
					options[attr].t = options[attr].duration
				}
				if(attr=='opacity'){
					obj.style[attr] = Tween[options[attr].fx](options[attr].t, options[attr].begin, options[attr].count, options[attr].duration)/100;
					obj.style.filter = 'alpha(opacity = '+Tween[options['opacity'].fx](options['opacity'].t, options['opacity'].begin, options['opacity'].count, options['opacity'].duration)+')';
				}else{
					obj.style[attr] = Tween[options[attr].fx](options[attr].t, options[attr].begin, options[attr].count, options[attr].duration)+'px';
					//console.log(obj.style[attr]);
				}
				if(options[attr].t==options[attr].duration){
					options[attr].callback&&options[attr].callback();
					options[attr].callback = null;  //防止已完成的属性回调函数再次执行
				}
			}
			if(t>=max){
				clearInterval(timer);
				callback&&callback();
			}
		}, 16);
	}
	function css(obj,attr){
		return parseFloat(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]);
	}