layui.use(['jquery','layer','form','table'],function () {
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form,
        table = layui.table;
    var updObj = null;
    //加载数据
    table.render({
        elem: '#demo' //指定容器的id
        , height: 452 //容器的高度
        , width: 1680  // 容器的宽度
        , url: 'user/loadTByPramas' //数据接口
        , page: true //开启分页
        , limit: 3
        , even: true
        , cols: [[ //表头
            {field: 'id', title: 'ID', width: 60, sort: true, align: 'center'}
            , {field: 'username', title: '用户名称', width: 120, align: 'center'}
            , {field: 'pwd', title: '密码', width: 290, align: 'center',event:"setPwd"}
            , {field: 'createDate', title: '创建时间', width: 180, align: 'center'}
            , {field: 'authName', title: '拥有权限', width: 480, align: 'center'}
            , {field: 'useStatus', title: '是否启用', width: 160, align: 'center', templet: '#isStatusTpl'}
            , {field: 'isAdmin', title: '角色类型', width:120, align: 'center'}
            , {fixed: 'right', title: '操作', width: 180, align: 'center', toolbar: '#barDemo'}
        ]]
    });
    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
        updObj = obj;
        if(layEvent === 'setPwd'){ //查看
            //例子2
            layer.prompt({
                formType: 2,
                value: data.pwd,
                title: '修改'+data.username+'的密码',
                //area: ['800px', '350px'] //自定义文本域宽高
            }, function(value, index, elem){
                updPwd(data.id,value);
                layer.close(index);
            });
        } else if(layEvent === 'detail'){ //查看
            layer.tab({
                area: ['600px', '300px'],
                tab: [{
                    title: 'TAB1',
                    content: '内容1'
                }, {
                    title: 'TAB2',
                    content: '内容2'
                }, {
                    title: 'TAB3',
                    content: '内容3'
                }]
            });
        }
    });

    //修改密码
    function updPwd(id,pwd) {
        $.ajax({
            type:"post",
            url:"user/updatePwdByParam",
            data:{"id":id,"pwd":pwd},
            success:function (data) {
                if (data!=null){
                    layer.msg("修改成功。。",{icon:1,time:2000,anim:4});
                    //同步更新缓存对应的值
                    updObj.update({
                        pwd:data
                    })
                } else {
                    layer.msg("修改失败！！",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }
});