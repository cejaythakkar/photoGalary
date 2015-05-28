var http = require('http');

http.createServer(function(request,response){
	request.on('data',function(chunk){
		console.log(chunk);
	});
	request.on('end',function(){
		response.end();
	});
});