/**
 * 定义cwap JavaScript缺省对象cwap
 */
var cwap = new Object;

var CWAP_ID_SESSION_ACCOUNT = "cwap.session.account";

/**
 * 定义简单工具类对象
 */
cwap.util = new Object;

/**
 * 定义web应用对象
 */
cwap.web = new Object;

// 设置headmeata
cwap.web.headmeta = function(title) {
	var meta = document.getElementsByTagName('meta');
	for ( var i = 0; i < meta.length; i++) {
		var n = meta[i].getAttribute('name');
		if (n == 'author') {
			meta[i].setAttribute('content', app.head.author);
		}
		if (n == 'description') {
			meta[i].setAttribute('content', app.head.description);
		}
	}
	// TODO 获取title元素
	var $title = $("head>title");
	if (title != undefined) {
		$title.val(app.head.title);
	}
}

//检查浏览器版本
cwap.web.browser = function() {
	if (navigator.userAgent.indexOf("MSIE") > 0) {
		if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
			alert("您的浏览器类型为:IE6,不建议使用IE8及以下版本");
		}
		if (navigator.userAgent.indexOf("MSIE 7.0") > 0) {
			alert("您的浏览器类型为:IE7,不建议使用IE8及以下版本");
		}
		if (navigator.userAgent.indexOf("MSIE 8.0") > 0) {
			alert("您的浏览器类型为:IE8,不建议使用IE8及以下版本");
		}
		if (navigator.userAgent.indexOf("MSIE 9.0") > 0) {
		}
		if (navigator.userAgent.indexOf("MSIE 10.0") > 0) {
		}
	}
	if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
		/* return "Firefox"; */
		// TODO
	}
	if (isSafari = navigator.userAgent.indexOf("Safari") > 0) {
		/* return "Safari"; */
		// TODO
	}
	if (isCamino = navigator.userAgent.indexOf("Camino") > 0) {
		/* return "Camino"; */
		// TODO
	}
	if (isMozilla = navigator.userAgent.indexOf("Gecko/") > 0) {
		/* return "Gecko"; */
		// TODO
	}
}

// 加载菜单项(TODO Angular实现)
cwap.web.menubar = function(items, id) {
	var bar = $('#sys-header-bar').addClass("navbar navbar-inverse navbar-fixed-top");
	var $container = $("<div class='container'  ></div>");
	var $header = $('<div class="navbar-header">'+
						'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">'+
							'<span class="icon-bar"></span>'+
							'<span class="icon-bar"></span>'+
							'<span class="icon-bar"></span>'+
						'</button>'+
					'</div>');
	$container.append($header);
	var $collapse = $('<div class="navbar-collapse collapse " id="headerContainer"></div>');
	var $ul = $("<ul id='header_bar_ul' class='nav navbar-nav '></ul>");

	for (i = 0; i < items.length; i++) {
		
		if(items[i].subMenu != undefined && items[i].subMenu != null &&  items[i].subMenu.length > 0){
			if (items[i].id == id) {
				var $dropdown = $("<li class='dropdown active' id='menubar_item_"+ items[i].id	+ "'>");
				$dropdown
				.append("<a class='dropdown-toggle' data-toggle='dropdown' href='#'>"+items[i].label+"<b class='caret'></b></a>");
				var $subUrl = $("<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel'></ul>");
			
				for (j = 0; j < items[i].subMenu.length; j++) {
					var item = items[i].subMenu[j];
					if(item.blankLoad != null && item.blankLoad != undefined && item.blankLoad == true){
						$subUrl
						.append("<li id='menubar_item_"
								+ item.id
								+ "' class=''><a href='"+item.value+"' target='blank'>"
								+ item.label + "</a></li>");
					}else{
						$subUrl.append("<li><a href='#' onclick='onMenubarItemClick(\""
							+ item.id + "\",\"" + item.value + "\")'>"
							+ item.label + "</a></li>");
					}
				}
				$dropdown.append($subUrl);
				$ul.append($dropdown);
			}else{
				var $dropdown = $("<li class='dropdown' id='menubar_item_"+ items[i].id	+ "'>");
				$dropdown
				.append("<a class='dropdown-toggle' data-toggle='dropdown' href='#'>"+items[i].label+"<b class='caret'></b></a>");
				var $subUrl = $("<ul class='dropdown-menu' role='menu' aria-labelledby='dLabel'></ul>");
			
				for (j = 0; j < items[i].subMenu.length; j++) {
					var item = items[i].subMenu[j];
					if(item.blankLoad != null && item.blankLoad != undefined && item.blankLoad == true){
						$subUrl
						.append("<li id='menubar_item_"
								+ item.id
								+ "' class=''><a href='"+item.value+"' target='blank'>"
								+ item.label + "</a></li>");
					}else{
						$subUrl.append("<li><a href='#' onclick='onMenubarItemClick(\""
							+ items[i].id + "\",\"" + item.value + "\")'>"
							+ item.label + "</a></li>");
					}
				}
				$dropdown.append($subUrl);
				$ul.append($dropdown);
			}
		}else{
			if (items[i].id == id) {
				if(items[i].blankLoad != null && items[i].blankLoad != undefined && items[i].blankLoad == true){
					$ul
					.append("<li id='menubar_item_"
							+ items[i].id
							+ "' class='active'><a href='"+items[i].value+"' target='blank'>"
							+ items[i].label + "</a></li>");
				}else{
					$ul
						.append("<li id='menubar_item_"
								+ items[i].id
								+ "' class='active'><a href='#' onclick='onMenubarItemClick(\""
								+ items[i].id + "\",\"" + items[i].value + "\")'>"
								+ items[i].label + "</a></li>");
				}
			} else {
				if(items[i].blankLoad != null && items[i].blankLoad != undefined && items[i].blankLoad == true){
					$ul
					.append("<li id='menubar_item_"
							+ items[i].id
							+ "' class=''><a href='"+items[i].value+"' target='blank'>"
							+ items[i].label + "</a></li>");
				}else{
					$ul.append("<li id='menubar_item_" + items[i].id
						+ "'><a href='#' onclick='onMenubarItemClick(\""
						+ items[i].id + "\",\"" + items[i].value + "\")'>"
						+ items[i].label + "</a></li>");
				}
			}
		}

	}
	$container.append($collapse);
	$collapse.append($ul);
	bar.append($container);
}

