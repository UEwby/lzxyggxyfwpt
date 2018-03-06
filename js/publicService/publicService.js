/**
 * Created by wangbinyan on 2017/12/28.
 */
$(function () {
    layui.use('layer', function(){});
    var user = getUserInfo();
    //console.log(user);
    if(user.quanxian == '0'){
        $(".wrap-part1").click(function () {
            window.location.href = '../../html/serviceChildrenSystem/serviceChildrenSystem.html';
        })
        $(".wrap-part2").click(function () {
            window.location.href="../creditSearch/creditSearch.html";
        })
        $(".wrap-part3").click(function () {
            window.location.href="../magorServer/index.html";
        })

        $(".wrap-part4").click(function () {
            layer.msg("<span style='color: #333;font-size: 16px;'>没有权限</span>",{
                icon: 2,
                time: 2000
            })
        })
    }else if(user.quanxian == '1'){
        $(".wrap-part1").click(function () {
            window.location.href = '../../html/serviceChildrenSystem/serviceChildrenSystem.html';
        })
        $(".wrap-part2").click(function () {
            window.location.href="../creditSearch/creditSearch.html";
        })
        $(".wrap-part3").click(function () {
            window.location.href="../magorServer/index.html";
        })
        tiaozhuan()
    }else if(user.quanxian == '2'){
        $(".wrap-part1").click(function () {
            layer.msg("<span style='color: #333;font-size: 16px;'>没有权限</span>",{
                icon: 2,
                time: 2000
            })
        })
        $(".wrap-part2").click(function () {
            layer.msg("<span style='color: #333;font-size: 16px;'>没有权限</span>",{
                icon: 2,
                time: 2000
            })
        })
        $(".wrap-part3").click(function () {
            layer.msg("<span style='color: #333;font-size: 16px;'>没有权限</span>",{
                icon: 0,
                time: 2000
            })
        })
        tiaozhuan()
    }

    /**
     * 上报系统有权限跳转
     */
    function tiaozhuan(){
        //form表单数据初始化
        $("#username").val(user.username)
        $("#password").val(user.password)
        $("#part4").click(function(){
            $("#loginForm").submit()
        })
    }
})
