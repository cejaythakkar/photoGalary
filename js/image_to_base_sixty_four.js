var fs = require('fs'),
encoding = require('./image_to_base_sixty_four')
fs.readFile('anubis1.jpg',function(err,data){
	err ? function(){
		console.log|('error while reading a fil1!!!');
	}() : function(){
		console.log(encoding.convertToBaseSixtyFour(data));
	}();
});
exports.convertToBaseSixtyFour = function(buffer){
	return 'data:image/jpg;base64,' + buffer.toString('base64');
}