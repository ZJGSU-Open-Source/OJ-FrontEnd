if( PATH == '/admin/users' ){
var formNode = $('.J_addForm');
formNode.submit( function(e) {
	e.preventDefault();
	if( $('[name=uid]').val() == '' ){
		warning('请输入用户名');
		return;
	}
	$.ajax({
		type: 'POST',
		url: '/admin/privilegeset?' + $(this).serialize(),
		data: $(this).serialize(),
		error: function(err){
			warning(JSON.parse(err.responseText).hint);
		},
		success: function(data){
			warning('添加成功');
      location.reload();
		}
	});
});
var delNode = $('.J_delete');
delNode.on('click', function() {
	var self = $(this);
	var uid = $(this).data("id");
	if ( confirm('Delete the user '+uid+'?') ) {
		$.ajax({
			type: 'POST',
			url: '/admin/privilegeset?type=PU&uid=' + uid,
			data: $(this).serialize(),
			error: function(err) {
				warning(JSON.parse(err.responseText).hint);
			},
			success: function(data) {
				warning('删除成功！');
				self.parent().parent().remove();
			}
		});
	}
});
}