layui.use(['jquery','layer','form','upload'],function () {
    //将模块初始化
    var $ = layui.jquery,
        layer = layui.layer,
        form = layui.form,
        upload = layui.upload;

    var roomNumIf = false;
    //初始化加载全部房间方法
    loadRoomsAll();
    loadAllRoomType();
    //监听添加按钮
    $("#saveRoomsUI").click(function () {
        //弹框之前清空表单
        $("form :input").val("");
        $("#roomPicId").val("http://q4e0bnbzv.bkt.clouddn.com/headIf.jpg");
        $("#demo1").attr("src","http://q4e0bnbzv.bkt.clouddn.com/fm2.jpg");
        $("#roomNum").removeAttr("disabled");
       //点击弹出添加表单框
        layer.open({
            type: 1
            ,title:'客房信息添加'
            , area:['450px','500px'] //宽高度
            ,shade:0.5
            ,anim:3
            ,offset: '100px'
            ,content: $("#saveRoomsDiv")//弹框内容
        });
    });
    //普通图片上传
    var uploadInst = upload.render({
        elem:'#test1'
        ,url:"rooms/uploadRoomPic"
        //,data:{"path":"F:\\ideademo\\static-img\\img"}
        ,field:'myFile'  //设定文件域的字段名
        ,before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#demo1').attr('src', result); //图片链接（base64）
            });
        }
        //上传操作的回调函数
        ,done: function(res){
            //如果上传成功
            if(res.code == 0){
                //将上传的文件名,替换到隐藏域中 一遍添加到数据库中
                $("#roomPicId").val(res.newFileName);
                return layer.msg('上传成功!');
            }else {
                //上传失败
                return layer.msg('上传失败!');
            }
        }
        ,error: function(){
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function(){
                uploadInst.upload();
            });
        }
    });
    //绑定房间编号栏失去焦点事件,验证房间号码的唯一性
    $("#roomNum").blur(function () {
       var checkRoomNum = {}
       checkRoomNum["roomNum"] = $(this).val();
       checkRoomNUmByP(checkRoomNum);
    });
    //监听列表事件
    $("ul").on('click','button',function () {
       var value = $(this).val();
       var roomid = $(this).attr("roomid");
       console.log(value,roomid);
       if (value=="del"){
            layer.confirm("真的删除客房信息吗?",function (index) {
               var delRoomsJson = {};
               delRoomsJson["id"] = roomid;
               delRoomsJson["flag"] = 0;
               delRoomsByParam(delRoomsJson,value);
            })
       }else if (value=="upd"){ //修改
            //获取表单的值
            var arrUpds = $(this).attr("roomsStr").split(",");
            //console.log(arrUpds);
            //对表单进行回显
           //给表单赋值
           $("#demo1").attr("src","http://q4e0bnbzv.bkt.clouddn.com/"+arrUpds[2]);
           form.val("updRoomsForm", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
               "roomNum": arrUpds[1] // "name": "value"
               ,"roomTypeId": arrUpds[3]
               ,"roomPic": arrUpds[2]
           });
           //给表单赋值
           $("#demo1").attr("src","http://q4e0bnbzv.bkt.clouddn.com/"+arrUpds[2]);
           //设置房间号不可修改
           $("#roomNum").attr("disabled","disabled");
            //弹框
           layer.open({
               type: 1
               ,title:'客房信息添加'
               , area:['450px','500px'] //宽高度
               ,shade:0.5
               ,anim:3
               ,offset: '100px'
               ,content: $("#saveRoomsDiv")//弹框内容
           });
           //监听表单提交事件
           form.on('submit(demo3)', function(upd){
               var updRoomsJson = {};
               updRoomsJson = upd.field;
               updRoomsJson["id"] = arrUpds[0];
               //console.log(updRoomsJson);
               updRooms(updRoomsJson);
               layer.closeAll();
               return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
           });
       }else {
           layer.confirm("确定上架房间吗",function (index) {
               var updRoomsStatus = {};
               updRoomsStatus["id"] = roomid;
               updRoomsStatus["roomStatus"] = "0";
               delRoomsByParam(updRoomsStatus,value)
           });
       }
    });
    //监听表单提交事件
    form.on('submit(demo3)', function(add){
        var addRoomsJson = {};
        addRoomsJson = add.field;
        addRoomsJson["roomStatus"] = "0";
        addRoomsJson["flag"] = 1;
        //console.log(addRoomsJson);
        addRooms(addRoomsJson);
        layer.closeAll();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });
    //加载所有客房信息
    function loadRoomsAll(){
        $.ajax({
            type:"post",
            url:"rooms/loadAllT",
            dataType:"JSON",
            success:function (data) {
                var roomStatus0 = '';
                var roomStatus1 = '';
                var roomStatus2 = '';
                var arrUl = $("ul");
                $.each(data,function (i,item) {
                    if(item.roomStatus=='0'){
                        var roomsStr = item.id+","+item.roomNum+","+item.roomPic+","+item.roomType.id+","+item.roomType.roomTypeName;
                        roomStatus0 += '<li style="background-color: #009688;">';
                        roomStatus0 += '<img class="layui-anim" id="demo1" src="http://q4e0bnbzv.bkt.clouddn.com/'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus0 += '<div class="code">';
                        roomStatus0 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus0 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus0 += '<button type="button" value="upd" roomsStr="'+roomsStr+'" class="layui-btn layui-btn-warm layui-btn-xs">修改</button>';
                        roomStatus0 += '</div>';
                        roomStatus0 += '</li>';
                    }else if(item.roomStatus=='1'){
                        roomStatus1 += '<li style="background-color: red;">';
                        roomStatus1 += '<img class="layui-anim" id="demo1" src="http://q4e0bnbzv.bkt.clouddn.com/'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus1 += '<div class="code">';
                        roomStatus1 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus1 += '</div>';
                        roomStatus1 += '</li>';
                    }else {
                        roomStatus2 += '<li style="background-color: blueviolet;">';
                        roomStatus2 += '<img class="layui-anim" id="demo1" src="http://q4e0bnbzv.bkt.clouddn.com/'+item.roomPic+'" width="135px" height="135px"/>';
                        roomStatus2 += '<div class="code">';
                        roomStatus2 += '<span style="display: block;color: #0C0C0C;">'+item.roomNum+'-'+item.roomType.roomTypeName+'-'+item.roomType.roomPrice+'元/天</span>';
                        roomStatus2 += '<button type="button" value="del" roomid="'+item.id+'" class="layui-btn layui-btn-danger layui-btn-xs">删除</button>';
                        roomStatus2 += '<button type="button" value="upd1" roomid="'+item.id+'" class="layui-btn layui-btn-xs layui-btn-normal">空闲</button>';
                        roomStatus2 += '</div>';
                        roomStatus2 += '</li>';
                    }
                });
                $(arrUl[0]).html(roomStatus0);
                $(arrUl[1]).html(roomStatus1);
                $(arrUl[2]).html(roomStatus2);
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }

    //加载所有客房类型信息
    function loadAllRoomType() {
        $.ajax({
            type: "post",
            url: "roomType/loadAllT",
            dataType:"JSON",
            success: function (data) {
                var roomTypeStr = '<option value="">-请选择房间类型-</option>'
                $.each(data,function (i,roomType) {
                    roomTypeStr+='<option value="'+roomType.id+'">'+roomType.roomTypeName+'</option>'
                })
                $("#selRoomType").html(roomTypeStr);
                form.render("select")
            },
            error: function () {
                layer.msg("服务器异常！！", {icon: 3, time: 2000, anim: 3});
            }
        })
    }
    //删除客房信息
    function delRoomsByParam(delRoomsJson,value) {
        $.ajax({
            type:"post",
            url:"rooms/updByPramasKey",
            data:delRoomsJson,
            success:function (data) {
                if (data==="success"){
                    if (value=="del"){
                        layer.msg("删除成功。。",{icon:1,time:2000,anim:4});
                        //添加成功 重新加载房间信息
                        loadRoomsAll();
                    } else {
                        layer.msg("客房上架成功。。",{icon:1,time:2000,anim:4});
                        //添加成功 重新加载房间信息
                        loadRoomsAll();
                    }
                } else {
                    if (value=="del"){
                        layer.msg("删除失败。。",{icon:2,time:2000,anim:3});
                    } else {
                        layer.msg("客房上架失败。。",{icon:2,time:2000,anim:3});
                    }
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }

    //验证房间编号唯一性
    function checkRoomNUmByP(checkRoomNum) {
        $.ajax({
            type:"post",
            url:"rooms/getCountByParams",
            data:checkRoomNum,
            success:function (data) {
                if (data===1){
                    layer.tips('房间号已被使用！', '#roomNum', {tips: [2,'#fc1505'], time:3000});  //吸附框
                    roomNumIf = false;
                } else {
                    layer.tips('房间号可用。。', '#roomNum', {tips: [2,'green'], time:3000});  //吸附框
                    roomNumIf = true;
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }

    //添加客房信息
    function addRooms(addRoomsJson) {
        $.ajax({
            type:"post",
            url:"rooms/insertParams",
            data:addRoomsJson,
            success:function (data) {
               if (data==="success"){
                   layer.msg("添加成功。。",{icon:1,time:2000,anim:4});
                   //添加成功 重新加载房间信息
                   loadRoomsAll();
               } else {
                   layer.msg("添加失败。。",{icon:2,time:2000,anim:3});
               }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }

    //修改客房信息
    function updRooms(updRoomsJson) {
        $.ajax({
            type:"post",
            url:"rooms/updByPramasKey",
            data:updRoomsJson,
            success:function (data) {
                if (data==="success"){
                    layer.msg("修改成功。。",{icon:1,time:2000,anim:4});
                    //添加成功 重新加载房间信息
                    loadRoomsAll();
                } else {
                    layer.msg("修改失败。。",{icon:2,time:2000,anim:3});
                }
            },
            error:function () {
                layer.msg("服务器异常！！",{icon:3,time:2000,anim:3});
            }
        })
    }
});