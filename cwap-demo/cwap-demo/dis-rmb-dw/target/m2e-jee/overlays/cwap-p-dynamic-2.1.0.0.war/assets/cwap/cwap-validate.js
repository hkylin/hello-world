var cwapv = new Object;

/**
 * 验证主函数
 */
cwapv.validate = function(id) {
	var valiResult = true; // 验证结果变量

	// 验证文本框、单选多选框、下拉列表
	var textfieldValiResult = valiTextfield(id);
	var radioCheckboxValiResult = valiRadioCheckbox(id);
	var selectValiResult = valiSelect(id);

	if (!textfieldValiResult || !radioCheckboxValiResult || !selectValiResult) {
		// 若存在验证不通过控件
		valiResult = false;
	}
	return valiResult;
}

/**
 * 验证消息显示API
 * 
 * @param cwapFor(错误消息显示控件id)
 * @param errorMsg(错误消息)
 * @param statusType(消息类型[成功，失败，警告])
 */
cwapv.info = function(cwapFor, errorMsg, statusType) {
	switch (statusType) {
	case "ST_SUCCESS": // 状态类型: 成功
		$("#" + cwapFor).html(getMsgIcon("ST_SUCCESS") + errorMsg);
		break;
	case "ST_ERROR": // 状态类型: 错误
		$("#" + cwapFor).html(getMsgIcon("ST_ERROR") + errorMsg);
		break;
	case "ST_WARNING": // 状态类型: 警告
		$("#" + cwapFor).html(getMsgIcon("ST_WARNING") + errorMsg);
		break;
	default: // 默认状态类型：错误
		$("#" + cwapFor).html(getMsgIcon("ST_ERROR") + errorMsg);
		break;
	}
}

/**
 * 输入框验证
 * 
 * @param id(验证域id)
 * @returns
 */
function valiTextfield(id) {
	var result = true; // 验证结果变量

	var textfields = $("#" + id + " :input[cwap-valid='true']").filter(
			"[type='text'], [type='email'], [type='password'], textarea");

	$(textfields).each(
			function() { // 遍历各输入框
				// 获取控件各属性值
				var cwapRequired = $(this).attr("cwap-required");
				var cwapReg = $(this).attr("cwap-reg");
				var cwapLabel = $(this).attr("cwap-label");
				var cwapError = $(this).attr("cwap-error");
				var cwapEqualTo = $(this).attr("cwap-equalTo");
				var cwapFor = $(this).attr("cwap-for");
				var cwapValue = $(this).val();

				if (cwapRequired == "true") { // 需非空验证
					if (valiRequired($(this), "CT_TEXTFIELD")) { // 非空验证成功
						removeErrMsg(cwapFor);
						if (cwapReg == "" || cwapReg == undefined) { // 不需正则验证
							if (cwapEqualTo == "" || cwapEqualTo == undefined) { // 不需相等性验证
								return;
							} else { // 需相等性验证
								var aimValue = $("#" + cwapEqualTo).val(); // 获取要匹配的值
								if (valiEqualTo(cwapValue, aimValue)) { // 相等性验证成功
									removeErrMsg(cwapFor);
								} else { // 相等性验证失败
									result = false;
									showErrMsg(cwapFor, cwapLabel, cwapError,
											"CT_TEXTFIELD", "ERR_EQUALTO");
								}
							}
						} else { // 需正则验证
							var regResult = valiRegExp(cwapValue, cwapReg);
							if (regResult != "REG_ERROR") {
								if (regResult) { // 正则验证成功
									if (cwapEqualTo == ""
											|| cwapEqualTo == undefined) { // 不需相等性验证
										return;
									} else { // 需相等性验证
										var aimValue = $("#" + cwapEqualTo)
												.val(); // 获取要匹配的值
										if (valiEqualTo(cwapValue, aimValue)) { // 相等性验证成功
											removeErrMsg(cwapFor);
										} else { // 相等性验证失败
											result = false;
											showErrMsg(cwapFor, cwapLabel,
													cwapError, "CT_TEXTFIELD",
													"ERR_EQUALTO");
										}
									}
								} else { // 正则验证失败
									result = false;
									showErrMsg(cwapFor, cwapLabel, cwapError,
											"CT_TEXTFIELD", "ERR_REG");
								}
							} else { // 正则表达式不合法
								removeErrMsg(cwapFor);
								result = false;
							}
						}
					} else { // 非空验证失败
						result = false;
						showErrMsg(cwapFor, cwapLabel, cwapError,
								"CT_TEXTFIELD", "ERR_REQUIRED");
					}
				} else { // 不需非空验证
					if (cwapReg == "" || cwapReg == undefined) { // 不需正则验证
						if (cwapEqualTo == "" || cwapEqualTo == undefined) { // 不需相等性验证
							return;
						} else { // 需相等性验证
							var aimValue = $("#" + cwapEqualTo).val(); // 获取要匹配的值
							if (valiEqualTo(cwapValue, aimValue)) { // 相等性验证成功
								removeErrMsg(cwapFor);
							} else { // 相等性验证失败
								result = false;
								showErrMsg(cwapFor, cwapLabel, cwapError,
										"CT_TEXTFIELD", "ERR_EQUALTO");
							}
						}
					} else { // 需正则验证
						var regResult = valiRegExp(cwapValue, cwapReg);
						if (regResult != "REG_ERROR") {
							if (regResult) { // 正则验证成功
								if (cwapEqualTo == ""
										|| cwapEqualTo == undefined) { // 不需相等性验证
									return;
								} else { // 需相等性验证
									var aimValue = $("#" + cwapEqualTo).val(); // 获取要匹配的值
									if (valiEqualTo(cwapValue, aimValue)) { // 相等性验证成功
										removeErrMsg(cwapFor);
									} else { // 相等性验证失败
										result = false;
										showErrMsg(cwapFor, cwapLabel,
												cwapError, "CT_TEXTFIELD",
												"ERR_EQUALTO");
									}
								}
							} else { // 正则验证失败
								result = false;
								showErrMsg(cwapFor, cwapLabel, cwapError,
										"CT_TEXTFIELD", "ERR_REG");
							}
						} else { // 正则表达式不合法
							removeErrMsg(cwapFor);
							result = false;
						}
					}
				}
			});

	return result;
}

