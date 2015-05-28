$(function(){
	var alreadyClickedTimeout = undefined,
		alreadyClicked = false;
		
	var commonUtil = (function(){
		var instance = undefined;
		var func = function(){};
		var privateMethods = {
			_bindCustomEvents : function(options){
				$(this).bind(options.eventType,options.callback);
			}
		};
		
		func.prototype = {
			bindCustomEvent : function(options){
				privateMethods._bindCustomEvents.call(options.jqObject,{eventType:options.eventType,callback:options.callback});
			}
		};
		
		return {
			getInstance : function(){
				return (instance) || new func();
			}
		};
	})();
	
	var singleDoubleClick = function(){
		$(this).trigger('custom-events.singleDoubleClick');
	};
	var commonUtilInstance = commonUtil.getInstance();
	commonUtilInstance.bindCustomEvent({jqObject:$('#doubleClickTest'),eventType:'custom-events.singleDoubleClick',callback:function(){
			var self = this;
			if(alreadyClicked){
				alreadyClicked = false;
				clearTimeout(alreadyClickedTimeout);
				$(self).text('double clicked');
			}else{
				alreadyClicked = true;
				alreadyClickedTimeout = setTimeout(function(){
					alreadyClicked = false;
					$(self).text('single clicked');
				},300);
			}
	}});
	commonUtilInstance.bindCustomEvent({jqObject:$('#doubleClickTest'),eventType:'click',callback:singleDoubleClick});
});
	
