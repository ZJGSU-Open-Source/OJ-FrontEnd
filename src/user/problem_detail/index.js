if( /^\/problems\/(\d+)$/.test(PATH) ){
  var winNode = $(window);
  var mainNode = $('.J_main');
  var staticNode =$('.J_static');
  var listNode = $('.J_list');

  var staticWidth = staticNode.width();

  //固定VOJ框体
  var keep = function(){
    var staticTop = staticNode.offset().top;
    var listTop = listNode.offset().top;
    if( staticTop<=70 && !staticNode.hasClass('info-fix')){
      staticNode.addClass('info-fix').css('width', staticWidth);
      listNode.addClass('list-fix');
    }
    if( listTop>=70 && staticNode.hasClass('info-fix') ){
      staticNode.removeClass('info-fix');
      listNode.removeClass('list-fix');
    }

  };
  //若设备宽度大于840挂载滚动事件
  $(function(){
    if( winNode.width() > '840' ){
      mainNode.on('scroll', keep);
    }
  });
  var editor;
  var extendNode = $('.J_extend');
  var editNode = $('#advanced_editor');
  var codeNode = $('#code');
  var subNode = $('.J_submission');
  var labelNode = $('.J_label');
  var fontList = {
    false: 'check_box_outline_blank',
    true: 'check_box'
  };
  var font = true;

  function set_mode() {
    var compiler=$('#compiler_id option:selected').text();
    var modes=[ 
    'Javascript', 
    'Haskell', 
    'Lua', 
    'Pascal', 
    'Python', 
    'Ruby', 
    'Scheme', 
    'Smalltalk', 
    'Clojure',
    ['PHP', 'text/x-php'],
    ['C', 'text/x-csrc'],
    ['C++', 'text/x-c++src'],
    ['Java', 'text/x-java'],
    ['', 'text/plain'] ];
    for( var i in modes ){
      var n=modes[i], m=modes[i];
      if( $.isArray(n) ) { 
        m=n[1]; 
        n=n[0]; 
      }
      if( compiler.indexOf(n) >= 0 ){
        editor.setOption('mode', m.toLowerCase() );
        break;
      }
    }
  };
  function toggle_editor() {
    var cm = $('.CodeMirror');
    if( editNode.prop('checked') ) {
      cm.show();
      editor.setValue(codeNode.val());
      codeNode.hide();
    } 
    else {
      codeNode.val(editor.getValue()).show();
      cm.hide();
    };
    return true;
  }
  extendNode.on('click', function() {
    subNode.show();
    extendNode.hide();
    editor = CodeMirror.fromTextArea(document.getElementById("code"), {
      lineNumbers: true,
    });
    codeNode.on('blur', function(){
      editor.setValue( codeNode.val() );
    });
    $('#compiler_id').on('change', set_mode);
    set_mode();
    toggle_editor();
  });

  editNode.on('change', toggle_editor);

  labelNode.on('click', function(){
    font = !font;
    labelNode.html(fontList[font]);
  });

  $('#problem_submit').on('submit', function(e) {
    e.preventDefault();
    codeNode.val(editor.getValue());
    $.ajax({
      type: 'POST',
      url: '/problems/' + $(this).attr('data-id'),
      data: $(this).serialize(),
      success: function( result ) {
        codeNode.val('')
        warning('提交成功', function(){
          location.href = '/status';
        });
      },
      error: function(err) {
        if( err.status == 401 ){
          warning('请先登录', function(){
            location.href = '/sess';
          });
        }
        else {
          var json = eval('('+err.responseText+')');
          if( json.info != null )
            warning(json.info);
        }
      }
    });
  });
  
}