/**
 * 单选(radio)、多选(checkbox)框组验证
 * 
 * @param id(验证域id)
 * @returns
 */
function valiRadioCheckbox(id) {
	var result = true; // 验证结果变量

	var radioCheckboxs = $("#" + id + " [cwap-valid='true']").filter(
			"[type='radio'], [type='checkbox']");// 获取所有单选/多选框组

	$(radioCheckboxs).each(
			function() { // 遍历各单选多选框组
				// 获取控件各属性值
				var cwapRequired = $(this).attr("cwap-required");
				var cwapLabel = $(this).attr("cwap-label");
				var cwapError = $(this).attr("cwap-error");
				var cwapFor = $(this).attr("cwap-for");
				var groupName = $(this).attr("name");

				// 查找同组的单选/多选控件
				var group = $("#" + id + " [name=" + groupName + "]").filter(
						"[type='radio'], [type='checkbox']");

				// 执行验证
				if (cwapRequired == "true") { // 需非空验证
					if (valiRequired(group, "CT_RADIOCHECKBOX")) { // 非空验证成功
						removeErrMsg(cwapFor);
					} else { // 非空验证失败
						result = false;
						showErrMsg(cwapFor, cwapLabel, cwapError,
								"CT_RADIOCHECKBOX", "ERR_REQUIRED");
					}
				}
			});

	return result;
}

/**
 * 下拉列表(select)验证
 * 
 * @param id(验证域id)
 * @returns
 */
function valiSelect(id) {
	var result = true; // 验证结果变量

	var selects = $("#" + id + " [cwap-valid='true']").filter("select");// 获取所有下拉菜单

	$(selects).each(
			function() { // 遍历各下拉列表
				// 获取控件各属性值
				var cwapRequired = $(this).attr("cwap-required");
				var cwapLabel = $(this).attr("cwap-label");
				var cwapError = $(this).attr("cwap-error");
				var cwapFor = $(this).attr("cwap-for");

				// 执行验证
				if (cwapRequired == "true") { // 需非空验证
					if (valiRequired($(this), "CT_SELECT")) { // 非空验证成功
						removeErrMsg(cwapFor);
					} else { // 非空验证失败
						result = false;
						showErrMsg(cwapFor, cwapLabel, cwapError, "CT_SELECT",
								"ERR_REQUIRED");
					}
				}
			});

	return result;
}

/**
 * 非空验证
 * 
 * @param control(控件)
 * @param controlType(控件类型)
 * @returns
 */
