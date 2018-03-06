$(function(){
    layui.use('layer', function(){});
    laydate("date1")
    laydate("date2")

    queryList();
    function queryList(pageNum){
        var data ={
            "result": "1",
            "msg": "成功",
            "data": [
                {
                    id: "9A8A65B0F4444427BA41338094BFA029",
                    sourc: "sdfs",
                    title: "1234677",
                    time:'2017-10-22'
                },
                {
                    id: "AB4999F5D16D41778204557158909C64",
                    source: "sdfs",
                    title: "1234677",
                    time:'2017-10-22'
                },
                {
                    "id": "AB4999F5D16D41778204557158909C64",
                    "source": "sdfs",
                    "title": "1234677",
                    time:'2017-10-22'
                },
                {
                    "id": "AB4999F5D16D41778204557158909C64",
                    "source": "sdfs",
                    "title": "1234677",
                    time:'2017-10-22'
                },
                {
                    "id": "AB4999F5D16D41778204557158909C64",
                    "source": "sdfs",
                    "title": "1234677",
                    time:'2017-10-22'
                }
            ],
            "count": 5
        };
        ajaxPost('/creditliquor/dynamiclist',{
            page: pageNum?pageNum:1,
            rows: 10,
            department: getUserInfo().department,
            columnId: 'A06A01',
            title: $("#title").val(),
            startTime: sendDateFormat($("#date1").val()),
            endTime:  sendDateFormat($("#date2").val())
        },function(res){
            //console.log(res)
            if(res.count != 0){
                var html = template('template_id',res);
                $('#content-ID').html(html);
                if(res.data.length > 0){
                    pagination('.pager',res.count,function (pageNum) {
                        queryList(pageNum);
                    },10);
                }

                //删除时间绑定
                $(".del").click(function () {
                    var id = $(this).attr('sid');
                    layer.confirm('<p class="del-con"><img src="../../img/delete_wraing_03.png">确定删除该行数据？</p>',{
                        btnAlign: 'c',
                        closeBtn: 0,
                        shade: 0.6,
                        shadeClose: true
                    }, function(index){
                        layer.close(index);
                        deleteDynamic(id)
                    });
                })

            }else{
                $('#content-ID').html('<td colspan="4" class="noneData">暂无数据</td>');
            }
        });
    }

    /**
     * 删除联合奖惩
     * @param id
     */
    function deleteDynamic(id){
        ajaxPost('/creditliquor/deletedynamic', {
            id:id,
        },function(result){
            if(result.result == '1'){
                layer.msg(result.msg, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                },function(){
                    queryList()
                });
            }
        })
    }

    $(".btn-sapn-query").click(function () {
        $('#content-ID').html("");
        queryList()
    })

})