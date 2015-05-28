var http = require('http'),
	url = require('url');

http.createServer(function(request,response){
	// request.on('end',function(){
		var _get = url.parse(request.url,true).query;
		response.writeHeader(200,{'Content-Type':'text/plain'});
		response.end('hi user your parameters are ' + _get['data']);
	// });
}).listen(11000);