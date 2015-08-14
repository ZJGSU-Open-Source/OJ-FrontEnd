{{define "content"}}
<div class="p-rankList mdl-grid">
  <div class="page mdl-cell mdl-cell--10-col mdl-cell--4-col-phone mdl-shadow--2dp">
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
            <th>Rank</th>
            <th>User</th>
            <th class="mdl-layout--large-screen-only">Nick</th>
            <th class="mdl-layout--large-screen-only">Motto</th>
            <th>
              <span class="mdl-layout--large-screen-only">Ratio</span>
              (Solve / Submit)
            </th>
          </tr>
        </thead>
        <tbody>
          {{$time := .Time}}
          {{$privilege := .Privilege}}
          {{with .User}}  
            {{range .}} 
              {{if ShowStatus .Status}}
                <tr>
                  <td>{{.Index}}</td>
                  <td><a href="/users/{{.Uid}}">{{.Uid}}</a></td>
                  <td class="mdl-layout--large-screen-only">{{.Nick}}</td>
                  <td class="mdl-layout--large-screen-only">{{.Motto}}</td>
                  <td>
                    <span class="mdl-layout--large-screen-only">{{ShowRatio .Solve .Submit}}</span>
                    ( <a href="/status?uid={{.Uid}}&judge=3">{{.Solve}}</a> /
                    <a href="/status?uid={{.Uid}}">{{.Submit}}</a> )
                  </td>
                </tr>
              {{end}}
            {{end}}
          {{else}}
            <td></td>
            <td class="mdl-layout--large-screen-only"></td>
            <td>无</td>
            <td class="mdl-layout--large-screen-only"></td>
            <td></td>
          {{end}}
        </tbody>
      </table>
    </div>
    
  </div>
</div>
{{end}}