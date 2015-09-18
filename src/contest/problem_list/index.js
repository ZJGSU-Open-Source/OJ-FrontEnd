if( /^\/contests\/(\d+)$/.test(PATH) ) {
  
  var timeNode = $('.J_time');
  var startNode = $('.J_start');
  var endNode = $('.J_end');
  var proNode = $('.J_process');

  var endTime = new Date(endNode.html().split('-').join('/'));
  var startTime = new Date(startNode.html().split('-').join('/'));
  var totalTime = endTime.getTime()-startTime.getTime();
  //渲染时间
  var handleTime = function(){
    var time = new Date();

    if( time.getTime() < startTime.getTime() ){  //start 比赛还未开始
      timeNode.addClass('static-1');
      proNode.val(0);
    }
    else if( time.getTime() < endTime.getTime() ){  //running 比赛进行中
      timeNode.removeClass('static-1').addClass('static-3');
      var pastlTime = time.getTime()-startTime.getTime();
      proNode.val( 100 * pastlTime / totalTime );
    }
    else{ //end 比赛结束
      timeNode.removeClass('static-3').addClass('static-4');
      proNode.val(100);
    }
    time = time.Format('yyyy-MM-dd hh:mm:ss');
    timeNode.html(time);
  };
  $(handleTime);
  //动态渲染当前时间
  setInterval(handleTime, 1000);

}