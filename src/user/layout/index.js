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
