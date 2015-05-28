var fs = require('fs'),
	express = require('express'),
	busboy = require('connect-busboy'),
	bodyParser = require('body-parser'),
	hbs = require('hbs'),
	app = express();

app.set('view engine','html');
app.engine('html',hbs.__express);
app.use(busboy());
app.use(bodyParser.urlencoded({extended:false}));
app.get('/',function(request,response){
	response.render('loginPage');
});
app.post('/addImages',function(request,response){
	request.pipe(request.busboy);
	request.busboy.on('file',function(fieldname,file,filename){
		console.log('uploading ' + filename);
		fstream = fs.createWriteStream(__dirname + filename);
		file.pipe(fstream);
		fstream.on('close',function(){
			console.log('upload finished!!');
			response.redirect('back');
		});
	});
});

app.listen(3300,function(){
	console.log('server started on 3300');
});