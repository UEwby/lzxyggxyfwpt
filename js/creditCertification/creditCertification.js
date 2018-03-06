$(function(){
    queryList();
    function queryList(pageNum){
        var user = getUserInfo();
        ajaxPost('creditliquor/authenticationlist',{
           page: pageNum?pageNum:1,
           rows: 10,
           department:user.department,
           companyName:$('#companyName').val().trim(),
           legalPerson:$('#companyPerson').val().trim()
        },function(res) {
            var html = template('template_id', res);
            $('#content-ID').html(html);
            pagination('.pager',res.count,function (pageNum) {
                queryList(pageNum);
            });
        });
    }
    ////查看
    //$(".see1").click(function () {
    //    window.location.href = "../../html/creditCertification/certificstionDetial.html?idxTab=3";
    //})
    //
    ////新增
    //$(".add1").click(function () {
    //    window.location.href = "../../html/creditCertification/certificstionAdd.html?idxTab=3";
    //})
    $(".btn-sapn-query").click(function () {
        $('#content-ID').html("");
        queryList()
    })

})