$(function(){
    var id=location.href.split("id=")[1];
    queryList();
    function queryList(){
        ajaxPost('/creditliquor/reportdetail',{
         id:id,
        },function(res){
             if(res.result!=1)return ;
             var html= template('template_id',res);
            $('.wrap-main-spe').html(html);
            $(".but-reset").on("click",function(){
               history.go(-1);
            })

        });
    }

})
