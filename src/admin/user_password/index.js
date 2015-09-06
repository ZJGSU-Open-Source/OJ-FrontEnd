if( PATH == '/admin/users/pagepassword' ){
	$('.J_addForm').submit( function(e) {
		e.preventDefault();
		var passwd1 = $('[name="user[newPassword]"]').val();
		console.log(passwd1);
		var passwd2 = $('[name="user[confirmPassword]"]').val();
		console.log(passwd2);
		if( passwd1.length < 6 ){
			warning('密码长度不得小于6位！');
			return;
		}
		else if( passwd1 != passwd2 ){
			warning('两次密码不一致！');
			return;
		}
		$.ajax({
			type: 'post',
			url: '/admin/users/password',
			data: $(this).serialize(),
			error: function(err) {
				var uid = JSON.parse(err.responseText).uid;
				if( uid || uid=='' ){
					warning('该用户不存在！');
				}
			},
			success: function(data) {
				warning('修改成功！', function(){
					location.href='/admin/users';
				});
			}
		});
	});
}