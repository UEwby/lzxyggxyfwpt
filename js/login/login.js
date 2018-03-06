$(document).ready(function(){
    $("#userName").focus();
    /* 点击登录按钮 */
    $('.wrap-login').on('click',function () {
        login();
    });
    $('input').on('keyup',function (event) {
       if(event.keyCode===13){
          login();
       }
    });
    function login() {
        var userName = $($('.wrap-main input').get(0)).val().trim();
        var passWord = $($('.wrap-main input').get(1)).val().trim();
        if(!userName){
            $('.error').html('用户名不能为空!');
            return;
        }else if(!passWord){
            $('.error').html('密码不能为空!');
            return;
        }
        $('.wrap-login').val('登录中...');
        ajaxPost('user/login',{
            username:userName,
            password:passWord
        },function (res) {
            if(res.result==1){
                saveUserInfo({
                    username:res.data.USER_NAME,
                    department:res.data.GOV_ID,
                    quanxian:res.data.qunxian ? res.data.qunxian:0,
                    password:passWord
                });
                window.location.href = '../publicService/publicService.html';
            }else if (res.result==2){
                $('.wrap-login').val('登录');
                $('.error').html('此帐号已被停用!');
            }else{
                $('.wrap-login').val('登录');
                $('.error').html('用户名或密码错误!');
            }
        },function (error) {
            $('.wrap-login').val('登录');
            $('.error').html('登录失败!');
        })
    }
});