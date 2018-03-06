
var URL = 'http://192.168.200.192:8023/';

var downloadIp = 'http://202.106.10.250:6089/';//信用动态-联合惩戒

var downloadIp2 = 'http://202.106.10.250:7588/';//信用异议/信用修复/信用认证

$(".file-upload").attr('action', downloadIp2 + '/file/uploadFile');//初始化文件上传的action路径

/**
 * 扩展JavaScript去空格方法
 * @returns {*}
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};
/*console.log(typeof getMessageTotal())
console.log(getMessageTotal())*/
/***
 * 去空格
 * @returns {string}
 */
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
};
/**
 * 多出字符串长度用...代替
 * @param num 截取长度
 * @returns {string}
 */
String.prototype.strEllipsis=function(num) {
    return this.substring(0,num)+'...';
};


if(getUserInfo()){
    getMessageTotal();
}
/**
 * 获取消息通知总数
 */
function getMessageTotal() {
    ajaxPost('/creditliquor/messageTotal', {
        department: getUserInfo().department
    }, function (res) {
        if (res.result == 1) {
            //saveMessageTotal(res.messageTotal);
            $(".hd-msg-num").html(res.messageTotal)
        }
    }, function (error) {
        //错误信息处理
    })
}
/**
 * 设置Cookie
 * @param key key键值名称
 * @param value key键所对应的值
 * @param seconds 超时时间，毫秒
 */
function setCookie(key, value, seconds) {
    seconds = seconds || 0;  
    var expires = "";
    if (seconds != 0 ) {     
        var date = new Date();
        date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
    }
    document.cookie = key+"="+escape(value)+expires+"; path=/";
}

/**
 * 从cookie获取指定key的值
 * @param key 要获取cookie的指定key名称
 * @returns {string}
 */
function getCookie(key) {
    var nameEQ = key + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return unescape(c.substring(nameEQ.length,c.length));
        }
    }
    return '';
}

/**
 * 清除指定key的Cookie值
 * @param key 指定key名称
 */
function clearCookie(key) {
    setCookie(key, "", -1);
}
var TimeoutCookie = 60 * 30;

/**
 * 存储指定的key和value
 * @param key 存储键
 * @param value 存储值
 */
function setKeyItem(key,value) {
    if (window.sessionStorage){
        sessionStorage.setItem(key,value);
    }else{
        setCookie(key,value,TimeoutCookie)
    }
}
/**
 * 根据key键获取value
 * @param key 键
 */
function getKeyItem(key) {
    if (window.sessionStorage){
        return sessionStorage.getItem(key);
    }else{
        return getCookie(key);
    }
}
/**
 * 清空存储的键值对
 */
function clearKeyItem() {
    if (window.sessionStorage){
        sessionStorage.clear();
    }else{
        clearCookie("KEY_USER_INFO");
    }
}

/**
 * 存储用户登录信息
 * @param user 要存储的用户对象
 */
function saveUserInfo(user){
    if (window.sessionStorage){
        sessionStorage.setItem("KEY_USER_INFO",JSON.stringify(user));
    }else{
        setCookie("KEY_USER_INFO",JSON.stringify(user),TimeoutCookie);
    }
}

/**
 * 获取用户信息
 * @returns {Object} 返回用户对象
 */
function getUserInfo(){
    if (window.sessionStorage){
        var userInfo=JSON.parse(sessionStorage.getItem("KEY_USER_INFO"));
        return userInfo;
    }else {
        return JSON.parse(getCookie("KEY_USER_INFO"));
    }
}

/**
 * 清理用户登录信息
 */
function clearUserInfo(){
    if (window.sessionStorage){
        sessionStorage.clear();
    }else{
        clearCookie("KEY_USER_INFO");
    }
}

/**
 * 获取url中参数，并封装为对象
 * @returns {Object}
 * @constructor
 */
function GetUrlParam(){
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=
                decodeURIComponent(decodeURIComponent(strs[i].split("=")[1]));
        }
    }
    return theRequest;
}

/***
 * ajax的post请求
 * @param url 请求的url
 * @param params 请求参数
 * @param successBack 成功之后的回调函数
 * @param errorBack 失败之后的回调函数
 */
