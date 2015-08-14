{{define "content"}}
<div class="p-conProList mdl-grid">
  <div class="page mdl-cell mdl-cell--8-col mdl-cell--4-col-phone mdl-shadow--2dp">
    <div class="go-title-area mdl-cell--12-col mdl-cell--4-col-phone mdl-grid">
    
      <div class="title mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">{{.Contest}}</div>
      <div class="start-time mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        Start Time : <span class="J_start static-1">{{ShowTime .Start}}</span>
      </div>
      <div class="end-time mdl-cell mdl-cell--6-col mdl-cell--4-col-phone">
        End Time : <span class="J_end static-4"> {{ShowTime .End}}</span>
      </div>
      <div class="text-center mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
        Current Time : <span class="J_time"></span>
      </div>
      <div class="text-center mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
        <input class="J_process mdl-slider mdl-js-slider" type="range" min="0" max="100" readonly/>      
      </div>
      
    </div>
    
    <div class="table-area mdl-cell mdl-cell--12-col mdl-cell--4-col-phone mdl-shadow--2dp">
      <table class="go-table text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Ratio(Accept/Submit)</th>
          </tr>
        </thead>
        <tbody>
          {{$cid := .Cid}}
          {{with .Problem}}  
            {{range .}}
            {{if .}} 
              <tr>
                <td>{{.Pid}}</td>
                <td><a href="/contests/{{$cid}}/problems/{{.Pid}}">{{.Title}}</a></td>
                <td>{{ShowRatio .Solve .Submit}} ({{.Solve}}/{{.Submit}})</td>
              </tr>
            {{end}}
            {{end}}  
          {{end}}
        </tbody>
      </table>
    </div>

  </div>
</div>
{{end}}