$(function(){
  layui.use('layer', function(){});
})
function queryList(pageNum) {
  var user = getUserInfo();
  //console.log(user.username);
  ajaxPost('creditliquor/objectionlist',{
    'page': pageNum ? pageNum : 1,
    'rows':10,
    'department':user.department,
    'proposer':$('#proposer').val(),
    'objectionObject':$('#objectionObject').val(),
    'objectionTitle':$('#objectionTitle').val(),
    'startTime':$('#startTime').val(),
    'endTime':$('#endTime').val(),
  },function (res) {
    if (res.result=='1'){
        //var dataList = res.data;
        var html= template('template_id',res);
        $('#table-list').html(html);
        pagination('#pager',res.count,function (pageNum) {
          queryList(pageNum);
        });
    }
  },function (err) {
    console.log(err.msg);
  });
}
function queryDetial() {
  var rlParam = GetUrlParam();
  ajaxPost('creditliquor/objectiondetail',{
    'id': rlParam.ID,
  },function (res) {
    if (res.result=='1'){
      var html = template('template_id',res);
      $('#detial-content').html(html);
    }
  },function (err) {
    console.log(err.msg);
  });
}
function handle(id) {
  if(isNull($('#disposeResult').val())){
    layer.msg('办理结果不可以为空', {
      icon: 2,
      time: 2000 //2秒关闭（如果不配置，默认是3秒）
    });
    return false
  }
  var user = getUserInfo();
  ajaxPost('creditliquor/updateobjection',{
    'id': id,
    department:user.department,
    acceptor:user.username,
    disposeResult:$('#disposeResult').val(),
  },function (res) {
    if (res.result == '1'){
      layer.alert('办理成功！',{
        time: 2000 ,
        end: function(){ go(); }
      });
    }
  },function (err) {
    console.log(err.msg);
  });
}