/**
 * 定义MVC对象
 */
cwap.mvc = new Object;
/**
 * 页面跳转脚本
 */
cwap.mvc.redirect = function(url) {
	window.location = url;
}

/**
 * 表单验证提交
 */
cwap.mvc.submit = function(id) {
	var valid = cwapv.validate(id);
	if (valid) {
		$("#" + id).submit();
	}
};