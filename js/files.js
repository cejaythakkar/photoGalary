var path = require('path'),
	fs = require('fs');

module.exports = function(){
	
	function F(){};

	F.prototype = {
		getFileName : function(fileName){
			return fileName.replace(/\.\w{3}/,"")
		},
		getDirectoryContents : function(){
			var path = './public/images',
				commonString = 'http://localhost:3000/images/',
			 	folderContent = fs.readdirSync(path),
			 	content = [];
			for(var i = 0 ; i < folderContent.length ; i++){
				(fs.statSync(path + '/' + folderContent[i]).isFile()) ?
					content.push({
						fileFolderName : this.getFileName(folderContent[i]),
						fileFolderPath : commonString + folderContent[i]
					}) : 
					content.push({
						fileFolderPath : 'http://localhost:3000/systemImages/icons/folder.png',
						fileFolderName : folderContent[i],
					});
			}
			return content;
		}
	}
	
	return new F();
}()