{{define "content"}}
<div class="p-adminHome mdl-grid">
	<div class="page mdl-cell mdl-cell--8-col mdl-cell--4-col-phone mdl-shadow--2dp J_list">
		{{if .IsAdmin}}
		<div class="text">Hi, Admin.</div>
		{{end}}
		{{if .IsTeacher}}
		<div class="text">Hi, Teacher.</div>
		{{end}}
	</div>
</div>
	
{{end}}