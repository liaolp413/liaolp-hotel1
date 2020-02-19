layui.use(['jquery','table','form','layer','laydate'],function () {
    var $ = layui.jquery,
        table = layui.table,
        form = layui.form,
        layer = layui.layer;
    laydate = layui.laydate;
    //日期时间选择器
    laydate.render({
        elem: '#test3'
        ,type: 'datetime'
        ,format:'yyyy/MM/dd HH:mm:ss'
        ,range: true //或 range: '~' 来自定义分割字符
    });
    var currentPage = 1;
    var selRoomSaleJson = {};
    loadRoomSaleByParam(selRoomSaleJson);

    function loadRoomSaleByParam(selRoomSaleJson){
        table.render({
            elem: '#demo' //指定容器的id
            , height: 452 //容器的高度
            , width: 1680  // 容器的宽度
            , where: selRoomSaleJson
            , url: 'roomSale/loadTByPramas' //数据接口
            , page: true //开启分页
            , limit: 5
            , even: true
            , cols: [[ //表头
                {type: 'checkbox', align: 'center'}
                , {field: 'id', title: 'ID', width: 100, sort: true, align: 'center'}
                , {field: 'roomNum', title: '房间号', width: 120, align: 'center'}
                , {field: 'customerName', title: '客人姓名', width: 120, align: 'center'}
                , {field: 'startDate', title: '入住时间', width: 180, align: 'center'}
                , {field: 'endDate', title: '退房时间', width: 180, align: 'center'}
                , {field: 'days', title: '天数', width: 100, align: 'center'}
                , {field: 'rentPrice', title: '住宿金额', width: 100, align: 'center'}
                , {field: 'otherPrice', title: '其他消费', width: 100, align: 'center'}
                , {field: 'salePrice', title: '支付金额', width: 120, align: 'center'}
                , {field: 'discountPrice', title: '优惠金额', width: 120, align: 'center'}
                , {fixed: 'right', title: '操作', width: 120, align: 'center', toolbar: '#barDemo'}
            ]]
            ,done:function (res, curr, count) {  //表格执行加载时的函数回调
                currentPage = curr;
            }
        });
    }


    //监听表单查询
    //监听表单提交事件
    form.on('submit(demo1)', function(sel){
        selRoomSaleJson = {};
        selRoomSaleJson["roomNum"] = sel.field.roomNum;
        if (sel.field.queryTimes!=""){
            var arrTimes = sel.field.queryTimes.split("-");
            selRoomSaleJson["startDate"] = arrTimes[0];
            selRoomSaleJson["endDate"]  = arrTimes[1];
        }
        loadRoomSaleByParam(selRoomSaleJson);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
});