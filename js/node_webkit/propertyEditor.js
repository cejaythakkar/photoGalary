var fs = require('fs'),
path = require('path'),
stream = require('stream');

var direcortyUtil = (function(){
	return {
		files : [],
		keyArray : [],
		path : 'C:\\ABOS\\Adoddle\\code\\src\\content',
		getPropertyFiles : function(){
			// console.log('getPropertyFiles');
			var self = this,
				path = 'C:\\ABOS\\Adoddle\\code\\src\\content';

			fs.readdir(path,function(error,data){
				if(error){
					console.log(error);
					return;
				}
				for(var i = 0 ; i < data.length ; i++){
					var stat = fs.statSync(path + '\\' +data[i]);
					stat.isFile() && self.files.push(data[i]);
				}
			});			
		},
		getKeys : function(file){
			var path = this.path + '\\' + file,
			self = this,
			readStream = fs.createReadStream(path),
			data = '',
			keyArray = [];

			readStream.setEncoding('utf-8');

			readStream.on('data',function(chunk){
				data += chunk;
			});

			readStream.on('end',function(){
				// console.log(data);
				data.match(/[\w-]*=/g).forEach(function(value , key){
					// console.log('%s %d',value,key);
					// console.log(value.replace(/=/,''));
					keyArray[key] = value.replace(/=/,'');
				});
				self.keyArray = keyArray;
			});
		}
	}
})();

module.exports = direcortyUtil;