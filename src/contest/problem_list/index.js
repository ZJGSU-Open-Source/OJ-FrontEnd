if( /^\/contests\/(\d+)$/.test(PATH) ) {
  
  var timeNode = $('.J_time');
  var startNode = $('.J_start');
  var endNode = $('.J_end');
  var proNode = $('.J_process');

  //重载Date对象Format方法
  Date.prototype.Format = function(fmt)   
  {
    var o = {   
      "M+" : this.getMonth()+1,                 //月份   
      "d+" : this.getDate(),                    //日   
      "h+" : this.getHours(),                   //小时   
      "m+" : this.getMinutes(),                 //分   
      "s+" : this.getSeconds(),                 //秒   
      "q+" : Math.floor((this.getMonth()+3)/3), //季度   
      "S"  : this.getMilliseconds()             //毫秒   
    };   
    if(/(y+)/.test(fmt))   
      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
    for(var k in o)   
      if(new RegExp("("+ k +")").test(fmt))   
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
    return fmt;   
  }

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