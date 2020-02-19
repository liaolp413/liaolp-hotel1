<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/25
  Time: 9:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>角色信息</title>
    <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <!--引入ztree相关css和js文件-->
    <link rel="stylesheet" href="lib/zTree/css/icomoon_styles.css" type="text/css">
    <link rel="stylesheet" href="lib/zTree/css/metroStyle.css" type="text/css">
    <script type="text/javascript" src="lib/zTree/js/jquery-1.4.4.min.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.core.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.excheck.js"></script>
    <script type="text/javascript" src="lib/zTree/js/jquery.ztree.exedit.js"></script>
    <script src="/lib/layui/layui.js"></script>
</head>
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
    </style>
<body>
    <!--权限树形容器-->
    <div id="ztreeDiv" class="content_wrap" style="display: none;">
        <div class="zTreeDemoBackground left">
            <ul id="test1" class="ztree"></ul>
        </div>
    </div>
    <div align="center">
        <blockquote class="layui-elem-quote"><h1>角色信息查询</h1></blockquote>
            <%--定义数据容器--%>
        <table id="demo" lay-filter="test"></table>
    </div>
</body>
    <script src="/js/showRole.js"></script>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="detail"><i class="layui-icon">&#xe615;</i>查看</a>
    </script>
    <%--自定义是否启用模板--%>
    <script type="text/html" id="isStatusTpl">
        {{#  if(d.status == 1){ }}
        <font color="#7cfc00">启用</font>
        {{#  } else { }}
        <font color="red">禁用</font>
        {{#  } }}
    </script>
    <%--自定义显示状态模板--%>
    <script type="text/html" id="isFlagTpl">
        {{#  if(d.flag == 1){ }}
        <font color="red">超级角色</font>
        {{#  } else { }}
        <font color="#696969">普通角色</font>
        {{#  } }}
    </script>
</html>
