if( '/admin/problems/new' == PATH || /^\/admin\/problems\/(\d+)$/.test(PATH) ){
	console.log(1);
	KindEditor.ready(function(K) {
	  options.height = '250px';
	  setTimeout(function(){
	  	$('.J_load').hide();
	  	window.editor = K.create('#J_description', options);
	  	window.editor = K.create('#J_input', options);
	  	window.editor = K.create('#J_output', options);
	  	window.editor = K.create('#J_hint', options);
	  }, 1000);
	});
	var fontList = {
    false: 'check_box_outline_blank',
    true: 'check_box'
  };
  var font = $('#problem_special').check;
  var labelNode = $('.J_label');
  var specialNode = $('#J_special');
  specialNode.on('change', function(){
  	font = !font;
  	labelNode.html( fontList[font] );
  });
}