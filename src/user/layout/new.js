//首页

if( PATH == '/' ) {
	var winNode = $(window);
	var mainNode = $('.J_main');
	var staticNode =$('.J_static');
	var listNode = $('.J_list');

	var staticWidth = staticNode.width();

	//固定VOJ框体
	var keep = function(){
		var staticTop = staticNode.offset().top;
		var listTop = listNode.offset().top;
		if( staticTop<=70 && !staticNode.hasClass('static-table-fix')){
			staticNode.addClass('static-table-fix').css('width', staticWidth);
			listNode.addClass('list-fix');
		}
		if( listTop>=70 && staticNode.hasClass('static-table-fix') ){
			staticNode.removeClass('static-table-fix');
			listNode.removeClass('list-fix');
		}

	};
	//若设备宽度大于840挂载滚动事件
	$(function(){
		if( winNode.width() > '840' ){
			mainNode.on('scroll', keep);
		}
	});
}