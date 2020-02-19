<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/25
  Time: 19:41
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
        <blockquote class="layui-elem-quote"><h1>用户信息查询</h1></blockquote>
        <%--定义数据容器--%>
        <table id="demo" lay-filter="test"></table>
    </div>
</body>
    <%--引入自定义js文件--%>
    <script src="/js/showUser.js"></script>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="detail"><i class="layui-icon">&#xe615;</i>查看</a>
    </script>
    <%--自定义是否启用模板--%>
    <script type="text/html" id="isStatusTpl">
        {{#  if(d.useStatus == 1){ }}
        <font color="#7cfc00">启用</font>
        {{#  } else { }}
        <font color="red">禁用</font>
        {{#  } }}
    </script>
</html>
