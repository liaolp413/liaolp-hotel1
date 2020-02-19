<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/19
  Time: 8:53
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
    <div align="center">
    <%--定义数据容器--%>
        <h1>消费记录查询</h1>
        <!--查询的表单-->
        <form class="layui-form" action="" lay-filter="example" style="margin-top: 20px;">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">房间编号</label>
                    <div class="layui-input-inline">
                        <input type="text" name="roomNum" autocomplete="off" class="layui-input" placeholder="请输入房间编号">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">时间范围</label>
                    <div class="layui-input-inline" style="width: 420px;">
                        <input type="text" class="layui-input" id="test3" placeholder="选则时间范围" name="queryTimes">
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                    </div>
                </div>
            </div>
        </form>
        <table id="demo" lay-filter="test"></table>
    </div>
</body>
    <script src="/js/showRoomSale.js"></script>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="detail"><i class="layui-icon">&#xe615;</i>查看</a>
    </script>
</html>
