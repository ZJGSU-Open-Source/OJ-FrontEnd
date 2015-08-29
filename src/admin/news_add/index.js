if( /^\/admin\/news\/new$/.test(PATH) || /^\/admin\/news\/(\d+)$/.test(PATH) ){

	KindEditor.ready(function(K) {
	  setTimeout(function(){
	    $('.J_load').hide();
	    options.height = '500px';
	    window.editor = K.create('#J_content', options);
	  }, 1000);
	});
}