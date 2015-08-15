{{define "content"}}
{{$cid := .Cid}}


<div class="p-rankList mdl-grid">
  <div class="page mdl-cell mdl-cell--10-col mdl-cell--4-col-phone mdl-shadow--2dp">
    <div class="go-title-area border mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <div class="title">
        Contest RankList -- {{.Contest}}
        <a class="mdl-button mdl-js-button mdl-button--icon" href="/contests/{{.Cid}}/rankfile">
        <i id="tt2" class="icon material-icons">vertical_align_bottom</i>
        </a>
        <div class="mdl-tooltip mdl-tooltip--large" for="tt2">导出为表格</div>
      </div>
    </div>
    
    <div class="table-area mdl-cell mdl-cell--12-col mdl-cell--4-col-phone mdl-shadow--2dp">
      <table class="go-table text-center">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Team</th>
            <th>Solved</th>
            <th>Penalty</th>
            {{with .ProblemList}}
            {{range $idx,$pid:= .}}
            <th>
              <a href="/contests/{{$cid}}/problems/{{$idx}}">{{$idx}}</a>
            </th>
            {{end}}
            {{end}}
          </tr>
        </thead>
        <tbody>
          {{with .UserList}}
          {{range $idx,$v := .}} 
            <tr>
              <td>{{NumAdd $idx 1}}</td>
              <td><a href="/users/{{$v.Uid}}">{{$v.Uid}}</a></td>
              <td><a href="/contests/{{$cid}}/status?uid={{$v.Uid}}&judge=3">{{$v.Solved}}</a></td>
              <td>{{ShowGapTime $v.Time}}</td>
              {{with $v.ProblemList}}
              {{range .}}
                {{if .}}
                  {{if eq .Judge 3}}
                    <td>{{ShowGapTime .Time}}/({{.Count}})</td>
                  {{else}}
                    <td>0/({{.Count}})</td>
                  {{end}}
                {{else}}
                  <td>0/(0)</td>
                {{end}}
              {{end}}
              {{end}}
            </tr>
          {{end}}
          {{end}}
        </tbody>
      </table>
    </div>
    
  </div>
</div>
{{end}}