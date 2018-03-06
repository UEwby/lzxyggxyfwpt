$(function(){
    layui.use('layer', function(){});
    var fileUrl = '';
    laydate("publicDate");
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
    //自动上传
    $("#fileUpload .file-select").on('change',function(event){
        $("#fileUpload").submit()
    });
    /*
     * 添加联合奖惩接口
     * 接口地址 /creditliquor/adddynamic
     * */
    function adddDynamic(e){
        // 同步数据后可以直接取得textarea的value
        editor.sync();
        if(isNull($("#title").val())){
            layer.msg('标题不能为空', {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
            return false
        }
        if(isNull($("#publicDate").val())){
            layer.msg('时间不能为空', {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
            return false
        }
        if(isNull($("#summary").val())){
            layer.msg('摘要不能为空', {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
            return false
        }
        if(!editor.html()){
            layer.msg('内容不能为空', {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });
            return false
        }
        var params = {
            title: $("#title").val() ,
            publicDate: sendDateFormat($("#publicDate").val()),
            source: $("#source").val(),
            department: getUserInfo().department,
            content: editor.html(),
            columnId: 'A06A01',
            author: getUserInfo().username,
            summary: $("#summary").val(),
            attachmentHref: fileUrl

        };
        //console.log(params)
        ajaxPost('/creditliquor/adddynamic', params,function(result){
            if(result.result == '1'){
                window.location.href = "../../html/punishment/punishment.html?idxTab=1"
                /*layer.msg(result.msg, {
                    icon: 1,
                    time: 200000 //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    window.location.href = "../../html/punishment/punishment.html?idxTab=1"
                });*/
            }
        })
    }
    $("#submit").click(function(){
        adddDynamic()
    })
    $("#cancel").click(function(){
        window.location.href = "../../html/punishment/punishment.html?idxTab=1"
    })
})