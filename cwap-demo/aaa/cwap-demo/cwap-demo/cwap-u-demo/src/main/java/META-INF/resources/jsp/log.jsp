<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cwap" uri="http://cfets/cwap-tags"%>
<!DOCTYPE html>
<html>
<head>

<style type="text/css">
.relation .modal-header {
	color: #FAF5F5;
	background-color: #428bca;
	border-radius: 4px 4px 0px 0px;
}
</style>
<c:import url="/inc/js.jsp" />


<script type="text/javascript">
	function showSearch() {
		var context = $('#searchinput').val();
		cwap.mvc.redirect('logsearch.do?context=' + context);
	}
	
	function showModifyModal(data){
		alert(data);
		$('#modifyModal').modal({keybord:true});
		cwap.mvc.modal(data);
	}
	
	function showAddModal(){
		$('#addModal').modal({keybord:true});
	}
	
	function modify(){
		//alert("click");
		//验证表单
		cwap.mvc.submit('modifyForm');
	}
	function add(){
		//alert("click");
		//验证表单
		cwap.mvc.submit('addForm');
	}
</script>
<c:import url="/inc/metadata.jsp" />
</head>

<body>

	<c:import url="/inc/header.jsp" />

	<cwap:menubar5 />

	<!-- ad/top栏 -->
	<div id="sys-content" class="container">
		<!-- 主体内容 -->
		<div class="row">
			<div class="col-md-6 col-lg-6">
				<div class="row">
					<label class="col-sm-1 col-md-2 control-label text-right" style="">查询内容</label>
					<div class="col-sm-6 col-md-8">
						<div class="input-group" style="text-align: center;">
							<input type="text" name="searchinput" id="searchinput"
								class="form-control" placeholder="" value="${context}">
							</input> <span class="input-group-btn">
								<button class="btn btn-primary" id="search_btn" type="submit"
									onClick="showSearch()">
									<span class="glyphicon glyphicon-search"></span><span
										style="margin-left: 3px; margin-top: -5px;">查询</span>
								</button>
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div style="min-height: 6px;"></div>
		</div>
		<div class="row">
			<div class="col-md-13 text-left">
				<div class="panel panel-primary auto-height">
					<div class="panel-heading">
						<span class="glyphicon glyphicon-gift"></span> 内容展示
						<div id="sort" style="float: right;" margin-top: 1px;>
							<span class="glyphicon glyphicon-plus-sign"></span>
							<span style="cursor: pointer; margin-left: 3px; margin-right: 15px; padding-top: -7px;" onClick="showAddModal()">新增</span>
						</div>
					</div>
					<div>
						<table class="table table-hover">
							<tr>
								<td style="vertical-align: middle">ID</td>
																<td style="vertical-align: middle">姓名</td>
																<td style="vertical-align: middle">密码</td>
																<td style="vertical-align: middle">号码</td>
																<td style="vertical-align: middle">地址</td>
															</tr>
							<tbody>
																<c:if test="${not empty items}">
									<c:forEach items="${items}" var="item">
										<tr>
											<td style="vertical-align: middle" >${item.id}</td>
																																	<td style="vertical-align: middle">${item.name}</td>
																						<td style="vertical-align: middle">${item.password}</td>
																						<td style="vertical-align: middle">${item.phone}</td>
																						<td style="vertical-align: middle">${item.place}</td>
																						<td style="vertical-align: middle" hidden=true id="${item.id}">${item.toJson()}</td>
											<td style="vertical-align: middle; text-align: center">
												<button class="btn btn-primary" type="button" onclick="showModifyModal($('#'+${item.id}).text())">修改</button>
												<span class="btn btn-primary" onClick="cwap.mvc.redirect('logdelete.do?id=${item.id}')">删除</span>
											</td>
										</tr>
									</c:forEach>
								</c:if>
																<c:if test="${empty items}">
									<td style="vertical-align: middle"><font color="red">搜素结果为空</font></td>
								</c:if>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

				
		<!-- 修改功能模态框演示Start -->
		<div id="modifyModal" class="modal fade relation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
			<div class="modal-content">
				<form id="modifyForm" class="form-horizontal" action="logmodify.do" method="post">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<span>修改</span>
					</div>
					<div class="modal-body">
						<div class="form-group row">
								<label class="col-sm-3 control-label">ID</label>
								<div class="col-sm-7">
									<input id="id" name="id" type="text" readOnly="true" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">姓名</label>
								<div class="col-sm-7">
									<input id="name" name="name" type="text" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">密码</label>
								<div class="col-sm-7">
									<input id="password" name="password" type="text" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">号码</label>
								<div class="col-sm-7">
									<input id="phone" name="phone" type="text" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">地址</label>
								<div class="col-sm-7">
									<input id="place" name="place" type="text" class="form-control"/>	
								</div>
							</div>
												
					</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-default"  data-dismiss="modal">关闭</a>
						<button type="button" class="btn btn-primary" onClick="modify()">保存</button>
					</div>
				</form>
				</div>
			</div>
		</div>
	<!-- 模态框演示End -->
	
	<!-- 添加功能模态框演示Start -->
		<div id="addModal" class="modal fade relation" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
			<div class="modal-content">
				<form id="addForm" class="form-horizontal" action="logadd.do" method="post">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
						<span>新增</span>
					</div>
					<div class="modal-body">
													<div class="form-group row">
								<label class="col-sm-3 control-label">姓名</label>
								<div class="col-sm-7">
									<input id="name" name="name" type="text" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">密码</label>
								<div class="col-sm-7">
									<input id="password" name="password" type="text" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">号码</label>
								<div class="col-sm-7">
									<input id="phone" name="phone" type="text" class="form-control"/>	
								</div>
							</div>
													<div class="form-group row">
								<label class="col-sm-3 control-label">地址</label>
								<div class="col-sm-7">
									<input id="place" name="place" type="text" class="form-control"/>	
								</div>
							</div>
												
					</div>
					<div class="modal-footer">
						<a href="#" class="btn btn-default"  data-dismiss="modal">关闭</a>
						<button type="button" class="btn btn-primary" onClick="add()">保存</button>
					</div>
				</form>
				</div>
			</div>
		</div>
	<!-- 模态框演示End -->

	<c:import url="/inc/footer.jsp" />
</body>
</html>