function ajaxPost(url,params,successBack,errorBack) {
    ajax('POST',url,params,successBack,errorBack);
}
/**
 * 附件上传的请求接口
 * @param url
 * @param params
 * @param successBack
 * @param errorBack
 */
function ajaxPostExt(url,params,successBack,errorBack) {
    $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(params),
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true == !(document.all),
        success: function (res) {
            if(successBack) successBack(res);
        },
        error: function (err) {
            if(errorBack) errorBack(err);
        }
    })
}
/***
 * ajax的get请求
 * @param url 请求的url
 * @param params 请求参数
 * @param successBack 成功之后的回调函数
 * @param errorBack 失败之后的回调函数
 */
function ajaxGet(url,params,successBack,errorBack) {
    ajax('GET',url,params,successBack,errorBack);
}
function ajax(type,wUrl,params,callBack,errorFn) {
    $.ajax({
        url: URL + wUrl,
        type: type,
        data: JSON.stringify(params),
        dataType: 'json',
        contentType: "application/json",
        crossDomain: true == !(document.all),
        success: function (res) {
            if(callBack) callBack(res);
        },
        error: function (err) {
            if(errorFn) errorFn(err);
        }
    })
}
var total = 0;
/**
 * 初始化分页插件
 * @param paginationObj css选择器或者dom对象
 * @param total 总页数
 * @param pageFn 点击页面回掉函数
 * @param pageSize 每页条数，默认10条
 */
function pagination(paginationObj,totalPage,pageFn,pageSize) {
    if(total==totalPage){
        return;
    }
    total = totalPage;
    if(typeof paginationObj == 'string'){
        paginationObj = $(paginationObj);
    }
    layui.use('laypage', function(){
        var laypage = layui.laypage;
        laypage.render({
            elem: paginationObj
            ,count: total
            ,limit:pageSize?pageSize:10
            ,jump: function(obj, first){
                //首次不执行
                if(!first){
                    pageFn(obj.curr);
                }
            }
        });
    });
}

/*
* 时间
*
* */
function laydate(dom){
    layui.use('laydate', function () {
        var laydate = layui.laydate;
        //常规用法
        laydate.render({
            elem: '#'+ dom
            // ,value: new Date()
            ,ready: function () {
               /* $("#" + dom).after('<i class="date-close"></i>')*/
            }
        });
    })

}

/*
* 删除弹出层
* */
function layDelete(callback, obj){

    layer.confirm('<p class="del-con"><img src="../../img/delete_wraing_03.png">确定删除该行数据？</p>',{
        btnAlign: 'c',
        closeBtn: 0
    }, function(index){
        layer.close(index);
        callback(obj)
    });
}

/*
 * 在线编辑器配置
 * params
 * */
function setting(dom){
    $("#"+dom).trumbowyg({
        //设置中文
        lang: 'zh_cn',
        // closable: true,
        fixedBtnPane: true,
        //设置颜色插件
        btnsAdd: ['foreColor','backColor'],
        btnsDef: {
            // 设置上传的3种方法，远程上传，本地上传，图片64位加密
            image: {
                dropdown: ['insertImage',/* 'upload',*/'base64'],
                ico: 'insertImage'
            }
        },
        // Redefine the button pane
        btns: ['viewHTML',
            '|', 'formatting',
            '|', 'btnGrp-semantic',
            '|', 'link',
            '|', 'image',
            '|', 'btnGrp-justify',
            '|', 'btnGrp-lists',
            '|', 'horizontalRule']
    });
}
function go()
{
    window.history.go(-1);
}

/**
 * 接口请求时间格式化
 * @param entTime
 * @returns {*}
 */
