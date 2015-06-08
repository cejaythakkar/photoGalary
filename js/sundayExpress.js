var express = require('express'),
	app = express(),
	files = require('./files'),
	bodyParser = require('body-parser'),
	customMiddleWare = require('./customMiddleWare'),
	cors = require('cors'),
	busboy=require('connect-busboy');

app.use(busboy());
app.use(cors());
// app.use(customMiddleWare); // custom middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));

app.get('/getMenu',function(request,response){
	var folderContent = files.getDirectoryContents();
	console.log(folderContent);
	response.json(folderContent)
});

app.post('/upload',function(request,response){
	console.log('post request mod')
	request.pipe(request.busboy);
	request.busboy.on('file',function(fieldname,file,filename){
		console.log('uploading ' + filename);
		fstream = fs.createWriteStream('/public/images' + filename);
		file.pipe(fstream);
		fstream.on('close',function(){
			console.log('upload finished!!');
			response.redirect('back');
		});

	});
});

app.listen(3000,function(){
	console.log('listening to port 3000.');
});