// 菜单单击事件响应
function onMenubarItemClick(id, url) {
	// 清除样式,重新设定样式
	$("#header_bar_ul>li").removeClass("active");
	$("#header_bar_ul>li[id='menubar_item_" + id + "']").addClass("active");
	window.location.href = url;
}

/**
 * 定义远程调用对象
 */
cwap.rpc = new Object;

//处理RSS,调用jquery.jfeed.js组件访问RssURL,获取feed对象（feed.title,feed.items等）
cwap.rpc.rss = function(rssUrl, handler) {
	jQuery.getFeed({
		url : rssUrl,
		success : function(feed) {
			handler(feed);
		}
	});
}

//调用jQuery的ajax Call,增加一些系统的信息
cwap.rpc.call = function(remoteUrl, handler) {
	// 增加请求的系统参数,主要放置API被其他应用调用过于频繁
	// TODO 数据加密
	// var apikey = napp.ns.apikey;
	remoteUrl = remoteUrl + "?t=json&k=1234&v=1";
	$.get(remoteUrl, function(data) {
		if (handler != null) {
			// 由Handler方法来处理数据
			handler(data);
		}
	});
}

/**
 * 定义cwap的存储对象,参见jquery.storage.js http://plugins.jquery.com/localstorage/
 */
cwap.cache = new Object;

/**
 * 将指定的对象键值对缓存在localStorage中
 */
cwap.cache.cache = function(key, value, durable) {
	var ts = new Date().getTime();
	var storable = {
		"source" : value,
		"timestamp" : ts,
		"durable" : durable
	};
	$.localStorage(key, storable);
}

/**
 * 从缓存中获取对象，如超出时间间隔则返回null
 */
cwap.cache.get = function(key) {
	var storable = $.localStorage(key);
	if (storable != null) {
		var ts = new Date().getTime();
		if ((ts - storable.timestamp) > (storable.durable * 1000)) {
			// 超出间隔时间，删除该对象
			$.localStorage(key, null);
			return null;
		} else {
			return storable.source;
		}
	} else {
		return null;
	}
}

/**
 * 定义时间对象
 */
cwap.time = new Object;

/**
 * 获得当前的时间戳
 */
cwap.time.ts = function() {
	return new Date().getTime();
}
/**
 * 将long类型的时间戳变成需要的format（yyyy-MM-dd hh:mm:ss）格式的时间
 */
cwap.time.date = function(tsi, format) {
	if (format == null || format == "undefined") {
		format = "yyyy-MM-dd hh:mm:ss";
	}
	var date = new Date(tsi);
	var o = {
		"M+" : date.getMonth() + 1,
		"d+" : date.getDate(),
		"h+" : date.getHours(),
		"m+" : date.getMinutes(),
		"s+" : date.getSeconds(),
		"q+" : Math.floor((date.getMonth() + 3) / 3),
		"S" : date.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (date.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}

	return format;
}

/**
 * 定义权限|认证对象
 */
cwap.auth = new Object;

/**
 * 验证是否已经登录
 */
cwap.auth.checkSession = function() {
	var value = sessionStorage.getItem("cwap.session.account");
	if (value == null || value == '') {
		return false;
	}
	return true;
}

/**
 * 获得登录账号
 */
cwap.auth.getAccount = function() {
	return sessionStorage.getItem("cwap.session.account");
}

/**
 * 得到session中保存的account信息
 */
cwap.auth.getSessionAccount = function() {
	return sessionStorage.getItem("cwap.session.account");
}

/**
 * 定义颜色对象
 */
cwap.color = new Object;

/**
 * 随机获得颜色
 */
cwap.color.random = function() {
	// 16进制方式表示颜色0-F
	var arrHex = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B",
			"C", "D", "E", "F" ];
	var strHex = "#";
	var index;
	for (var i = 0; i < 6; i++) {
		// 取得0-15之间的随机整数
		index = Math.round(Math.random() * 15);
		strHex += arrHex[index];
	}
	return strHex;
}

/**
 * 根据序号获得颜色
 */
cwap.color.index = function(i) {
	// 16进制方式表示颜色0-F
	var color = [ "black", "blue", "brown", "chocolate", "coral", "crimson",
			"cyan", "darkorange", "deeppink", "gray", "green", "gold",
			"hotpink", "lightgreen", "lime", "linen", "magenta", "navy",
			"olive", "orange", "orchid", "peru", "peru", "plum", "red",
			"purple", "salmon", "seashell", "silver", "snow", "tan", "teal",
			"tomato", "wheat", "yellow", "violet", "turquoise" ];
	if (i >= color.length) {
		i = 0;
	}
	return color[i];
}