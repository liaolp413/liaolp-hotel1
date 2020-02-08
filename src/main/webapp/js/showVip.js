layui.use(['jquery','table','form','layer','laydate'],function () {
    /*实例化引入的模块
   * */
    var $ = layui.jquery,
        table = layui.table,
        form = layui.form,
        layer = layui.layer,
        laydate = layui.laydate;
    var currentPage = 1;
    var selVipJson = {};
    loadVipByParam(selVipJson);

    function loadVipByParam(selVipJson){
        //加载全部会员信息
        table.render({
            elem: '#demo'
            , height: 452
            , width: 1680
            ,where:selVipJson
            , url: 'vip/loadTByPramas' //数据接口
            , page: true //开启分页
            , limit: 5
            , even: true
            , cols: [[ //表头
                {type: 'checkbox', align: 'center'}
                , {field: 'id', title: 'ID', width: 80, sort: true, align: 'center'}
                , {field: 'vipNum', title: '会员卡号', width: 200, align: 'center'}
                , {field: 'customerName', title: '会员姓名', width: 120, align: 'center',edit:'text'}
                , {field: 'vipRate', title: '会员类型', width: 120, align: 'center', templet: '#VipRatepTpl'}
                , {field: 'gender', title: '性别', width: 100, align: 'center', templet: '#genderTpl'}
                , {field: 'idcard', title: '身份证号', width: 220, align: 'center'}
                , {field: 'phone', title: '手机号', width: 180, align: 'center'}
                , {field: 'createDate', title: '注册日期', width: 220, align: 'center'}
                , {fixed: 'right', title: '操作', width: 180, align: 'center', toolbar: '#barDemo'}
            ]]
            ,done:function (res, curr, count) {  //表格执行加载时的函数回调
                currentPage = curr;
            }
        });

    }

    
    //监听条件查询
    form.on('submit(demo1)', function(sel){
        selVipJson = sel.field;
        console.log(selVipJson); //当前容器的全部表单字段，名值对形式：{name: value}
        loadVipByParam(selVipJson);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'query'){ //查看
            //do somehing
        }  else if(layEvent === 'edit'){ //修改
            //弹框前赋值
            $("#phone").val(data.phone);
            var vipRateStr = '';
            if (data.vipRate==0.8){
                vipRateStr+='<option value="0.8">超级会员</option><option value="0.9">普通会员</option>'
            } else {
                vipRateStr+='<option value="0.9">普通会员</option><option value="0.8">超级会员</option>'
            }
            $("#vipRate").html(vipRateStr);
            form.render("select");
            //弹出退房表单
            layer.open({
                type: 1
                ,title:'修改vip信息界面'
                , area:['400px','300px'] //宽高度
                ,shade:0.5
                ,anim:3
                ,content: $("#updVipDiv")//弹框内容
            });

            //监听提交修改
            form.on('submit(demo3)', function(upd){
                var updateVipJson = {};
                updateVipJson["id"] = data.id;
                updateVipJson["phone"] = upd.field.phone;
                updateVipJson["vipRate"] = upd.field.vipRate;
                console.log(updateVipJson); //当前容器的全部表单字段，名值对形式：{name: value}
                updateVipByParam(updateVipJson,obj);
                layer.closeAll();
                return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
            });
        }
    });

    //监听单元格编辑时间
    table.on('edit(test)',function (text) {
       var value = text.value //修改后的值
           ,data = text.data //所有行所在的值
           ,field = text.field //对应的字段
       // console.log(value,data,field);
       var updateVipJson = {}
       updateVipJson["id"] = data.id;
       updateVipJson[field] = value;
       updateVipJson["phone"] ="";
       //调用修改方法
        updateVipByParam(updateVipJson);
    });
    //修改会员信息
    function updateVipByParam(updateVipJson,obj) {
        $.ajax({
            type:"post",
            url:"vip/updByPramasKey",
            data:updateVipJson,
            success:function (data) {
                if (data === 'success'){
                    layer.msg("修改会员信息成功。。",{icon:1,time:2000,anim:4});
                    if (updateVipJson.phone!=""){
                        obj.update({
                            phone: updateVipJson.phone,
                            vipRate:updateVipJson.vipRate
                        });
                    }
                }else {
                    layer.msg("修改会员信息失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }
    //表格重写加载，用于批量删除刷新当前页
    function flush(currentPage){
        table.reload('demo', {  //为数据表格的id
            //      where: selJsonOrders//查询的条件，不建议使用
            page: {
                curr: currentPage //重新从第几页开始
            }
        });
    }
});