$(document).ready(function(){
    queryDetial();
    function queryDetial(){
       ajaxPost('creditliquor/authenticationdetail',{
           id:GetUrlParam().id
       },function (res) {
           if(res.result==1){
               var html = template('template_id', res.data);
               $('#detial-content').html(html);
               $('#descId').html(res.data.COMPANY_DESCRIBE);
               //COMPANY_BRAND
               if(!isNull(res.data.COMPANY_BRAND)){
                   var url = res.data.COMPANY_BRAND;
                   var html = '<img alt="'+res.data.COMPANY_BRAND+'" style="width: auto;height: auto;" target="_blank" src="'+ url +'"/>'
                   $("#companyBrand").html(html)
               }
           }
       })
    }
});