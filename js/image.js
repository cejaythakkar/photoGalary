var http = require('http'),
	fs = require('fs'),
	sys = require('sys'),
	encoding = require('./image_to_base_sixty_four'),
	counter = 0,
	arrayOfImages = ['anubis1.jpg','anubis2.jpg'],
	calculateCounter = function(){
		(counter > 1) && (counter=0)
	};

http.createServer(function(request,response){
	console.log('request reveived!!!');
	calculateCounter();
	console.log('counter value is ' + counter);
	var pathtoimage = arrayOfImages[counter];
	//response.header('Access-Control-Allow-Origin', '*');
	fs.readFile(pathtoimage,function(error,file){
		error ? (function(){
			console.log('error occured');
			response.writeHeader(404);
			response.write('file not found');
			response.end();
		})()
		:(function(){
			response.writeHead(200,{'Content-Type':'text/plain',
										"Access-Control-Allow-Origin":"*"
			});
			console.log('header written');
			console.log(file);
			response.write(encoding.convertToBaseSixtyFour(file));
			response.end();
		})();
		counter++;
	}); 
}).listen(11000);

sys.puts('http server is running on port 11000');