<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2020/2/5
  Time: 16:43
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
    <style type="text/css">
        .layui-table td{
            height: 60px;
        }
    </style>
<body>
    <%--影藏修改表单--%>
    <div align="center" style="display: none;margin-top: 20px;" id="updVipDiv">
        <form class="layui-form layui-form-pane" action="" lay-filter="exitInRoomInfoForm" style="margin-left: 50px;">
            <div class="layui-form-item">
                <label class="layui-form-label">手机号：</label>
                <div class="layui-input-inline">
                    <input type="text" name="phone" id="phone" lay-verify="required|phone" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">会员类型：</label>
                <div class="layui-input-inline">
                    <select name="vipRate" id="vipRate" lay-verify="required">
                    </select>
                </div>
            </div>
            <div class="layui-form-item" style="margin-left: 70px;">
                <button class="layui-btn layui-btn-lg" lay-submit="" lay-filter="demo3"><i class="layui-icon">&#xe605;</i>修改</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </form>
    </div>
<div align="center">
    <h1>会员信息查询</h1>
    <form class="layui-form" action="" lay-filter="example" style="margin-top: 20px;">
        <div class="layui-form-item">
            <div class="layui-inline">
                <label class="layui-form-label">身份证号</label>
                <div class="layui-input-inline">
                    <input type="text" name="idcard" autocomplete="off" class="layui-input" placeholder="请输入身份证号">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">会员卡号</label>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" placeholder="输入会员卡号" name="vipNum">
                </div>
            </div>
            <div class="layui-inline">
                <label class="layui-form-label">会员类型</label>
                <div class="layui-input-block">
                    <select name="vipRate">
                        <option value="" selected>全部</option>
                        <option value="0.9">普通会员</option>
                        <option value="0.8">超级会员</option>
                    </select>
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
    <%--引入自定义js--%>
    <script src="/js/showVip.js"></script>
    <script type="text/html" id="barDemo">
        <a class="layui-btn layui-btn-xs" lay-event="query"><i class="layui-icon">&#xe609;</i>查询</a>
        <a class="layui-btn layui-btn-xs layui-btn-danger" lay-event="edit"><i class="layui-icon">&#xe642;</i>修改</a>
    </script>
    <%--自定义性别模板--%>
    <script type="text/html" id="genderTpl">
        {{#  if(d.gender == 1){ }}
        <font color="#7cfc00">男</font>
        {{#  } else { }}
        <font color="red">女</font>
        {{#  } }}
    </script>
    <%--自定义是否VIP模板--%>
    <script type="text/html" id="VipRatepTpl">
        {{#  if(d.vipRate == 0.8){ }}
        <font color="#ffd700">超级会员</font>
        {{#  } else { }}
        <font color="#adff2f">普通会员</font>
        {{#  } }}
    </script>
</html>
