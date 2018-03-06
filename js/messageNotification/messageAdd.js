$(function(){
    setting('trumbowyg');
    layui.use('layer', function(){});
    laydate("date1");
    /* 点击取消 */
    $('#cancel_id').on('click',function () {
       window.history.go(-1);
    });
    function pubLish() {
        ajaxPost('creditliquor/messageNotify',{
            pageNo:pageNo?pageNo:1,
            pageSize:10,
            starttime:$('#date1').val(),
            endtime:$('#date2').val()
        },function (result) {
            console.log(result)
            var data = result.data;
            if(data.result==0) return;
            var html= template('template_id',data);
            $('#content-ID').html(html);
        });
    }
});