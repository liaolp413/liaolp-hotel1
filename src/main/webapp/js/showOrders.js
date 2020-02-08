layui.use(['jquery','layer','table','form','laydate'],function () {
    //将模块初始化
    var $ = layui.jquery,
        layer = layui.layer,
        table = layui.table,
        form = layui.form,
        laydate = layui.laydate;

    var currentPage =1;
    var selOrdersJson = {};

    loadOrders(selOrdersJson);

    //分页加载订单数据
    function loadOrders(selOrdersJson) {
        table.render({
            elem: '#demo'
            , height: 452
            , width: 1680
            ,where:selOrdersJson
            , url: 'orders/loadTByPramas' //数据接口
            , page: true //开启分页
            , limit: 5
            , even: true
            , cols: [[ //表头
                {type: 'checkbox', align: 'center'}
                , {field: 'id', title: 'ID', width: 80, sort: true, align: 'center'}
                , {field: 'orderNum', title: '订单编号', width: 200, align: 'center'}
                , {field: 'customerName', title: '客人姓名', width: 120, align: 'center', templet: '<div>{{d.inRoomInfo.customerName}}</div>'}
                , {field: 'idcard', title: '身份证号', width: 180, align: 'center', templet: '<div>{{d.inRoomInfo.idcard}}</div>'}
                , {field: 'isVip', title: 'VIP', width: 100, align: 'center', templet: '#isVipTpl'}
                , {field: 'phone', title: '手机号', width: 180, align: 'center', templet: '<div>{{d.inRoomInfo.phone}}</div>'}
                , {field: 'createDate', title: '下单时间', width: 60, align: 'center'}
                , {field: 'orderMoney', title: '总价', width: 60, align: 'center'}
                , {field: 'remark', title: '备注', width: 200, align: 'center'}
                , {field: 'orderStatus', title: '状态', width: 140, align: 'center', templet: '#statusTpl'}
                , {fixed: 'right', title: '操作', width: 180, align: 'center', toolbar: '#barDemo'}
            ]]
            ,done:function (res, curr, count) {  //表格执行加载时的函数回调
                currentPage = curr;
            }
        });
    }
    //监听条件查询 表单提交
    form.on('submit(demo1)', function(sel){
        selOrdersJson = {};
        selOrdersJson["orderNum"] = sel.field.orderNum;
        selOrdersJson["orderStatus"] = sel.field.orderStatus;
        //得到时间范围的数据
        if(sel.field.queryTimes!=""){
            var arrTimes = sel.field.queryTimes.split("-");
            selOrdersJson["startTime"] = arrTimes[0];
            selOrdersJson["endTime"] = arrTimes[1];
        }
        console.log(selOrdersJson) ;//当前容器的全部表单字段，名值对形式：{name: value}
        loadOrders(selOrdersJson);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

       if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                //obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                var delJson = {};
                delJson["id"] = data.id;
                delJson["flag"] = "0";
                layer.close(index);
                delOrdersByParam(delJson);
                console.log(delJson);
                //向服务端发送删除指令
            });
        } else if(layEvent === 'edit'){ //编辑
            //do something
           layer.confirm('确定去支付吗', function(index){
               window.open("orders/toPay?orderNum="+data.orderNum+'&orderMoney='+data.orderMoney);
               layer.close(index);
           });
        }
    });

    //监听批量删除
    $("#batchBtn").click(function () {
       var checkStatus = table.checkStatus("demo");
       var data = checkStatus.data;
       if (data.length!=0){
           var batchDel = true;
           var ids = "";
           for (var i=0;i<data.length;i++){
               if (data[i].orderStatus=="0"){
                   batchDel = false;
                   break;
               }else {
                   ids+=data[i].id+","
               }
           }
           if (batchDel){
               layer.confirm('真的删除行么', function(index){
                   layer.close(index);
                   //向服务端发送删除指令
                   batchDelOrders(ids)
               });
           } else {
               layer.msg("选中的数据有未结算订单！！",{icon:3,time:2000,shade:0.5,anim:6});
           }
       }else {
           layer.msg("还未选中要删除的数据！！",{icon:3,time:2000,shade:0.5,anim:6});
       }
       //console.log(data);
    });

    //删除订单数据
    function delOrdersByParam(delJson) {
        $.ajax({
            type:"post",
            url:"orders/updByPramasKey",
            data:delJson,
            success:function (data) {
                if (data === 'success'){
                    layer.msg("删除成功。。",{icon:1,time:2000,anim:4});
                    flush(currentPage);
                }else {
                    layer.msg("删除失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }
    //批量删除订单
    function batchDelOrders(ids) {
        $.ajax({
            type:"post",
            url:"orders/updateBatchParamas",
            data:{"ids":ids,"flag":"0"},
            success:function (data) {
                if (data === 'success'){
                    layer.msg("删除成功。。",{icon:1,time:2000,anim:4});
                    flush(currentPage);
                }else {
                    layer.msg("删除失败！！",{icon:2,time:2000,anim:3});
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