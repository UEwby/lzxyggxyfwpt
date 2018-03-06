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

        //初始化参数
        dynamicdetail(GetUrlParam().id)
    });

    //文件上传
    $("#fileUpload").ajaxForm(function(data){
        data = JSON.parse(data);
        if(data.code == '1'){
            fileUrl = data.results.newName;
            $("#view").html("");
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
     * 编辑信用动态接口
     * 接口地址  /creditliquor/updatedynamic
     * */
    function updateDynamic(){
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
        ajaxPost('/creditliquor/updatedynamic', {
            title: $("#title").val(),
            publicDate: $("#publicDate").val(),
            source: $("#source").val(),
            department: getUserInfo().department,
            content: editor.html(),
            columnId: 'A04A01',
            author: getUserInfo().username,
            summary: $("#summary").val(),
            attachmentHref: fileUrl,
            id: GetUrlParam().id

        },function(result){
            if(result.result == '1'){
                window.location.href = "../../html/creditDynamics/creditDynamics.html?idxTab=0";
            }
        })
    }

    /**
     * 详情查询
     * @param id
     */
    function dynamicdetail(id){
        ajaxPost('/creditliquor/dynamicdetail',{
            id:id
        },function(res){
            if(res.result == '1'){
                var data = res.data;
                $("#title").val(data.title);
                $("#publicDate").val(data.PUBLISH_DATE);
                $("#source").val(data.source);
                $("#summary").val(data.summary);
                if(!isNull(data.attachmentHref)){
                    fileUrl = data.attachmentHref;
                    var url = downloadIp2 + 'file/download?fileName='+ data.attachmentHref;
                    $("#view").attr('href', url);
                    $("#view").html(data.attachmentHref);
                }
                editor.html(data.content);
            }
        });
    }

    $("#submit").click(function(){
        updateDynamic()
    })
    $("#cancel").click(function(){
        window.location.href = "../../html/creditDynamics/creditDynamics.html?idxTab=0"
    })
})