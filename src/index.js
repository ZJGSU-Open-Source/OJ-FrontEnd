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
    if( listTop >= 70 ){
      staticNode.css('top', 0);
    }
    else{
      staticNode.css('top', mainNode.scrollTop()-initTop+80);
    }
  };
  //若设备宽度大于840挂载滚动事件
  $(function(){
    if( winNode.width() >= '840' ){
      mainNode.on('scroll', keep);
    }
  });
}

//重载Date对象Format方法
Date.prototype.Format = function(fmt)   
{
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
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
