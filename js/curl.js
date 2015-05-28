var http = require('http');

http.createServer(function(request,response){
	console.log('request recieved');
	request.on('data',function(chunk){

		console.log(chunk);
	});
	request.on('end',function(){
		response.end();
	});
}).listen(19999);