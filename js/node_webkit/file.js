var fs = require('fs'),
	express = require('express'),
	stream = require('stream'),
	app = express(),
	cors = require('cors'),
	bodyparser = require('body-parser');
	
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());
app.post('/createFile',function(request,response){
	console.log(request.body);
	var read = new stream.Readable();
	var write = new stream.Writable();
	read._read = function(){
		read.push(request.body.clas);
		read.push(null);
	};
	// write._write = function(chunk,encoding,next){
	// 	next();
	// };
	read.pipe(process.stdout);
	// response.writeHead(200,{
	// 	'Content-Type': 'text/plain'
	// });
	console.log('post');
	response.end('hello');
});
app.listen(3000);