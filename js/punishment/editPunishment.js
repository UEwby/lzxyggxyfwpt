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

        /*// 取得HTML内容
         html = editor.html();
         // 同步数据后可以直接取得textarea的value
         editor.sync();
         html = document.getElementById('editor_id').value; // 原生API
         html = K('#editor_id').val(); // KindEditor Node API
         html = $('#editor_id').val(); // jQuery

         // 设置HTML内容
         editor.html('HTML内容');*/

        //初始化参数
        dynamicdetail(GetUrlParam().id)
    });

    //文件上传
    $("#fileUpload").ajaxForm(function(data){
        data = JSON.parse(data)
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
     * 修改联合惩戒接口
     * 接口地址  /creditliquor/updatedynamic
     * */
    function updateDynamic(){
        // 同步数据后可以直接取得textarea的value
        editor.sync();
        /*console.log(editor.html())*/
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
            title: $("#title").val() ,
            publicDate: sendDateFormat($("#publicDate").val()),
            source: $("#source").val(),
            department: getUserInfo().department,
            content: editor.html(),
            columnId: 'A06A01',
            author: getUserInfo().username,
            summary: $("#summary").val(),
            attachmentHref: fileUrl,
            id: GetUrlParam().id

        },function(result){
            if(result.result == '1'){
                window.location.href = "../../html/punishment/punishment.html?idxTab=1"
                /*layer.msg(result.msg, {
                    icon: 1,
                    time: 2000, //2秒关闭（如果不配置，默认是3秒）
                }, function(){
                    window.location.href = "../../html/punishment/punishment.html?idxTab=1"
                });*/
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
        },function(err){
            console.log(err)
        });

    }
    $("#submit").click(function(){
        updateDynamic()
    })
    $("#cancel").click(function(){
        window.location.href = "../../html/punishment/punishment.html?idxTab=1"
    })
})