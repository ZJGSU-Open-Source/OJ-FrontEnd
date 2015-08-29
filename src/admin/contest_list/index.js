if( PATH == '/admin/contests' ){
	var statusNode = $('.J_status');
	statusNode.on('click', function() {
	  var cid = $(this).data('id');
	  var text = $.trim($(this).html());
	  var self = $(this);
		if( text == 'Available' )
			text = 'Reserved';
		else
			text = 'Available';
	  $.ajax({
	    type: 'POST',
	    url: '/admin/contests/'+cid+'/status',
	    data: $(this).serialize(),
	    error: function(err){
	    	console.log(err);
	      warning(err.responseText);
	    },
	    success: function(data){
	    	self.html(text);
	    	warning('修改成功！');
	    }
	  });
	});
	var deleteNode = $('.J_delete');
	deleteNode.on('click', function() {
		var self = $(this);
	  if ( confirm('Delete the contest?') ) {
	    var cid = $(this).data('id');
	    $.ajax({
	      type: 'DELETE',
	      url: '/admin/contests/'+cid,
	      data: $(this).serialize(),
	      error: function(err) {
	        warning(err.responseText);
	      },
	      success: function(data) {
	      	self.parent().parent().remove();
	        warning('删除成功！');
	      }
	    });
	  }
	});
}