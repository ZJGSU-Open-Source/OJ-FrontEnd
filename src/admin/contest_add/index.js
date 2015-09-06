if ( PATH=='/admin/contests/new' || /^\/admin\/contests\/(\d+)$/.test(PATH) ) {
  console.log(1);
  //时间插件
  var startNode = $('#J_start');
  var endNode = $('#J_end');
  $(function() {
    startNode.mobiscroll().datetime({
      theme: 'material',
      lang: 'zh',
      display: 'bubble',
      minDate: new Date(),
    });
    endNode.mobiscroll().datetime({
      theme: 'material',
      lang: 'zh',
      display: 'bubble',
      minDate: new Date(),
    });
  });
  //解决chrome下label的bug
  startNode.on('click', function() {
    $(this).parent().addClass('is-dirty');
  });
  endNode.on('click', function() {
    $(this).parent().addClass('is-dirty');
  });
  //比赛类型选择
  var typeNode = $('#J_type');
  var passwdNode = $('.J_passwdArea');
  var privateNode = $('.J_privateArea');
  typeNode.on('change', function() {
    type = $(this).val();
    if (type == 'password') {
      passwdNode.fadeIn();
      privateNode.fadeOut();
    } else if (type == 'private') {
      privateNode.fadeIn();
      passwdNode.fadeOut();
    } else {
      passwdNode.fadeOut();
      privateNode.fadeOut();
    }
  });
  typeNode.trigger('change');

  //添加题目、用户
  var proInputNode = $('.J_proInput');
  var proListNode = $('#J_proList');
  var insert = function(){
    var list = proInputNode.val().match(/(\d+)/g);
      if( list == null )
        return;
      $.each(list, function(i, v) {
        if (v != '')
          proListNode.append(
            '<div class=\"item\">' +
              '<span class=\" J_pro\">' +
                v +
              '</span>' +
              '<div class=\"item-del J_del\">×</div>' +
            '</div>'
          );
      });
      proInputNode.val('');
      proInputNode.parent().removeClass('is-dirty');
  };
  proInputNode.on('keyup', function(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.keyCode == 13) {
      insert();
    }
  });
  
  //proNode下无节点时拖动插件不起作用，故选择先挂节点，载入时再去掉proNode下的节点
  $(function() {
    proListNode.empty();
    proListNode.show();
    insert();
  });
  //拖动插件
  proListNode.dragsort({
    dragSelector: "div",
    placeHolderTemplate: "<div class=\"replace\"></div>",
    dragBetween: true
  });
  //删除题目、用户
  proListNode.on('click', '.J_del', function() {
    $(this).parent().remove();
  });
  //提交表单
  $('.J_submit').on('click', function(e) {
    e.preventDefault();
    var proList = $('.J_pro').map(function(){
      return $(this).text();
    }).get().join(';');
    console.log(proList);
    var start = new Date(startNode.val());
    var end = new Date(endNode.val());
    $.ajax({
      type: 'post',
      url: '/admin/contests',
      data: {
        title: $('[name=title]').val(),
        startTimeYear: start.getFullYear(),
        startTimeMonth: parseInt(1) + start.getMonth(),
        startTimeDay: start.getDate(),
        startTimeHour: start.getHours(),
        startTimeMinute: start.getMinutes(),
        endTimeYear: end.getFullYear(),
        endTimeMonth: parseInt(1) + end.getMonth(),
        endTimeDay: end.getDate(),
        endTimeHour: end.getHours(),
        endTimeMinute: end.getMinutes(),
        problemList: proList,
        userlist: $('[name=userlist]').val(),
        type: $('[name=type]').val(),
        password: $('[name=password]').val()
      },
      success: function(data){
        warning('成功！', function(){
          location.href = '/admin/contests'
        });
      },
      error: function(err){
        warning(err);
      }
    });
  });
}