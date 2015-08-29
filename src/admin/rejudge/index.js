if( PATH == '/admin/rejudger' ){
	var typeNode = $('.J_type');
	var idNode = $('#J_id');

	idNode.on('input', function(){
		var value = idNode.val();
		idNode.val( value.replace(/[^0-9]/,'' ) );
	});

	$('.J_addForm').on('submit', function(e){
		e.preventDefault();
		if( !idNode.val() || idNode.val()=='' ){
			warning('请输入ID');
			return;
		}
		$.ajax({
			type: 'POST',
			url: '/admin/rejudger?type=' + typeNode.val() + '&id=' + idNode.val(),
			data: $(this).serialize(),
			dataType: 'text',
			success: function(data){
				warning("Rejudge Complete", function(){
					location.href = '/status';
				});
			},
			error: function(err){
				warning(JSON.parse(err.responseText).info);
			}
		});

	});

}