function sendDateFormat(date){
    if(!date){
        return ''
    }
    date = date.replace(/\-/g, "/");
    date = formatDateTime(new Date(date));
    return date
}
//获取事件
function getEvent() {
    if (window.event) {
        return window.event;
    }
    var func = getEvent.caller;
    while (func != null) {
        var arg0 = func.arguments[0];
        if (arg0) {
            if ((arg0.constructor == Event || arg0.constructor == MouseEvent
                || arg0.constructor == KeyboardEvent)
                || (typeof (arg0) == "object" && arg0.preventDefault
                && arg0.stopPropagation)) {
                return arg0;
            }
        }
        func = func.caller;
    }
    return null;
}
//阻止冒泡
function cancelBubble() {
    var e = getEvent();
    if (window.event) {
        //e.returnValue=false;//阻止自身行为
        e.cancelBubble = true;//阻止冒泡
    } else if (e.preventDefault) {
        //e.preventDefault();//阻止自身行为
        e.stopPropagation();//阻止冒泡
    }
}
$(document).ready(function(){
   $('.menu ul li').on('click',function () {
       var index = $(this).index();
       var url = $(this).attr('surl');
       if(!url) return;
       if(url.indexOf('?')==-1){
           url = url + '?idxTab='+index;
       }else{
           url = url + '&idxTab='+index;
       }
       window.location.href = url;
   });
   var menuIdx = GetUrlParam().idxTab?GetUrlParam().idxTab:0;
   $($('.menu ul li').get(menuIdx)).addClass('active');

   /* 点击退出按钮 */
   $('.hd-quit').on('click',function () {
       clearUserInfo(); //清理用户信息
       window.location.href = '../login/login.html';
   });
});



/*转换为带时分秒的时间格式*/
 function formatDateTimeFull(dateTime) {
    if (dateTime == null || dateTime.length == 0) {
        return "";
    }
    var y = dateTime.getFullYear();
    var m = dateTime.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = dateTime.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = dateTime.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = dateTime.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = dateTime.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}
/*转换为年月日的时间格式*/
 function formatDateTime(dateTime) {
    if (dateTime == null || dateTime.length == 0) {
        return "";
    }
    var y = dateTime.getFullYear();
    var m = dateTime.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = dateTime.getDate();
    d = d < 10 ? ('0' + d) : d;

    return y + '-' + m + '-' + d;
}
/**
 * 判断是否为空
 * @param str
 * @returns {boolean}
 */
function isNull(str){
    if(str.replace(/(^s*)|(s*$)/g, "").length ==0){
        return true
    }
    return false
}

/**
 * 获取URL中指定的参数
 * @param name 参数名
 * @returns {*}
 * @constructor
 */
function GetQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null){
        return  unescape(r[2]);
    }
    return null;
}

function getIframeDoc(){
    var doc;

    /*if (document.all){//IE
        doc = $("iframe")[0].document.body.innerHTML;;
    }else{//标准浏览器
        doc = $("iframe")[0].contentDocument.body.innerHTML;
    }*/
    doc = $("iframe")[0].contentDocument.body.innerHTML;
    return doc;
}

//数组方法
Array.prototype.contains = function (needle) {
    for (i in this) {
        if (this[i] == needle) return true;
    }
    return false;
}

/**
 * 是否为图片判断
 * @param imageName 带文件格式的文件名
 * @returns {boolean}
 */
function isImage(imageName){
    //var strExtension = imageName.substr(imageName.lastIndexOf('.') + 1);
    var strExtension = imageName.split(".")[imageName.split(".").length - 1];
    var arr = ['jpeg','jpg','gif','png','bmp','JPEG','JPG','GIF','PNG','BMP'];
    if(arr.contains(strExtension)){
        return true;
    }
    return false;
}


/**
 * 存储消息通知总数
 * @param user 要存储的消息通知总数
 */
//function saveMessageTotal(messageTotal){
//    if (window.sessionStorage){
//        sessionStorage.setItem("messageTotal",JSON.stringify(messageTotal));
//    }else{
//        setCookie("messageTotal",JSON.stringify(messageTotal),TimeoutCookie);
//    }
//}

/**
 * 获取消息通知总数
 * @returns {string} 返回消息通知总数
 */
//function getMessageTotal(){
//    if (window.sessionStorage){
//        var messageTotal = JSON.parse(sessionStorage.getItem("messageTotal"));
//        return messageTotal;
//    }else {
//        return JSON.parse(getCookie("messageTotal"));
//    }
//}