var express = require('express'),hbs = require('hbs'),
blog = require('./blog');
var app = express();

app.set('view engine','html');
app.engine('html',hbs.__express);
// app.use(express.bodyParser());
app.use(express.static('bootstrap'));

app.listen(3003);

app.get('/',function(request,response){
	response.render('articleTemplate',{title:'my blog!',entries : blog.getBlogEntries()});
	//response.render('helloexpress');
});
app.get('/blog',function(request,response){
	var blg = blog.getBlogEntries()[request.query.id-1];	
	console.log(blg);
	response.render('blog',{blog:blg});
});
app.get('/articleTemplate',function(request,response){
	var entries = blog.getBlogEntries();
	response.render('articleTemplate',{title:'my blog!','entries':entries});;
});

