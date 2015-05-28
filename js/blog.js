var blogs = [{'id':1,'title':'hello world','body':'this is my first blog using emmet'},
				{'id':2,'title':'dummy content','body':'there is a dummy content in the post'},
				{'id':3,'title':'lorem ipsom','body':'lorem ipsom dolor set emmet'},
				{'id':4,'title':'status of pws','body':'pws i down'}];

exports.getBlogEntries = function(){
	return blogs;
};

exports.getBlog = function(id){
	return blogs[i];
};