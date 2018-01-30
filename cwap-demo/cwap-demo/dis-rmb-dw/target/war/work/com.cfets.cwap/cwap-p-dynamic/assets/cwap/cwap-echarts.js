/**
 *根据url和id呈现相应的图标
 *url用于获取图标数据
 *id用于获取图标呈现的位置
 */
var cwapEcharts = new Object;
cwapEcharts.data = new Object;
cwapEcharts.data.title;
cwapEcharts.data.type;
cwapEcharts.data.label;
cwapEcharts.data.data;
cwapEcharts.data.city;
cwapEcharts.data.axis;

/*var echarts = new Object;
var echarts.data = new Object;
echarts.data.title;
echarts.data.type;
echarts.data.label;
echarts.data.data;
echarts.data.city;
echarts.data.axis;*/

cwapEcharts.drawBar = function(id, chartData){
	chartData.type = "bar";
	cwapEcharts.drawBarOrLine(id, chartData);
}
cwapEcharts.drawLine = function(id, chartData){
	chartData.type = "line";
	cwapEcharts.drawBarOrLine(id, chartData);
}
cwapEcharts.drawBarOrLine = function(id, chartData){
	var chart = echarts.init(document.getElementById(id));
	var title = eval("('"+chartData.title+"')");
	var seriesLabel = labelToJson(chartData.label);
	var xAxisData = labelToJson(chartData.axis);
	var series = produceSeries(chartData);
	var bloption = {
		title : {
			text:title,
			x	:	'center'
		},
		tooltip :{
			trigger:'axis'
		},
		legend :{
			orient :'vertical',
			x :'left',
			data : seriesLabel
		},
		toolbox :{
			show :true,
			feature :{
				mark :{
					show :true
				},
				dataView :{
					show :true,
					readOnly :false
				},
				magicType :{
					show :true,
					type :[ 'bar', 'line' ]
				},
				restore :{
					show :true
				},
				saveAsImage :{
					show :true
				}
			}
		},
		calculable :true,
		xAxis :[
			{
				type :'category',
				data :xAxisData
			}
		],
		yAxis :[
			{
				type :'value'
			}
		],
		series :series
	};
	//alert(JSON.stringify(bloption));
	//var option = eval("("+bloption+")");
	chart.setOption(bloption);
		//动态适应宽度调整
	window.addEventListener("resize",function(){
		chart.resize();
	});
}

cwapEcharts.drawPie = function(id, chartData){
	chartData.type = "pie";
	var chart = echarts.init(document.getElementById(id));
	var series = produceSeries(chartData);
	var title = eval("('"+chartData.title+"')");
	var seriesLabel = labelToJson(chartData.label);
	var option = {
		title : {
			text:title,
			x	:	'center'	
		},
		tooltip :{
			trigger:'item'
		},
		legend :{
			orient :'vertical',
			x :'left',
			data : seriesLabel
		},
		toolbox :{
			show :true,
			feature :{
				dataView :{
					show :true,
					readOnly :false
				},
				restore :{
					show :true
				},
				saveAsImage :{
					show :true
				}
			},
		},
		calculable :true,
		series :series
	};
	chart.setOption(option);
		//动态适应宽度调整
	window.addEventListener("resize",function(){
		chart.resize();
	});
}

cwapEcharts.drawMap = function(id, chartData){
	chartData.type = "map";
	var chart = echarts.init(document.getElementById(id));
	var series = produceSeries(chartData);
	//alert("map");
	var title = eval("('"+chartData.title+"')");
	var seriesLabel = labelToJson(chartData.label);
	var min, max;
	var seriesData = chartData.data;
	var num = seriesData.length;
	min = seriesData[0];
	max = min;
	for(i=0; i<num; i++){
		if(min > seriesData[i]){
			min = seriesData[i];
		}
		if(max < seriesData[i]){
			max = seriesData[i];
		}
	}
	var option = {
		title : {
			text:title,
			x	:	'center'	
		},
		tooltip :{
			trigger:'item'
		},
		legend :{
			orient :'vertical',
			x :'left',
			data : seriesLabel
		},
		dataRange :{
			min :min,
			max :max,
			x :'left',
			y :'bottom',
			calculable :true
		},
		toolbox :{
			show :true,
			feature :{
				mark :{
					show :true
				},
				dataView :{
					show :true,
					readOnly :false
				},
				restore :{
					show :true
				},
				saveAsImage :{
					show :true
				}
			},
		},
		calculable :true,
		series :series
	};
	chart.setOption(option);
	//动态适应宽度调整
	window.addEventListener("resize",function(){
		chart.resize();
	});
}

