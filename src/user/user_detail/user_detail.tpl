{{define "content"}}
<div class="p-user-detail mdl-grid">
    <div class="page mdl-cell mdl-cell--8-col mdl-cell--4-col-phone mdl-shadow--2dp">
      <div class="go-title-area border mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
        <div class="title">User Detail</div>
      </div>
    <table class="table table-bordered table-striped table-hover">
      <tbody>
        {{with .Detail}}
          <tr>
            <th>Handle</th>
            <td>{{.Uid}}</td>
          </tr>
          <tr>
            <th>Nick</th>
            <td>{{.Nick}}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td><a href="mailto:{{.Mail}}">{{.Mail}}</a></td>
          </tr>
          <tr>
            <th>Motto</th>
            <td>{{.Motto}}</td>
          </tr>
           <tr>
            <th>School</th>
            <td>{{.School}}</td>
          </tr>
          <tr>
            <th>Problems Submitted</th>
            <td><a href="/status?uid={{.Uid}}">{{.Submit}}</a></td>
          </tr>
          <tr>
            <th>Problems Solved</th>
            <td>{{.Solve}}</td>
          </tr>
        {{end}}
        {{/*if .IPPrivilege*/}}
        <table class="table table-bordered table-striped table-hover">
          <tr>
            <th><center>Login Time</center></th>
            <th><center>Login IP</center></th>
              {{with .IpList}}
                {{range .}}
                {{if .}}</tr>
                  <td><center>{{ShowTime .Time}}</center></td>
                  <td><center>{{.IP}}</center></td>
                  </tr> 
                {{end}}
                {{end}}
              {{end}}
            </td>
        </table>
        {{/*end*/}}
        <table class="table table-bordered table-striped table-hover">
          <tr>
            <th><center>Achieve</center></th>
          </tr>
         
          {{with .List}}
            <tr>
            <td>
            <center>
                {{range .}}
                  <a href="/problems/{{.}}">{{.}}</a> 
                {{end}}            
            </center>
            </td>
            </tr>
          {{end}}
           
        </table>
      </tbody>
    </table>
  </div>
</div>
{{end}}
