$(function(){
    layui.use('layer', function(){});
    laydate("date1")
    laydate("date2")

    queryList();
    function queryList(pageNum){
        ajaxPost('/creditliquor/dynamiclist',{
            page: pageNum?pageNum:1,
            rows: 10,
            department: getUserInfo().department,
            columnId: 'A04A01',
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
                //事件绑定-删除
                $(".del").click(function (event) {
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

    /*
    * 删除信用动态
    * 接口/creditliquor/deletedynamic
    * */
    function deleteDynamic(id){
        ajaxPost('/creditliquor/deletedynamic', {
            id: id,
        },function(result){
            if(result.result == '1'){
                layer.msg(result.msg, {
                    icon: 1,
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
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