function labelToJson(labelData){
	var jsonData;
	var tempStr = "[";
	var length = labelData.length;
	for(i=0; i<length; i++){
		var seriesLabel = labelData[i];
		tempStr = tempStr+"'"+seriesLabel+"',";
	}
	var lastIndex = tempStr.lastIndexOf(",");
	tempStr = tempStr.substring(0, lastIndex)+"]";
	//alert(tempStr);
	//return tempStr;
	jsonData = eval("("+tempStr+")");
	return jsonData;
}

function produceSeries(chartData){
	var seriesJson = "[";
	var type = chartData.type;
	var length;
	if(type == "map"){
		length = chartData.city.length;
	}else{
		length = chartData.label.length;
	}
	if(type=="bar" || type=="line"){
		//alert("label:"+length);
		for(i=0; i<length; i++){
			seriesJson = seriesJson+"{name:'"+chartData.label[i]
									+"',type:'"+type+"',data:[";
			var seriesData = chartData.data[i];
			var length2 = seriesData.length;
			for(j=0; j<length2; j++){
				seriesJson = seriesJson+seriesData[j]+",";
			}
			var lastIndex = seriesJson.lastIndexOf(",");
			seriesJson = seriesJson.substring(0, lastIndex)+"]},";
		}
		var lastIndexT = seriesJson.lastIndexOf(",");
		seriesJson = seriesJson.substring(0, lastIndexT)+"]";
	}else{
		if(type=="pie"){
			seriesJson = seriesJson+"{name:'"+eval("('"+chartData.title+"')")
									+"',type:'"+type+"',data:[";
			for(i=0; i<length; i++){
				var seriesData = chartData.data[i];
				var seriesLabel = chartData.label[i];
				seriesJson = seriesJson+"{value:"+seriesData+", name:'"+seriesLabel+"'},";
			}
		}else{
			seriesJson = seriesJson+"{name:'"+chartData.label[0]+"',type:'"+type+"',mapType:'china',"
									+"itemStyle:{normal:{label:{show:true}},emphasis:{label:{show:true}}},"
									+"data:[";
			for(i=0; i<length; i++){
				var seriesData = chartData.data[i];
				var seriesCity = chartData.city[i];
				seriesJson = seriesJson+"{value:"+seriesData+", name:'"+seriesCity+"'},";
			}
		}
		var lastIndexT = seriesJson.lastIndexOf(",");
		seriesJson = seriesJson.substring(0, lastIndexT)+"]}]";
	}
	//alert(seriesJson);
	//return seriesJson;
	var jsonData = eval("("+seriesJson+")");
	return jsonData;
}
cwapEcharts.draw = function(id, uri){
	//alert(url s+ "--" + id);
		$.ajax({
				url:uri,
				type:"get",
				//dataType:"json",
				success:function(data){
					//alert(data.head.version);
					var chart = echarts.init(document.getElementById(id));
					var chartStr = data.data.chart;
					//alert(chartStr + "123");
					var option = eval ("(" + chartStr + ")");
					//alert(bar_option + "456");
					chart.setOption(option);
					//动态适应宽度调整
					window.addEventListener("resize",function(){
						chart.resize();
						});
				}
			});
		}


		
/*用于测试*/
function myAlert(){
		alert("chart.js");
	
	}
	
cwapEcharts.alertTest = function(v_url,id){
	alert(v_url + "--" + id);
}

