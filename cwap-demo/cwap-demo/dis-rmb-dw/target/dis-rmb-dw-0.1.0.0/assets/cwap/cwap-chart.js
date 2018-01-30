/**
 * 定义图形对象，调用rgraph
 * 
 */
cwap.chart = new Object;
/**
 * 同时定义两条折现
 * 
 * @param rgraphId
 * @param labels
 * @param data1
 * @param data2
 * @param title
 * @returns
 * @deprecated
 * 
 */
cwap.chart.line2 = function(rgraphId, labels, data1, data2, title) {
	var line = new RGraph.Line(rgraphId, data1, data2);
	line.Set('labels', labels);
	line.Set('title', title);
	// 默认给红色，黑色两条线
	// line.Set('colors', [ 'red', 'black' ]);
	// line.Set('chart.key', [ 'key1', 'key2' ]);
	line.Set('chart.key', []);
	// line.Set('chart.key.interactive', true);
	line.Set('chart.key.position', 'graph');
	line = cwap.chart.params(line);
	return line;
}
/**
 * 定义一条折现
 * 
 * @param rgraphId
 * @param labels
 * @param data1
 * @param data2
 * @param title
 * @returns
 * 
 */
cwap.chart.line = function(rgraphId, labels, data, title) {
	var line = new RGraph.Line(rgraphId, data);
	line.Set('labels', labels);
	line.Set('title', title);
	// 默认一条线为红色
	line = cwap.chart.params(line);
	return line;
}
/**
 * drawline
 */
cwap.chart.drawLine = function(line, style) {
	if (style != null && style != "undefined") {
		line.Set('curvy', style.curvy);
		line.Set('curvy.tickmarks', true);
		line.Set('curvy.tickmarks.fill', null);
		line.Set('curvy.tickmarks.stroke', '#aaa');
		line.Set('curvy.tickmarks.stroke.linewidth', 2);
		line.Set('curvy.tickmarks.size', 5);
		line.Set('tickmarks', style.tickmarks);
		line.Set('background.grid', style.grid);
		line.Set('filled', style.fill);
		line.Set('filled.accumulative', true);
		line.Set('fillstyle', style.fillStyle);
		line.Set('colors', style.colors);
		line.Set("linewidth", style.linewidth);
		if (style.key != null && style.key == undefined && style.key.length > 0) {
			line.Set('chart.key', style.key);
			line.Set('chart.key.interactive', true);
			line.Set('chart.key.position', 'graph');
		}
		line.Set('gutter.left', style.left);
		line.Set('gutter.right', style.right);
		line.Set('gutter.bottom', style.bottom);
	}
	if (style != null && style.trace == true) {
		RGraph.Effects.Line.jQuery.Trace(line);
	} else {
		line.Draw();
	}
}
/**
 * 定义柱状图
 * 
 * @param rgraphId
 * @param labels
 * @param data
 * @param title
 * @returns
 */
cwap.chart.bar = function(rgraphId, labels, data, title) {
	var bar = new RGraph.Bar(rgraphId, data);
	bar.Set('labels', labels);
	bar.Set('title', title);
	// var color = new Array();
	// for ( var i = 0; i < labels.length; i++) {
	// color[i] = cwap.color.index(RGraph.random(1, 37));
	// }
	// variant:3d or bar
	bar.Set('variant', '3d');
	bar.Set('labels.above', true)
	bar.Set('bevel', true)
	bar = cwap.chart.params(bar);
	return bar;
}
cwap.chart.drawBar = function(bar, style) {
	if (style != null && style != "undefined") {
		bar.Set('variant', '3d');
		bar.Set('colors', style.colors);
		bar.Set('dashed', style.dashed);
		bar.Set('text.angle', style.textAngle);
		bar.Set('hmargin', style.hmargin);
		bar.Set('background.grid.autofit.numvlines', style.numvlines);
		bar.Set('background.grid.autofit.numhlines', style.numhlines);
		bar.Set("linewidth", style.linewidth);
		bar.Set('gutter.left', style.left);
		bar.Set('gutter.right', style.right);
		bar.Set('gutter.bottom', style.bottom);
	}
	if (style != null && style.trace == true) {
		RGraph.Effects.Fade.In(bar, {
			'duration' : 250
		});
	} else {
		bar.Draw();
	}
}
/**
 * 定义饼图
 * 
 * @param rgraphId
 * @param labels
 * @param data
 * @param title
 * @returns
 */
