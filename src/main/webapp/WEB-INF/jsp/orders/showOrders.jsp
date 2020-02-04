<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/15
  Time: 16:39
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
    <title>订单信息</title>
    <link rel="stylesheet" href="/lib/layui/css/layui.css">
    <script src="/lib/layui/layui.js"></script>
</head>
<body>
    <div align="center">
        <blockquote class="layui-elem-quote"><h1>订单信息查询</h1></blockquote>
        <!--查询的表单-->
        <form class="layui-form" action="" lay-filter="example">
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">订单编号</label>
                    <div class="layui-input-inline">
                        <input type="text" name="orderNum" autocomplete="off" class="layui-input" placeholder="请输入订单编号">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">时间范围</label>
                    <div class="layui-input-inline" style="width: 320px;">
                        <input type="text" class="layui-input" id="test3" placeholder="选则时间范围" name="queryTimes">
                    </div>
                </div>
                <div class="layui-inline">
                    <label class="layui-form-label">订单状态</label>
                    <div class="layui-input-block">
                        <select name="orderStatus">
                            <option value="" selected>全部</option>
                            <option value="1">已支付</option>
                            <option value="0">未支付</option>
                        </select>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button class="layui-btn" lay-submit="" lay-filter="demo1"><i class="layui-icon">&#xe615;</i>查询</button>
                    </div>
                </div>
                <div class="layui-inline">
                    <div class="layui-input-inline">
                        <button type="button" class="layui-btn layui-btn-danger" id="batchBtn"><i class="layui-icon">&#xe640;</i>批量删除</button>
                    </div>
                </div>
            </div>
        </form>
        <table id="demo" lay-filter="test"></table>
    </div>
</body>
    <%--引入自定义js文件--%>
    <script src="/js/showOrders.js"></script>
    <script type="text/html" id="barDemo">
        <%--自定义房间状态模板--%>
        {{#  if(d.orderStatus == 1){ }}
        <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
        {{#  } else { }}
        <a class="layui-btn layui-btn-warm layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe6b2;</i>支付</a>
        {{#  } }}

        <%--<a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>--%>
    </script>
    <%--自定义是否VIP模板--%>
    <script type="text/html" id="isVipTpl">
        {{#  if(d.inRoomInfo.isVip == 1){ }}
        <font color="red">是</font>
        {{#  } else { }}
        <font color="#696969">否</font>
        {{#  } }}
    </script>
    <%--自定义房间状态模板--%>
    <script type="text/html" id="statusTpl">
        {{#  if(d.orderStatus == 0){ }}
        <font color="lime">未结算</font>
        {{#  } else { }}
        <font color="red">已结算</font>
        {{#  } }}
    </script>
</html>
