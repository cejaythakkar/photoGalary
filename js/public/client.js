$(function(){
	$.ajax({
		type : 'GET',
		url : 'http://localhost:3000/getMenu',
		dataType : 'json',
		success : function(data){
			console.log(data);
		},
		error : function(){
			console.log('some error');
		}
	});
});