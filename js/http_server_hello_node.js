var http_server = require('http'),
sys = require('sys'),
url = require('url'),
path = require('path'),
file_system = require('fs');

http_server.createServer(function(request,response){
	sys.puts('i got clicked');
	var full_path = path.join(process.cwd(),url.parse(request.url).pathname);

	file_system.exists(full_path , function(exists){
		(!exists)? (function(){
			response.writeHeader(404,{"Content-Type" : 'text/plain'});
			response.end('file you are lookuing for does not exists!!!');
		})() : (function(){
			file_system.readFile(full_path,'binary',function(error,file){
				error ? (function(){
					response.writeHeader(500,{"Content-Type":"text/plain"});
					response.end(error + ' Error while processing your request');
				})() : (function(){
					//debugger;
					response.writeHeader(200);
					response.write(file,"binary");
					response.end();
				})();
			});
		})();
	});
}).listen(11000);
sys.puts('http server is running on port 11000');
