if( PATH == '/admin/problems' ){
	var statusNode = $('.J_status');
	statusNode.on('click', function() {
	  var pid = $(this).data('id');
	  var text = $.trim($(this).html());
	  var self = $(this);
		if( text == 'Available' )
			text = 'Reserved';
		else
			text = 'Available';
	  $.ajax({
	    type: 'POST',
	    url: '/admin/problems/'+pid+'/status',
	    data: $(this).serialize(),
	    error: function(){
	      warning('修改失败！');
	    },
	    success: function(){
				self.html(text);
				warning('修改成功！');
	    }
	  });
	});
	var deleteNode = $('.J_delete');
	deleteNode.on('click', function() {
		var self = $(this);
	  if ( confirm('Delete the Problem?') ){
	    var pid = $(this).data('id');
	    $.ajax({
	      type: 'DELETE',
	      url: '/admin/problems/'+pid,
	      data: $(this).serialize(),
	      error: function() {
	        warning('删除失败！');
	      },
	      success: function() {
	        warning('删除成功！');
					self.parent().parent().remove();
	      }
	    });
	  }
	});
}