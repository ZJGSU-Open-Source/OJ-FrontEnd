if( /^\/problems$/.test(PATH) ){
	console.log(1);
	var inputNode = $('[name=search]');
	var selectNode = $('[name=option]');
	var formNode = $('.J_searchForm');

	var validator = function(){
		var value = inputNode.val();
		console.log(value);
		inputNode.val( value.replace(/[^\.\d]/g,'') );
	};
	selectNode.on('change', function(){
		var value = $(this).val();
		inputNode.val('');
		if( value=='pid' || value=='page' )
			inputNode.on('input', validator);
		else
			inputNode.off('input');
	});
	formNode.on('submit', function(e) {
    e.preventDefault();
    var value = inputNode.val();
    var key = selectNode.val();
    value = encodeURIComponent(value);
    location.href = '/problems?'+key+'='+value;
  });
}