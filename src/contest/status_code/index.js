if( /^\/contests\/(\d+)\/status\/(\d+)\/code$/.test(PATH) ) {
	var codeNode = $('.J_code');
	var sourceNode = $('.J_source');
	var flag = true;

	codeNode.on('dblclick', function(){
		codeNode.hide();
			if( flag ){
				sourceNode.height(codeNode.height());
				falg = !flag;
			}
		sourceNode.show();
	});
	sourceNode.on('blur', function(){
		codeNode.show();
		sourceNode.hide();
	});
}