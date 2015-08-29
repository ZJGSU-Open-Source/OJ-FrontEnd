{{define "content"}}

<div class="p-code-detail mdl-grid"> 
  <div class="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone">
    {{template "link" .}}
  </div>
  <div class="page mdl-cell mdl-cell--8-col mdl-cell--4-col-phone mdl-shadow--2dp mdl-grid J_list">
    <div class="go-title-area border text-center mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      <div class="title">{{.Title}}</div>
    </div>
    {{with .Solution}}
    <div class="small mdl-cell mdl-cell--12-col mdl-cell--4-col-phone mdl-shadow--2dp">{{.Code}}</div>
    <div class="large mdl-cell mdl-cell--12-col mdl-cell--4-col-phone">
      Double click to view unformatted code
      <textarea class="source J_source mdl-shadow--2dp" readonly>{{.Code}}</textarea>
      <div class="J_code">
        <pre class="prettyprint linenums code mdl-shadow--2dp">{{.Code}}</pre>
      </div>
    </div>
  </div>
  <div class="mdl-cell mdl-cell--2-col mdl-cell--4-col-phone"></div>
</div>
<script src="/static/js/prettify.js"></script>
{{end}}
{{end}}