if( /^\/contests\/(\d+)\/status$/.test(PATH) ) {
  
  $('#search_form').submit( function(e) {
    e.preventDefault();
    var uid = $('[name=search_uid]').val();
    var pid = $('[name=search_pid]').val();
    var judge = $('[name=search_judge]').val();
    var language = $('[name=search_language]').val();
    var url = 'status?';
    if (uid != '')
      url += 'uid=' + uid + "&";
    if (pid != '')
      url += 'pid=' + pid + "&";
    if (judge > 0){
      judge = judge-1;
      url += 'judge=' + judge + "&";
    }
    if (language > 0)
      url += 'language=' + language + "&";
    location.href = url;
  });
}
