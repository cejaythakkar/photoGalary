$(function(){
	$.ajax({
		type : 'GET',
		url : 'http://localhost:3000/getMenu',
		dataType : 'json',
		success : function(data){
			makeMenu(data);
		}
	});
	var makeMenu = function(data){
		var template,$galaryStage = $('#galaryStage');
		for(var i = 0; i < data.length ;i++){
			template = '<div class="contentContainer"><div class="content"><img src="' + data[i].fileFolderPath + '"/ width="150" height="150"><span>'+ data[i].fileFolderName +'</span></div></div>'
			$galaryStage.append(template);
		}
	}
});