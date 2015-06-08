$(function(){
	var template = "function {{className}}(){\n{{properties}}\n}",
		className ='',
		propertiesArray = [],
		propertyNamesArray = [],
		propertyValuesArray = [],
		propertyType='string';

	var commonUtils = (function(){
		return {
			index : 0,
			observerList : [],
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
				this.observerList[this.index] = {propertyName : '',propertyValue : ''};
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
			}
		}
	})();

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
		propertyValuesArray[index]=constructPropertyType($(this).attr('value'));
		//generatePropertyString(index);
		ele.get(0).notify(index,'propertyValue',$(this).val())
	});
	$('#className').on('keypress',function(event){
		className = $(this).val() + String.fromCharCode(event.keyCode);
		constructClass();
	});
	$('#privateProperties').on('keypress','.property',function(event){
		var index = $(this).attr('index');
		propertyNamesArray[index] = $(this).val() + String.fromCharCode(event.keyCode);
		propertyValuesArray[index] = constructPropertyType('string');
		//generatePropertyString(index);
		$(this).get(0).notify(index,'propertyName',$(this).val() + String.fromCharCode(event.keyCode))
	});
	/*function getPropertyTemplate(){
		return "this.{{propertyName}}={{value}}";
	}*/
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
			data:{'clas':$(outputArea).val()},
			success:function(){
				console.log('success');
			},
			error:function(){
				console.log('error adasd');
			}
		});
	});
	function constructPropertyType(propertyType){
		switch(propertyType){
			case 'function': return 'function(){}'
			case 'object' : return '{}'
			default : return '""'
		}
	}
	function generatePropertyString(index){
		var property = getPropertyTemplate().replace(/{{propertyName}}/,
			propertyNamesArray[index]).replace(/{{value}}/,propertyValuesArray[index]);
		propertiesArray[index] = property;
		constructClass();
	}
	function constructClass(){
		var properties = (propertiesArray.length>1)? propertiesArray.join(',') : propertiesArray.toString();
		properties = properties.replace(',',',\n');
		
		$('#outputArea').text(
			template.replace(/{{className}}/,className)
			.replace(/{{properties}}/,properties)
			);	
	}
});
