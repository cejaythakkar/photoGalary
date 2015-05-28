module.exports = function(request,response,next){
	var start = +new Date(),
		stream = process.stdout,
		url = request.url,
		method = request.method;

		response.on('finish',function(){
			var duration = +new Date() - start,
				message = '\n' + method + ' to ' + url + ' took ' + duration + ' ms.';
			stream.write(message);
		});
	next();
} 