cwap.chart.pie = function(rgraphId, labels, data, title) {
	var pie = new RGraph.Pie(rgraphId, data)
	pie.Set('radius', 50);
	// for ( var i = 0; i < labels.length; i++) {
	// labels[i] = labels[i] + "(" + data[i] + ")";
	// }
	pie.Set('labels', labels);
	pie.Set('title', title);
	// pie.Set('exploded', 5)
	// pie.Set('strokestyle', 'transparent');
	// pie.Set('tooltips', labels);
	// pie.Set('tooltips.event', 'onmousemove');
	// 可以指定pie的颜色
	// pie.Set('colors',
	// ['#EC0033','#A0D300','#FFCD00','#00B869','#999999','#FF7300','#004CB0'])
	// ;
	pie = cwap.chart.params(pie);
	return pie;

}
cwap.chart.drawPie = function(pie, style) {
	if (style != null && style != "undefined") {
		pie.Set('radius', style.radius);
		pie.Set('exploded', style.exploded);
		pie.Set('strokestyle', 'transparent');
		pie.Set('tooltips', style.tooltips);
		pie.Set('tooltips.event', 'onmousemove');
		pie.Set('linewidth', style.linewidth);
		pie.Set('gutter.left', style.left);
		pie.Set('gutter.right', style.right);
		pie.Set('gutter.bottom', style.bottom);
		pie.Set('colors', style.colors);
	}
	if (style != null && style.trace == true) {
		RGraph.Effects.Pie.RoundRobin(pie, {
			frames : 30
		});
	} else {
		pie.Draw();
	}
}
/**
 * chart 图表基本参数设置
 */
cwap.chart.params = function(obj) {
	obj.Set('title.size', 10);
	// obj.Set('gutter.left', 40);
	// obj.Set('gutter.right', 15);
	// obj.Set('gutter.bottom', 30);
	// obj.Set('linewidth', 3);
	// obj.Set('hmargin', 5);
	obj.Set('text.color', '#333');
	obj.Set('text.font', 'Arial');
	obj.Set('background.grid.autofit', true);
	obj.Set('background.grid.autofit.numvlines', 11);
	obj.Set('shadow', true);
	obj.Set('shadow.color', 'rgba(20,20,20,0.3)');
	obj.Set('shadow.blur', 10);
	obj.Set('shadow.offsetx', 0);
	obj.Set('shadow.offsety', 0);
	obj.Set('background.grid.vlines', false);
	obj.Set('background.grid.border', true);
	obj.Set('noxaxis', true);
	obj.Set('title.size', 10);
	obj.Set('axis.color', '#666');
	obj.Set('text.color', '#666');
	obj.Set('strokestyle', 'transparent');
	obj.Set('spline', true);
	return obj;
}

function LineStyle() {
	cwap.chart.line.style = {
		"curvy" : true,
		"tickmarks" : "",
		"grid" : true,
		"trace" : true,
		"colors" : [ 'red' ],
		"fill" : false,
		"fillStyle" : [ 'rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)',
				'rgba(0,0,255,0.3)' ],
		"linewidth" : 3,
		"key" : [],
		'left' : 20,
		'right' : 15,
		'bottom' : 30
	};
	return cwap.chart.line.style;
}
function BarStyle() {
	cwap.chart.bar.style = {
		"textAngle" : 0,
		"hmargin" : 5,
		"colors" : [ '#428BCA', '#DFF0D8', '#5CB85C', '#5BC0DE', '#F0AD4E',
				'#D9534F', '#FCF8E3', '#F2DEDE', '#428BCA', '#DFF0D8',
				'#5CB85C', '#5BC0DE', '#F0AD4E', '#D9534F', '#FCF8E3',
				'#F2DEDE', '#428BCA', '#DFF0D8', '#5CB85C', '#5BC0DE',
				'#F0AD4E', '#D9534F', '#FCF8E3', '#F2DEDE', '#428BCA',
				'#DFF0D8', '#5CB85C', '#5BC0DE', '#F0AD4E', '#D9534F',
				'#FCF8E3', ],
		"numvlines" : 20,
		"numhlines" : 5,
		"dashed" : false,
		"trace" : true,
		"variant" : '3d',
		"linewidth" : 3,
		'left' : 20,
		'right' : 15,
		'bottom' : 30
	};
	return cwap.chart.bar.style;
}
function BarStyleOneColor() {
	cwap.chart.bar.style = {
		"textAngle" : 0,
		"hmargin" : 5,
		"colors" : [ 'Gradient(white:rgba(153, 208, 249,1.0))' ],
		"numvlines" : 20,
		"numhlines" : 5,
		"dashed" : false,
		"trace" : true,
		"variant" : '3d',
		"linewidth" : 3,
		'left' : 20,
		'right' : 15,
		'bottom' : 30
	};
	return cwap.chart.bar.style;
}
function PieStyle() {
	cwap.chart.pie.style = {
		"tooltips" : [],
		"radius" : 50,
		"trace" : true,
		"exploded" : 5,
		"linewidth" : 3,
		'left' : 20,
		'right' : 15,
		'bottom' : 30,
		'colors' : [ "Gradient(rgba(0, 153, 86, 1.0))",
				"Gradient(rgba(119, 119, 119, 1.0))",
				"Gradient(rgba(255, 181, 3, 1.0))",
				"Gradient(rgba(213, 65, 45, 1.0))",
				"Gradient(rgba(15, 101, 234, 1.0))",
				"Gradient(rgba(255, 153, 102, 1.0))",
				"Gradient(rgba(72, 68, 152, 1.0))",
				"Gradient(rgba(204, 102, 153, 1.0))",
				"Gradient(rgba(204, 204, 153, 1.0))",
				"Gradient(rgba(102, 102, 153, 1.0))" ]
	};
	return cwap.chart.pie.style;
}
