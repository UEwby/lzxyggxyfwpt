$(function(){
    layui.use('layer', function(){});
    laydate("date1");
    laydate("date2");
    queryList();
    function queryList(pageNo){
        // var resultData ={
        //     "result": "1",
        //     "msg": "成功",
        //     "data": [
        //         {
        //             "GOV_CNAMEALL": "市科学技术和知识产权局",
        //             "DISPOSE_STATE": 0,
        //             "REPORT_TITLE": "举报是科学技术和知识产权局",
        //             "ID": "5F98D244908C3E74E053D404A8C0372F",
        //             "REPORT_TIME": 1512480552000
        //         }
        //     ],
        //     "count": 7
        // };
        // var html= template('template_id',resultData);
        // $('#repair-list').html(html);
        // pager(obj, 1, [2,10,20,50,100], queryList, $('.pager'));



        var department=getUserInfo().department;
        var reportTitle=$(".fl input").val();
        var startTime=$("#date1").val();
        var endTime=$("#date2").val();
        if(startTime){
            startTime=startTime.replace(/\-/g, "/");
            startTime=formatDateTimeFull(new Date(startTime));
        }
        if(endTime){
            endTime=endTime.replace(/\-/g, "/");
            endTime=formatDateTimeFull(new Date(endTime));
        }

        // formatDateTimeFull
        ajaxPost('/creditliquor/reportlist',{
           page: pageNo?pageNo:1,
           rows: 10,
           department:department,
           reportTitle:reportTitle,
           startTime:startTime,
            endTime:endTime
        },function(res){
            if(res.result!=1)return ;
            var html= template('template_id',res);
            $('#repair-list').html(html);
            pagination('.pager',res.count,function (pageNum) {
                queryList(pageNum);
            });
        });
    }

    //删除
    $(".btn-sapn-query").click(function () {
        queryList();
    });

});