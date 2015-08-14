{{define "content"}}
<div class="p-proList mdl-grid">
  <div class="page mdl-cell mdl-cell--10-col mdl-cell--4-col-phone mdl-shadow--2dp">

    <form accept-charset="UTF-8" class="J_searchForm">
      <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-phone">
          <div class="go-select-title">search type</div>
          <select name="option" class="go-select">
            <option value="title" {{if .SearchTitle}}selected{{end}}>Title</option>
            <option value="pid" {{if .SearchPid}}selected{{end}}>ID</option>
            <option value="source" {{if .SearchSource}}selected{{end}}>Source</option>
            <option value="page">Page</option>
          </select>
        </div>
        <!-- <div class="search-text">search:</div> -->
        <div class="mdl-cell mdl-cell--2-col mdl-cell--2-col-phone">
          <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable" >
            <label class="mdl-button mdl-js-button mdl-button--icon" for="sample6">
              <i class="material-icons">search</i>
            </label>
            <div class="mdl-textfield__expandable-holder">
              <input class="mdl-textfield__input" type="text" id="sample6" name="search" value="{{.SearchValue}}"/>
              <label class="mdl-textfield__label" for="sample6">Expandable Input</label>
            </div>
          </div>
        </div>
      </div>
    </form>

    <div class="go-pagination mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      {{$current := .CurrentPage}}
      {{$url := .URL}}
      {{if .IsPreviousPage}}
        <a class="mdl-button mdl-js-button mdl-button--icon mdl-layout--large-screen-only" href="{{$url}}page={{NumSub .CurrentPage 1}}">
          <i class="material-icons">arrow_back</i>
        </a>
      {{else}}
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-layout--large-screen-only">
          <i class="material-icons">arrow_back</i>
        </button>
      {{end}}

      {{if .IsPageHead}}
        {{with .PageHeadList}}
          {{range .}}
            {{if eq . $current}}
              <button class="btn now mdl-button mdl-js-button mdl-js-ripple-effect">
                {{.}}
              </button>
            {{else}}
              <a class="btn mdl-button mdl-js-button mdl-js-ripple-effect" href="{{$url}}page={{.}}">{{.}}</a>
            {{end}}
          {{end}}
        {{end}}
      {{end}}

      {{if .IsPageMid}}
        <button class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_horiz</i>
        </button>
        {{with .PageMidList}}
          {{range .}}
            {{if eq . $current}}
              <div class="btn now mdl-button mdl-js-button mdl-js-ripple-effect">{{.}}</div>
            {{else}}
              <a class="btn mdl-button mdl-js-button mdl-js-ripple-effect" href="{{$url}}page={{.}}">{{.}}</a>
            {{end}}
          {{end}}
        {{end}}
      {{end}}

      {{if .IsPageTail}}
        <button class="mdl-button mdl-js-button mdl-button--icon">
          <i class="material-icons">more_horiz</i>
        </button>
        {{with .PageTailList}}
          {{range .}}
            {{if eq . $current}}
              <button class="btn now mdl-button mdl-js-button mdl-js-ripple-effect">{{.}}</button>
            {{else}}
              <a class="btn mdl-button mdl-js-button mdl-js-ripple-effect" href="{{$url}}page={{.}}">{{.}}</a>
            {{end}}
          {{end}}
        {{end}}
      {{end}}

      {{if .IsNextPage}}
        <a class="mdl-button mdl-js-button mdl-button--icon mdl-layout--large-screen-only" href="{{$url}}page={{NumAdd .CurrentPage 1}}">
          <i class="material-icons">arrow_forward</i>
        </a>
      {{else}}
        <button class="mdl-button mdl-js-button mdl-button--icon mdl-layout--large-screen-only">
          <i class="material-icons">arrow_forward</i>
        </button>
      {{end}}
    </div>
    
    <div class="table-area mdl-cell mdl-cell--12-col mdl-cell--4-col-phone mdl-shadow--2dp">
      <table class="go-table text-center">
        <thead>
          <tr>
            <!-- <th>flag</th> -->
            <th>ID</th>
            <th>Title</th>
            <th class="mdl-layout--large-screen-only">Ratio(Solve/Submit)</th>
            <th class="mdl-layout--large-screen-only">OJ</th>
            <th class="mdl-layout--large-screen-only">VPID</th>
          </tr>
        </thead>
        <tbody>
          {{$time := .Time}}
          {{$privilege := .Privilege}}
          {{with .Problem}}  
            {{range .}} 
              {{if or (ShowStatus .Status) (LargePU $privilege)}}
                <tr>
                  <!-- <td></td> -->
                  <td>{{.Pid}}</td>
                  <td><a href="/problems/{{.Pid}}">{{.Title}}</a></td>
                  <td class="mdl-layout--large-screen-only">
                    {{ShowRatio .Solve .Submit}} (
                    <a href="/status?pid={{.Pid}}&judge=3">{{.Solve}}</a> /
                    <a href="/status?pid={{.Pid}}">{{.Submit}}</a> )
                  </td>
                  <td class="mdl-layout--large-screen-only">{{.ROJ}}</td>
                  <td class="mdl-layout--large-screen-only">{{.RPid}}</td>
                </tr>
              {{end}}
            {{end}}
          {{else}}  
            <!-- <td></td> -->
            <td></td>
            <td class="mdl-layout--large-screen-only"></td>
            <td>无</td>
            <td class="mdl-layout--large-screen-only"></td>
            <td class="mdl-layout--large-screen-only"></td>
          {{end}}
        </tbody>
      </table>
    </div>

  </div>
</div>
<script type="text/javascript">
  $('.J_searchForm').on('submit', function(e) {
    e.preventDefault();
    var value = $('[name=search]').val();
    var key = $('[name=option]').val();
    value = encodeURIComponent(value);
    location.href = '/problems?'+key+'='+value;
  });
</script>
{{end}}
