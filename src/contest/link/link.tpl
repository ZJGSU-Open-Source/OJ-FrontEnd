{{define "link"}}
<div class="m-link J_static mdl-shadow--2dp">
  <div class="link">
    <a href="/contests/{{.Cid}}">Problem</a>
  </div>
  <div class="link">
    <a href="/contests/{{.Cid}}/status">Status</a>
  </div>
  <div class="link">
    <a href="/contests/{{.Cid}}/ranklist">Ranklist</a>
  </div>
</div>
{{end}}