/*
* @Author: YJQ
* @Date:   2018-01-19 11:17:31
* @Last Modified by:   YJQ
* @Last Modified time: 2018-01-20 15:38:33
*/
//请求太原天气情况
var weather;
var city;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
    success:function(obj){
    	weather=obj.data.weather;
    	console.log(weather);
    }
})
//请求城市资源
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
    success:function(obj){
    	city=obj.data;
    	console.log(city);
    }
})

//渲染数据
function updata(){
	//城市
    var cityName=document.getElementsByClassName("header")[0];
    cityName.innerHTML=weather.city_name;
    //温度
    var tem=document.getElementsByClassName("temperature")[0];
    tem.innerHTML=weather.current_temperature+"°";
    //空气质量
    var KQ=document.getElementsByTagName("h3")[0];
    KQ.innerHTML=weather.quality_level;
    //天气状况
    var current_condition=document.getElementsByClassName("tianqi")[0];
    current_condition.innerHTML=weather.current_condition;
    var wind_direction=document.getElementsByClassName("wind_direction")[0];
    wind_direction.innerHTML=weather.wind_direction;

    //今天的最高温
    var dat_high_temperature=document.getElementById("dat_high_temperature");
    dat_high_temperature.innerHTML=weather.dat_high_temperature;
    
    //今天最低温
    var dat_low_temperature=document.getElementById("dat_low_temperature");
    dat_low_temperature.innerHTML=weather.dat_low_temperature;

    //今天天气情况
    var day_condition=document.getElementById("day_condition");
    day_condition.innerHTML=weather.day_condition;

    //今天的图片
    var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
    dat_weather_icon_id.style=`background-image: url(img/${weather.dat_weather_icon_id}.png);`;


    //明天的最高温
    var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
    tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;
    //明天的最低温
    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
    tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
    //明天的天气情况
    var tomorrow_condition=document.getElementById("tomorrow_condition");
    tomorrow_condition.innerHTML=weather.tomorrow_condition;
    //明天的天气图片
    var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
    tomorrow_weather_icon_id.style=`background-image: url(img/${weather.tomorrow_weather_icon_id}.png);`;

    //
    for(var i in weather.hourly_forecast){
    	//创建父元素div
    	var now=document.createElement("div");
    	//给父元素div加样式
    	now.className="now";
    	//获取now的父元素
    	var nowp=document.getElementById("now");
    	//把now插入到父元素中
    	nowp.appendChild(now);
        //时间
    	var now_time=document.createElement("h2");
    	now_time.className="now_time";
    	now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    	now.appendChild(now_time);
    	//图片
    	var now_icon=document.createElement("div");
    	now_icon.className="now_icon";
    	now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
    	now.appendChild(now_icon);
    	//温度
    	var now_temperature=document.createElement("div");
    	now_temperature.className="now_temperature";
    	now_temperature.innerHTML=weather.hourly_forecast[i].temperature+"°";
    	now.appendChild(now_temperature);
    }
    for(var j in weather.forecast_list){
       var forecast_list=document.createElement("div");
       forecast_list.className="forecast_list";
       var forecast_listp=document.getElementById("forecast_list");
       forecast_listp.appendChild(forecast_list);
       //日期
       var recent_time=document.createElement("div");
       recent_time.className="recent_time";
       recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
       forecast_list.appendChild(recent_time);
      
       //天气状况
       var recent_wea=document.createElement("h2");
    	recent_wea.className="recent_wea";
    	recent_wea.innerHTML=weather.forecast_list[j].condition;
    	forecast_list.appendChild(recent_wea);
    	//天气图片
    	var recent_pic=document.createElement("div");
    	recent_pic.className="recent_pic";
    	recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
    	forecast_list.appendChild(recent_pic);
    	//最高温度
    	var recent_high=document.createElement("h3");
    	recent_high.className="recent_high";
    	recent_high.innerHTML=weather.forecast_list[j].high_temperature+"°";
    	forecast_list.appendChild(recent_high);
    	//最低温度
    	var recent_low=document.createElement("h4");
    	recent_low.className="recent_low";
    	recent_low.innerHTML=weather.forecast_list[j].low_temperature+"°";
    	forecast_list.appendChild(recent_low);
    	//风向
    	var recent_wind=document.createElement("h5");
    	recent_wind.className="recent_wind";
    	recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
    	forecast_list.appendChild(recent_wind);
    	//风级
    	var recent_level=document.createElement("h6");
    	recent_level.className="recent_level";
    	recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
    	forecast_list.appendChild(recent_level);
    }

    //城市交换
    var header=document.getElementsByClassName("header")[0];
    var city_box=document.getElementsByClassName("city_box")[0];
    header.onclick=function(){
    	$(".text").val("");
    	$(".button").html("取消");
        city_box.style="display:block"; 
    }

    //渲染城市
    for(var k in city){
    	//一级城市
        var cities=document.getElementsByClassName("cities")[0];
    	var title=document.createElement("h1");
    	title.className="title";
    	title.innerHTML=k;
        cities.appendChild(title);

        //设置con
        var con=document.createElement("div");
        con.className="con";


        //二级城市(两层for循环)
        for(var y in city[k]){
        	// console.log (y);
        	var erji=document.createElement("div");
        	erji.className="son";
        	erji.innerHTML=y;
        	con.appendChild(erji);
        }
        cities.appendChild(con);
    }
}

//查找各个城市天气信息
function AJAX(str){

	$.ajax({
		url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
		dataType:"jsonp",
		type:"get",
	    success:function(obj){
	    	weather=obj.data.weather;
	    	updata();
	    	$(".city_box").css({"display":"none"});
	    	// console.log(weather);
	    }
	})
}
// 当页面加载完成执行的代码
window.onload=function(){
    updata();
    //son 城市按钮点击事件
    $(".son").on("click",function(){
    	var citiesh=this.innerHTML;
    	AJAX(citiesh);
    })
    //当input货期焦点时，取消变为确认，
    //focus 获取焦点
    //html 设置或改变元素内容
    $(".text").on("focus",function(){
    	$(".button").html("确认");
    })

    //操作按钮
    var button=document.getElementsByClassName("button")[0];
    console.log(button);
    button.onclick=function(){
    	// console.log(1);
    	//获取button中的内容
    	var btn=this.innerHTML;
    	// console.log(btn);
    	if(btn=="取消"){
    		// console.log(1);
    		var city_box1=document.getElementsByClassName("city_box")[0];
    		city_box1.style="display:none";
    	}
    	else{
    		//获取text中的值
            var str1=document.getElementsByClassName("text")[0].value;
            // console.log(1);
            for(var i in city){
            	for(var j in city[i]){
                    if(str1==j){
                    	AJAX(str1);
                    	return;
                    }
            	}
            	}
            alert("没有该城市气象信息");
            }
            
    	}
    }
