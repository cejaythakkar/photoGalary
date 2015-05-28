var fs = require('fs');

fs.readFile('666.txt',function(err,data){
	err ? function(){
		console.log(err);
	}() : function(){
		console.log(data.toString());
	}();
	console.log('program ended!!!');
});

