layui.use('layer', function(){});
var fileUrl = '';
var editor;
KindEditor.ready(function(K) {
    var options = {
        cssPath : '/css/index.css',
        filterMode : true,
        resizeType : 1,
        allowPreviewEmoticons : false,
        allowImageUpload : false,
        items : [
            'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
            'removeformat', '|', 'justifyleft', 'justifycenter', 'justifyright', 'insertorderedlist',
            'insertunorderedlist', '|'/*, 'emoticons'*/, 'image', 'link']
    };
    editor = K.create('textarea[name="content"]', options);

});

//文件上传
$("#fileUpload").ajaxForm(function(data){
    data = JSON.parse(data)
    if(data.code == '1'){
        fileUrl = data.results.newName;
        layer.msg("图片上传成功", {
            icon: 1,
            time: 2000
        });
    }
    return false;
});
//自动上传图片验证
$("#fileUpload .file-select").on('change',function(event){
    if($(this).val() != ''){
        if (!isImage($(this).val())) {
            layer.msg("请选择图片文件", {
                icon: 2,
                time: 2000
            });
        }else{
            $("#fileUpload").submit()
        }
    }
});
$('#companyChange .select').on('click',function () {
    var dom = $('.companyList .companySelect');
    // layui.use('layer', function(){
        layer.open({
            type: 1,
            title:false,
            area: ['800px', '660px'],
            shadeClose: true,
            content: dom
        });
    // });
    setTimeout(function () {
        /* 延迟执行点击查询 */
        $('.layui-layer-content .btn-sapn-query').on('click',function () {
            queryCompanyList();
        });
    },1000)
});
queryCompanyList();
function queryCompanyList(pageNum) {
    var companyName = $('#companyName').val();
    var legalPerson = $('#companyPerson').val();
    var param = {
        page:pageNum?pageNum:1,
        rows:10
    };
    if(companyName){
        companyName=companyName.replace(/(^\s*)|(\s*$)/g,"");
        param.companyName = companyName;
    }
    if(legalPerson){
        legalPerson=legalPerson.replace(/(^\s*)|(\s*$)/g,"");
        param.legalPerson = legalPerson;
    }
    ajaxPost('creditliquor/companylist',param,function (res) {
        if(res.result==1){
            var html = template('template_id', res);
            $('#content-ID').html(html);
            pagination('.pager',res.count,function (pageNum) {
                queryCompanyList(pageNum);
            });
        }
    })
}
/* 添加认证接口 */
function addauthentication(){
    //var code = $('#companyChange select').val();//统一社会信用代码注册号
    editor.sync();
    var companyName = $('#companyChange input').val();
    var companyDesc = editor.html();
    if(!companyName){
        layer.msg('企业信息必填', {
            icon: 2,
            time: 2000
        });
        return;
    }else if(!companyDesc){
        layer.msg('企业介绍必填', {
            icon: 2,
            time: 2000
        });
        return;
    }
    var user = getUserInfo();
    ajaxPost('/creditliquor/addauthentication', {
       department: user.department,
       updater: user.username,
       companyName:companyName,
       companyDescribe:companyDesc,
       companyBrand: downloadIp2 + 'file/download?fileName='+fileUrl
    },function(res){
        if(res.result == 1){
            layer.msg(res.msg, {
                icon: 1,
                time: 2000
            }, function(){
                window.location.href = "../../html/creditCertification/creditCertification.html?idxTab=3"
            });
        }
    })
}
$("#submit").click(function(){
    addauthentication();
});
$("#cancel").click(function(){
    window.history.go(-1);
})
function selectCompany(companyName) {
    $('#companyChange input').val(companyName);
    layer.closeAll();
}
$(".fr").on("click",function(){
    queryCompanyList(1);
})