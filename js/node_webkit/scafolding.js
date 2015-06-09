$(function(){

	var commonUtils = (function(){
		return {
			index : 0,
			className:'',
			observerList : [],
			template : "function {{className}}(){\n{{properties}}\n}",
			propertyTemplate : '<div>'+
					'<label>Property Name:</label>'+
					'<input type="text" name="propertyName1" class="property" id="PropertyName1" index="{{index}}">'+
					'<input type="radio" name="{{index}}" value="function" class="propertyTypeRadio">Function'+
					'<input type="radio" name="{{index}}" value="string" class="propertyTypeRadio" checked>String'+
					'<input type="radio" name="{{index}}" value="object" class="propertyTypeRadio">Object'+
					'<button class="deleteProperty">X</button>'+
				'</div>',
			addPropertyRow : function(){
				$('#privateProperties').append(this.propertyTemplate.replace(/{{index}}/ig,this.index));
				this.addProperty();
				this.index++;
			},
			addProperty : function(){
				this.observerList[this.index] = {propertyName : '',propertyValue : '""'};
			},
			inherits : function(base , extension){
				for(var property in base){
					extension[property] = base[property];
				}
			},
			getIndex : function(){
				return this.index;
			},
			getPropertyValue : function(valueType){
				switch(valueType){
					case "function" : return "function(){}"
					case "object" : return "{}"
					case "string" : return "''"
				}
			},
			setClassName : function(className){
				this.className = className;
			},
			constructClass : function(){
				var propertyArray = [],property;
				for(var i = 0;i < this.observerList.length;i++){
					property = this.observerList[i];
					propertyArray[i] = "this." + property['propertyName'] + ' = ' + property['propertyValue'];
				}
				var newTemplate = this.template.replace(/{{className}}/,this.className).replace(/{{properties}}/,propertyArray.join(','));
				$('#outputArea').text(newTemplate);
			},
			loadPropertyFiles: function(){
				$.ajax({
					type : 'GET',
					url : 'http://localhost:3000/propertyFiles/',
					crossDomain:true,
					dataType : 'json',
					success : function(data){
						for(var i = 0; i < data.files.length ; i++){
							$('#propertyFileList > ul').append('<li><a><span>'+ data.files[i] +'</span></a></li>');
						}
					},
					error : function(){
						console.log('error')
					}
				});
			}
		}
	})();

	commonUtils.loadPropertyFiles();

	var subject = function(){};

	subject.prototype = {
		notify : function(index,notificationType,value){
			switch(notificationType){
				case 'propertyName' : 
					commonUtils.observerList[index]['propertyName'] = value;
					break;
				case 'propertyValue' : 
					commonUtils.observerList[index]['propertyValue'] = commonUtils.getPropertyValue(value);
					break;
			}
		}
	};

	$('#privateProperties').on('click','.propertyTypeRadio',function(event){
		var index = parseInt($(this).siblings('input[type="text"]').attr('index'));
		var ele = $(this).siblings('input[type="text"]');
		ele.get(0).notify(index,'propertyValue',$(this).val());
		commonUtils.constructClass();
	});

	$('#propertyFileListUl').on('click','li',function(){
		var self = this;
		$.ajax({
			type : 'GET',
			url : 'http://localhost:3000/propertyFiles?file=' + $(self).find('span').text(),
			dataType : 'text',
			data : '',
			crossDomain : true,
			success : function(data){
				console.log(data);
			},
			error : function(){
				console.log('error');
			}
		});
	});

	$('#className').on('keypress',function(event){
		commonUtils.setClassName($(this).val() + String.fromCharCode(event.keyCode));
		commonUtils.constructClass();
	});

	$('#privateProperties').on('keypress','.property',function(event){
		var index = $(this).attr('index');
		$(this).get(0).notify(index,'propertyName',$(this).val() + String.fromCharCode(event.keyCode));
		commonUtils.constructClass();
	});

	$('#addProperty').on('click',function(){
		var index = commonUtils.getIndex();
		commonUtils.addPropertyRow();
		var extension = $('input[index="'+ index +'"]').get(0);
		commonUtils.inherits(new subject,extension);
	});

	$('button#submit').on('click',function(event){
		$.ajax({
			type:'POST',
			url:'http://localhost:3000/createFile/',
			crossDomain:true,
			dataType:'text',
			data:{'class':$(outputArea).val(),'className' : commonUtils.className,'path' : $('#save').val()},
			success:function(){
				console.log('success');
			},
			error:function(){
				console.log('error adasd');
			}
		});
	});
});
