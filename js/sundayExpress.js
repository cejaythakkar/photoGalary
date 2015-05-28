var express = require('express'),
	app = express(),
	files = require('./files')
	customMiddleWare = require('./customMiddleWare'),
	cors = require('cors');

app.use(cors());
app.use(customMiddleWare); // custom middleware
app.use(express.static('public'));

app.get('/getMenu',function(request,response){
	var folderContent = files.getDirectoryContents();
	console.log(folderContent);
	response.json(folderContent)
});

app.listen(3000,function(){
	console.log('listening to port 3000.');
});