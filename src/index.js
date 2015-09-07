//全局函数与变量
var PATH = location.pathname;
console.log(PATH);
//登出
var signoutBtn = $('.J_signout');
signoutBtn.on('click', function(e) {
  e.preventDefault();
  $.ajax({
    type: 'DELETE',
    url: '/sess',
    data: '',
    error: function(err) {
      console.log(err);
      alert('登出失败');
    },
    success: function(data) {
      console.log(data);
      location.href = '/sess';
    }
  });
});

//警告
var warnNode = $('.J_warn');
var warning = function(text, callback){
  warnNode.text(text).show();
  setTimeout(function(){
    warnNode.fadeOut();
    if( callback )
      callback();
  }, 1000);
}

var winNode = $(window);
var mainNode = $('.J_main');
var staticNode =$('.J_static');
var listNode = $('.J_list');
if( staticNode.length ){
  //固定VOJ框体
  var initTop = staticNode.offset().top;
  var keep = function(){
    var staticTop = staticNode.offset().top;
    var listTop = listNode.offset().top;
    if( listTop >= 80 ){
      staticNode.css('top', 0);
    }
    else{
      staticNode.css('top', mainNode.scrollTop()-initTop+80);
    }
  };
  //若设备宽度大于840挂载滚动事件
  $(function(){
    if( winNode.width() >= '480' ){
      mainNode.on('scroll', keep);
    }
  });
}

//kindeditor配置
var options = {
  resizeType: 0,
  height: '250px',
  width: '100%',
  langType : 'zh_CN',
  items: [
    'source', '|', 'undo', 'redo', '|', 
    'preview', 'code', 'cut', 'copy', 'paste', 'plainpaste', 'wordpaste', '|', 
    'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 
    'insertorderedlist', 'insertunorderedlist', 'subscript', 'superscript', 
    'clearhtml', '|', 'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|', 
    'forecolor', 'hilitecolor', 'bold', 'italic', 'underline', 'strikethrough', 
    'removeformat', '|', 'image', 'table', 'hr', 
    'emoticons', 'baidumap', 'link', 'unlink', '|', 'about'
  ]
}
