if( PATH == '/profile' ){
	console.log(1);
	$('.J_addForm').on('submit', function(e){
		e.preventDefault();
		$.ajax({
			type: 'post',
			url: '/profile',
			data: $(this).serialize(),
			success: function(data) {
				warning('修改成功', function(){
					location.href = '/settings';
				});
			},
			error: function(err) {
				warning(JSON.parse(err.responseText).nick);
			}
		});
	});
}