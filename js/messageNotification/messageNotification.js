$(function(){
    layui.use('layer', function(){});
    laydate("date1");
    laydate("date2");
    /* 点击查询 */
    $('.btn-sapn-query').on('click',function () {
        queryList();
    });
    // var data = {
    //     data:[
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         },
    //         {
    //             TITLE:'信用动态数据上传信息有误',
    //             MODULENAME:'信用动态',
    //             CREATE_TIME:'2017-08-09\n'
    //         }
    //     ]
    // };
    // var html= template('template_id',data);
    // $('#content-ID').html(html);
    queryList();
    function queryList(pageNo) {
        var user = getUserInfo();
        var param = {
            pageNo:pageNo?pageNo:1,
            pageSize:10,
            department:user.department
        };
        if($('#date1').val()){
            param .begintime = $('#date1').val();
        }
        if($('#date2').val()){
            param .endtime = $('#date2').val();
        }
        ajaxPost('creditliquor/messageNotify',param,function (result) {
            var data = result;
            if(data.result==0) return;
            var html= template('template_id',result);
            $('#content-ID').html(html);
            pagination('.pager',result.count,function (pageNum) {
                queryList(pageNum);
            });
        });
    }
});