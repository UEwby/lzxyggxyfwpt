$(function(){
    layui.use('layer', function(){});
    queryList();
    var params={};
    params.department=getUserInfo().department;
    function queryList(){
        var id=location.href.split("id=")[1];
        // var res ={
        //     "result": "1",
        //     "msg": "成功",
        //     "data": {
        //         "GOV_CNAMEALL": "市科学技术和知识产权局",
        //         "DISPOSE_STATE": 0,
        //         "BE_REPORTED_ADDRESS": "北京市海淀区学院路甲5号768创意园B座12号",
        //         "INFORMER_PHONE": "13712345678",
        //         "INFORMER_ADDRESS": "北京市海淀区学院路甲5号768创意园B座12号",
        //         "REPORT_TITLE": "举报是科学技术和知识产权局",
        //         "DEPARTMENT": "a848e53d-0b98-40dc-a3df-1ce2af791105",
        //         "BE_REPORTED_PHONE": "13812345678",
        //         "REPORT_CONTENT": "举报是科",
        //         "BE_REPORTED_NAME": "被举报",
        //         "INFORMER": "失信举报",
        //         "ID": "5F98D244908C3E74E053D404A8C0372F",
        //         "REPORT_TIME": 1512480552000
        //     },
        //     "count": 0
        // };
        // var html= template('template_id',res);
        // $('.wrap-main-spe').html(html);
        ajaxPost('/creditliquor/reportdetail',{
          id:id,
        },function(res){
        if(res.result!=1)return ;
            params.id=id;
            params.acceptor = getUserInfo().username;//res.data.INFORMER;
            var html= template('template_id',res);
            $('.wrap-main-spe').html(html);

            $(".submit").on("click",function(){
                var disposeResult=$("#result").val();
                params.disposeResult=disposeResult;
                if(params.disposeResult==0){
                    layer.msg('请填写修改结果再提交',{
                        icon:2,
                        time: 2000
                    })
                    return ;
                }
                ajaxPost('/creditliquor/updatereport',params,function(res){
                    if(res.result!=1)return ;
                    go();
                });
            })
            $(".but-reset").on("click",function(){
              go();
            })
        });
    }



})