<!--TODO cwap-header 标签-->
<!-- header -->
<%@ page contentType="text/html; charset=UTF-8" language="java"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="cwap" uri="http://cfets/cwap-tags"%>

<div id="sys-header" class="header_content" style="height: 56px">
	<div class="container ">
			<div class="row">
				<div class="col-md-6 col-sm-12 col-xs-12">
					<h3>
						<font color="white" style="">Welcome to Dynamic APP</font>
					</h3>
				</div>
				<div class="col-md-6 col-sm-12 col-xs-12 text-right">
					<h4 style="margin-top: 16px">
						<font color="white">当前登录:<cwap:session key="cwap.account" field="account"/>&nbsp;&nbsp;</font>
						<font color="white"><a href="../cwap-s-web/logout.do"
							style="padding-top: 10px"><span
								class="glyphicon glyphicon-log-out">退出</span></a></font>
					</h4>
				</div>
			</div>
	</div>
</div>