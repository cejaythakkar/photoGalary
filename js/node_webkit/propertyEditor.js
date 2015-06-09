var fs = require('fs'),
path = require('path');

var direcortyUtil = (function(){
	return {
		files : [],
		getPropertyFiles : function(){
			console.log('getPropertyFiles');
			var self = this;
			fs.readdir(path.normalize('C:\\ABOS\\Adoddle\\code\\src\\content'),function(error,data){
				if(error){
					console.log(error);
					return;
				}
				self.files = data;
			});			
		}
	}
})();

module.exports = direcortyUtil;