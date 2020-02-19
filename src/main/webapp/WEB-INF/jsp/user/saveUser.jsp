<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/30
  Time: 23:04
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <script src="/lib/layui/layui.js"></script>
</head>
<body>
<fieldset class="layui-elem-field layui-field-title">
    <legend>用户添加</legend>
</fieldset>
<form class="layui-form layui-form-pane" action="" style="margin: 30px 0 0 30px">
    <div class="layui-form-item">
        <label class="layui-form-label">用户名：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <input type="text" name="username" id="username" lay-verify="required|username" placeholder="请输入用户名" autocomplete="off" class="layui-input">
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">密码：</label>
            <div class="layui-input-inline" style="width: 300px;">
                <input type="text" name="pwd" id="pwd" lay-verify="required|pwd" placeholder="请输入密码" autocomplete="off" class="layui-input">
            </div>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">角色类型：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <select name="roleId" id="roleId">
            </select>
        </div>
    </div>
    <div class="layui-form-item">
        <label class="layui-form-label">添加时间：</label>
        <div class="layui-input-inline" style="width: 300px;">
            <input type="text"  name="createDate" id="createDate" autocomplete="off" class="layui-input" disabled>
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-inline">
            <label class="layui-form-label">启用状态：</label>
            <div class="layui-input-block">
                <input type="radio" name="useStatus" value="1" title="启用" checked="checked"/>
                <input type="radio" name="useStatus" value="0" title="禁用"/>
                <input type="radio" name="useStatus" value="2" title="未识别" disabled="">
            </div>
        </div>
    </div>
    <div class="layui-form-item" style="margin-left: 100px;margin-top: 40px;">
        <button class="layui-btn" lay-submit="" lay-filter="demo2">确认添加</button>
        <button type="reset" class="layui-btn layui-btn-primary">重置</button>
    </div>
</form>
</body>
<%--引入自定义js文件--%>
<script src="/js/saveUser.js"></script>
</html>
