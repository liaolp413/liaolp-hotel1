layui.use(['jquery','table','layer','form'],function () {
    //实例化
    var /*$ = layui.jquery,*/ //当两个以上ui框架一起使用时,不用实例化jquery
        table = layui.table,
        layer = layui.layer,
        form = layui.form;


    table.render({
        elem: '#demo' //指定容器的id
        , height: 452 //容器的高度
        , width: 1680  // 容器的宽度
        , url: 'roles/loadTByPramas' //数据接口
        , page: true //开启分页
        , limit: 3
        , even: true
        , cols: [[ //表头
            {field: 'id', title: 'ID', width: 60, sort: true, align: 'center'}
            , {field: 'roleName', title: '角色名称', width: 120, align: 'center'}
            , {field: 'createDate', title: '创建时间', width: 180, align: 'center'}
            , {field: 'firstAuth', title: '一级权限', width: 480, align: 'center'}
            , {field: 'status', title: '是否启用', width: 160, align: 'center', templet: '#isStatusTpl'}
            , {field: 'flag', title: '角色类型', width:120, align: 'center', templet: '#isFlagTpl'}
            , {fixed: 'right', title: '操作', width: 180, align: 'center', toolbar: '#barDemo'}
        ]]
    });

    //监听工具条
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        if(layEvent === 'detail'){ //查看
            //layer.msg("点击了查看按钮!")
            //加载所有权限数据 参数传入访问服务器端的地址 和当前行的id
            loadAuth("auth/loadAuthByRoleId?roleId="+data.id);
            //点击查看 弹出权限树形图
            layer.open({
                type: 1
                ,title:data.roleName+'权限树形图'
                , area:['350px','400px'] //宽高度
                ,shade:0.5
                ,anim:3
                ,offset: '100px'
                ,content: $("#ztreeDiv")//弹框内容
                ,cancel: function(){
                    //右上角关闭回调 关闭弹框之后隐藏弹出的div内容
                    $("#ztreeDiv").hide()
                }
            });
        }
    });

    //加载树形数据方法
    function loadAuth(dataUrl) {
        var setting = {
            data : {   //设置节点数据
                simpleData : {
                    enable : true,   //使用格式化后的数据
                    idKey : "id",       // 结点的id,对应到Json中的id
                    pIdKey : "parent",     // 结点的pId(指向节点id),父节点id,对应到Json中的pid
                    rootPId : 0         // 根节点上的节点，设置为0节点（实际此节点是不存在）
                },
                key : {
                    name : "authorityName" // 结点显示的name属性，节点的名字，对应到Json中的rName
                }
            },
            check: {
                enable: true   //是否使用节点复选框，开启，默认为false(不使用)
            },
            async : {
                enable : true,  //使用异步数据：从服务器端获取数据
                url:dataUrl,    //服务器端访问路径
                autoParam:["id", "name=n", "level=lv"],  //能否自动加载
                otherParam:{"otherParam":"zTreeAsyncTest"}  //异步数据的样式设置
            }
        };
        $.fn.zTree.init($("#test1"), setting);  //树形结构的数据初始化
    }
});