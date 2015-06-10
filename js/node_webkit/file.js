var fs = require('fs'),
	express = require('express'),
	stream = require('stream'),
	app = express(),
	cors = require('cors'),
	bodyparser = require('body-parser');
	direcrotyUtil = require('./propertyEditor');
	
app.use(bodyparser.urlencoded({extended:false}));
app.use(cors());
app.post('/createFile',function(request,response){
	console.log(request.body);
	var read = new stream.Readable(),
		writeableStream = fs.createWriteStream(request.body.path + '/' +request.body.className + '.js');
	read._read = function(){
		read.push(request.body['class']);
		read.push(null);
	};
	read.pipe(writeableStream);
	// response.writeHead(200,{
	// 	'Content-Type': 'text/plain'
	// });
	console.log('post');
	response.end('hello');
});

app.get('/propertyFiles',function(request,response){
	if(request.query.file){
		response.writeHead(200,{'Content-Type' : 'application/json'});
		direcrotyUtil.getKeys(request.query.file);
		response.end(JSON.stringify({keys:direcrotyUtil.keyArray}));
		// response.end(request.query.file);
		return;
	}
	// console.log(request.param);
	direcrotyUtil.getPropertyFiles();
	response.writeHead(200,{'Content-Type':'application/json'});
	response.end(JSON.stringify({files : direcrotyUtil.files}));
});

app.listen(3000);