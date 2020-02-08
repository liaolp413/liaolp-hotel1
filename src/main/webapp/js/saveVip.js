layui.use(['jquery','form','layer','laydate'],function () {
    //初始化引入模块
    var $ = layui.jquery,
        form  = layui.form,
        layer = layui.layer,
        laydate = layui.laydate;
    var idcardIf = false;
    var phoneIf = false;
    
    var nowDate;
    //绑定身份证失去焦点事件,验证身份证的唯一性
    $("#idcard").blur(function () {
        var reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        var checkVip = {};
        if (reg.test($(this).val())){
            checkVip["idcard"] = $(this).val();
            checkVipByIdcard(checkVip);
        } else {
            layer.tips('身份证号格式不正确！', '#idcard', {tips: [2,'#fc1505'], time:3000});  //吸附框
        }
    })

    //绑定手机号栏数去焦点事件 验证手机号唯一性
    $("#phone").blur(function () {
        var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        var checkPhone = {};
        if (reg.test($(this).val())){
            checkPhone["phone"] = $(this).val();
            checkVipByPhone(checkPhone);
        } else {
            layer.tips('手机号格式不正确！', '#phone', {tips: [2,'#fc1505'], time:3000});  //吸附框
        }
    })
    //监听下拉框 获取会员类型 及折扣
    form.on('select(vipRate)', function(data){
        nowDate = new Date();
        var vipNum = dateReplace(getNowDate(nowDate));
        if (data.value==0.9) {
            vipNum +="02"
        }else {
            vipNum +="01"
        }
        $("#vipNum").val(vipNum);
        console.log(vipNum); //得到被选中的值
    });

    //监听表单提交
    form.on('submit(demo2)', function(data){
        if (idcardIf&&phoneIf){
            var vipJson = data.field;
            vipJson["createDate"] = getNowDate(new Date());
            addVipByParam(vipJson);
        } else if (!idcardIf&&phoneIf){
            layer.tips('身份证号已被注册！', '#idcard', {tips: [2,'#fc1505'], time:3000});  //吸附框
        } else if (!phoneIf&&idcardIf){
            layer.tips('手机号已被注册！', '#phone', {tips: [2,'#fc1505'], time:3000});  //吸附框
        } else {
            layer.tips('手机号与身份证均已被注册！', '#phone', {tips: [2,'#fc1505'], time:3000});  //吸附框
        }
        //console.log(vipJson); //当前容器的全部表单字段，名值对形式：{name: value}
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //异步查询身份证唯一性
    function checkVipByIdcard(checkVip) {
        $.ajax({
            type:"post",
            url:"vip/getCountByParams",
            data:checkVip,
            success:function (data) {
                if (data===1){
                    layer.tips('身份证号已被注册！', '#idcard', {tips: [2,'#fc1505'], time:3000});  //吸附框
                    idcardIf = false;
                } else {
                    layer.tips('身份证号可用。。', '#idcard', {tips: [2,'green'], time:3000});  //吸附框
                    idcardIf = true;
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }

    //异步查询手机号唯一性
    function checkVipByPhone(checkPhone) {
        $.ajax({
            type:"post",
            url:"vip/getCountByParams",
            data:checkPhone,
            success:function (data) {
                if (data===1){
                    layer.tips('手机号已被注册！', '#phone', {tips: [2,'#fc1505'], time:3000});  //吸附框
                    phoneIf = false;
                } else {
                    layer.tips('手机号可用。。', '#phone', {tips: [2,'green'], time:3000});  //吸附框
                    phoneIf = true;
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }

    //添加会员
    function addVipByParam(vipJson) {
        $.ajax({
            type:"post",
            url:"vip/insertParams",
            data:vipJson,
            success:function (data) {
                if (data==="success"){
                    layer.msg("添加成功。。",{icon:1,time:2000,anim:4});
                    setTimeout('window.location="model/toShowVip"',2000);//2秒后跳转到会员信息主页
                } else {
                    layer.msg("添加失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }
    //获取当前时间字符串     Date()   ---->  yyyy/MM//dd HH:mm:ss 格式的字符串
    function getNowDate(date) {
        var sign1 = "/";
        var sign2 = ":";
        var year = date.getFullYear() // 年
        var month = date.getMonth() + 1; // 月
        var day  = date.getDate(); // 日
        var hour = date.getHours(); // 时
        var minutes = date.getMinutes(); // 分
        var seconds = date.getSeconds() //秒
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (day >= 0 && day <= 9) {
            day = "0" + day;
        }
        if (hour >= 0 && hour <= 9) {
            hour = "0" + hour;
        }
        if (minutes >= 0 && minutes <= 9) {
            minutes = "0" + minutes;
        }
        if (seconds >= 0 && seconds <= 9) {
            seconds = "0" + seconds;
        }
        var currentdate = year + sign1 + month + sign1 + day + " " + hour + sign2 + minutes + sign2 + seconds ;
        return currentdate;
    }

    //把 2019/01/01 12:12:12  -->  20190101121212
    function dateReplace(date) {
        date = date.replace("/","");
        date = date.replace("/","");
        date = date.replace(" ","");
        date = date.replace(":","");
        date = date.replace(":","");
        return date;
    }
});