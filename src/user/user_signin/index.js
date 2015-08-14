//登陆页
if( /^\/sess$/.test(PATH) ) {

  var formNode = $('.J_addForm');
  var registerBtn = $('.J_register');
  var submitBtn = $('.J_submit');
  var nameNode = $("#user_handle");
  var passwdNode = $('#user_password');
  //前往注册页
  registerBtn.on('click', function(){
    location.href = '/users/new';
  });
  //登陆
  formNode.on('submit', function(e){
    e.preventDefault();
    if( !nameNode.val() ){
      warning('请输入账号');
      return;
    }
    else if( !passwdNode.val() ){
      warning('请输入密码');
      return;
    }
    $.ajax({
      type: 'post',
      url: '/sess',
      data: formNode.serialize(),
      dataType: 'text',
      error: function(err){
        console.log(err);
        warning('用户名或密码错误！');
      },
      success: function(data){
        console.log(data);
        warning('登陆成功', function(){
          if (document.referrer != ""){
            location.href = document.referrer;
          }else{
            location.href = "/";
          }
        });
      }
    });
  });

}