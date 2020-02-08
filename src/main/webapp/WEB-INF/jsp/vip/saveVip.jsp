<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2019/11/19
  Time: 22:42
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
    <div style="padding-top: 50px;padding-left: 50px;background-color:lightsteelblue;width: 900px;height: 1000px" >
        <fieldset class="layui-elem-field layui-field-title">
            <legend>VIP会员信息添加</legend>
        </fieldset>
        <form class="layui-form layui-form-pane" action="" style="margin: 30px 0 0 30px">
            <div class="layui-form-item">
                <label class="layui-form-label">身份证号：</label>
                <div class="layui-input-inline" style="width: 300px;">
                    <input type="text" name="idcard" id="idcard" lay-verify="required|identity" placeholder="请输入身份证号" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">客人姓名：</label>
                    <div class="layui-input-inline" style="width: 300px;">
                        <input type="text" name="customerName" lay-verify="required" placeholder="请输入客人姓名" autocomplete="off" class="layui-input">
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">会员类型：</label>
                <div class="layui-input-inline" style="width: 300px;">
                    <select name="vipRate" lay-filter="vipRate" lay-verify="required">
                        <option value="">---请选择会员类型---</option>
                        <option value="0.9">普通会员</option>
                        <option value="0.8">超级会员</option>
                    </select>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">会员卡号：</label>
                <div class="layui-input-inline" style="width: 300px;">
                    <input type="text"  name="vipNum" id="vipNum" placeholder="自动生成会员卡号" autocomplete="off" class="layui-input" disabled>
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">联系方式：</label>
                <div class="layui-input-inline" style="width: 300px;">
                    <input type="text" id="phone" name="phone" placeholder="请输入联系方式" lay-verify="required|phone" autocomplete="off" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">选择性别：</label>
                    <div class="layui-input-block">
                        <input type="radio" name="gender" value="1" title="男" checked="checked"/>
                        <input type="radio" name="gender" value="0" title="女"/>
                        <input type="radio" name="gender" value="2" title="未识别" disabled="">
                    </div>
                </div>
            </div>
            <div class="layui-form-item" style="margin-left: 100px;margin-top: 40px;">
                <button class="layui-btn" lay-submit="" lay-filter="demo2">确认添加</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </form>
    </div>
</body>
    <%--引入自定义js文件--%>
    <script src="/js/saveVip.js"></script>
</html>
