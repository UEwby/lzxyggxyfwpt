$(function(){
    dynamicdetail();
    function dynamicdetail(){

        ajaxPost('/creditliquor/dynamicdetail',{
            id:location.href.split("id=")[1]
        },function(res){
            var html = template('template_id',res);
            $('#content-ID').html(html);
            $('#content').html(res.data.content);
            if(!isNull(res.data.attachmentHref)){
                var url = downloadIp2 + 'file/download?fileName='+res.data.attachmentHref;
                var html = '<a target="_blank" href="'+ url +'">'+res.data.attachmentHref+'</a>';
                $("#attachmentHref").html(html);
            }
        });
    }
})