function valiRequired(control, controlType) {
	switch (controlType) {
	case "CT_TEXTFIELD": // 控件类型：输入框[text,password,email]
	case "CT_SELECT": // 控件类型：下拉列表[select]
	{
		return control.val() != "" ? true : false;
	}
		break;
	case "CT_RADIOCHECKBOX": // 控件类型：单选/多选框组
	{
		var i = 0;
		for (i; i < control.length; i++) {
			if (control[i].checked) { // 存在选中项
				return true;
			}
		}
		if (i >= control.length) { // 不存在选中项
			return false;
		}
	}
		break;
	default:
		break;
	}
}

/**
 * 正则匹配验证
 * 
 * @param cwapValue(控件值)
 * @param cwapReg(正则表达式)
 * @returns
 */
function valiRegExp(cwapValue, cwapReg) {
	try {
		return eval(cwapReg).test(cwapValue) ? true : false; // 正则匹配
	} catch (err) { // 不合法正则表达式，捕获异常
		alert("警告! 正则表达式:" + cwapReg + "不合法,请检查！");
		return "REG_ERROR";
	}
}

/**
 * 相等性验证
 * 
 * @param cwapValue(控件值)
 * @param aimValue(要匹配的目标值)
 * @returns
 */
function valiEqualTo(cwapValue, aimValue) {
	return cwapValue == aimValue ? true : false; // 相等性验证
}

/**
 * 错误信息显示
 * 
 * @param cwapFor(错误消息显示控件id)
 * @param cwapLabel(控件标识)
 * @param cwapError(自定义错误提示消息)
 * @param controlType(控件类型)
 * @param errType(错误消息类型)
 */
function showErrMsg(cwapFor, cwapLabel, cwapError, controlType, errType) {
	// 设置动作
	var action = "";
	switch (controlType) {
	case "CT_TEXTFIELD": // 控件类型：输入框[text,password,email,textarea]
		action = "输入";
		break;
	case "CT_RADIOCHECKBOX": // 控件类型：单选多选框组
	case "CT_SELECT": // 控件类型：下拉列表
		action = "选择"
		break;
	default:
		break;
	}

	// 错误信息显示
	switch (errType) {
	case "ERR_REQUIRED": // 错误类型：非空
	{
		removeErrMsg(cwapFor); // 清空错误信息
		if (cwapLabel == "" || cwapLabel == undefined) {
			$("#" + cwapFor)
					.html(getMsgIcon("ST_WARNING") + "请" + action + "值");
		} else {
			$("#" + cwapFor).html(
					getMsgIcon("ST_WARNING") + '请' + action + cwapLabel);
		}
	}
		break;
	case "ERR_REG": // 错误类型：正则
	{
		removeErrMsg(cwapFor); // 清空错误信息
		if (cwapError == "" || cwapError == undefined) {
			$("#" + cwapFor).html(getMsgIcon("ST_ERROR") + "验证不匹配");
		} else {
			$("#" + cwapFor).html(getMsgIcon("ST_ERROR") + cwapError);
		}
	}
		break;
	case "ERR_EQUALTO": // 错误类型：相等性
	{
		removeErrMsg(cwapFor); // 清空错误信息
		$("#" + cwapFor).html(getMsgIcon("ST_ERROR") + "两次输入值不一致");
	}
		break;
	default:
		break;
	}
}

/**
 * 错误消息清除
 */
function removeErrMsg(cwapFor) {
	$("#" + cwapFor).empty().html(getMsgIcon("ST_SUCCESS"));
}

/**
 * 获取提示信息图标
 * 
 * @param statusType(验证状态)
 * @returns {String}
 */
function getMsgIcon(statusType) {
	switch (statusType) {
	case "ST_SUCCESS": // 状态类型: 成功
		return '<span style="display: inline-block; margin-left: 1px; margin-right: 2px; width: 16px; height: 16px; vertical-align: middle; background: url(../assets/cwap/images/validate-success.png) no-repeat;"></span>';
		break;
	case "ST_ERROR": // 状态类型: 错误
		return '<span style="display: inline-block; margin-left: 1px; margin-right: 2px; width: 16px; height: 16px; vertical-align: middle; background: url(../assets/cwap/images/validate-error.png) no-repeat;"></span>';
		break;
	case "ST_WARNING": // 状态类型: 警告
		return '<span style="display: inline-block; margin-left: 1px; margin-right: 2px; width: 16px; height: 16px; vertical-align: middle; background: url(../assets/cwap/images/validate-warning.png) no-repeat;"></span>';
		break;
	default:
		break;
	}
}