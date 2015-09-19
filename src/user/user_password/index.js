if( PATH == '/account' ){
	var formNode = $('.J_addForm');
	var oldNode = $('[name="user[oldPassword]"]');
	var newNode = $('[name="user[newPassword]"]');
	var confirmNode = $('[name="user[confirmPassword]"]');
	formNode.on('submit', function(e){
		e.preventDefault();
		var passWd = oldNode.val();
		var newPassWd = newNode.val();
		var confirmPassWd = confirmNode.val();
		if( !passWd || passWd=='' ){
			warning('请输入原密码');
		}
		else if( !newPassWd || newPassWd=='' ){
			warning('请输入新密码');
		}
		else if( newPassWd.length < 6 ){
			warning('新密码不得小于6位');	
		}
		else if( !confirmPassWd || confirmPassWd=='' ){
			warning('请再次输入密码');
		}
		else if( newPassWd != confirmPassWd ){
			warning('两次密码不一致');
		}
		else{
			$.ajax({
				url: '/account',
				type: 'post',
				data: $(this).serialize(),
				dataType: 'text',
				success: function(data){
					warning('修改成功', function(){
						location.href = '/settings';
					});
				},
				error: function(err){
					var info = JSON.parse(err.responseText);
					if( info.oldPassword ){
						warning( info.oldPassword );
					}
					else if( info.newPassword ){
						warning( info.newPassword );
					}
					else if( info.confirmPassword ) {
						warning( info.confirmPassword );
					}
					else {
						warning( JSON.stringify(err) );
					}
				}
			});
		}
	});
}