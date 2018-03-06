$(function () {
  layui.use('layer', function(){});
  searchType('#search-type');
  searchRadio('#search-radio');

})
function searchType(id) {
  var t = $(id).find('.type');
  t.eq(0).addClass('checked');
  t.on('click',function () {
    var typeVal = $(this).attr('type-data');
    if (typeVal == '1'){
      $('#search-radio').show();
    }else{
      $('#search-radio').hide();
    }
    $(this).addClass('checked').siblings().removeClass('checked');
    $('#search-type-val').val(typeVal);
  })
}
function searchRadio(id) {
  var r = $(id).find('input[type="radio"]'),
      _this = $(id).find("input[type='radio']:checked");
  change();
  r.on('change',function () {
     _this = $(this);
     change();
  });
  function change() {
    $(id).find('.radio-btn').removeClass('checked');
    _this.siblings('i').addClass('checked');
  }

}

function search(pageNum) {
  var pageSize = 10;
  ajaxPost('search',{
    'page': pageNum ? pageNum : 1,
    'rows':pageSize,
    'type':$('#search-type-val').val(),
    'index':$('input[name="search-radio"]:checked').val(),
    'value':$('#search-input').val()
  },function (res) {
    //console.log(res)
    if (res.result=='1'){
      res.pageNum = pageNum ? pageNum : 1;
      res.pageSize = pageSize;
      res.type = $('#search-type-val').val();
      var html= template('template_id',res);
      $('#table-list').html(html);
      pagination('#pager',res.count,function (pageNum) {
        search(pageNum);
      });
    }
  },function (err) {
    console.log(err.msg);
  });
}

