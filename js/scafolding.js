$(function(){
	var template = "function {{className}}(){\n{{properties}}\n}",
		className ='',
		propertiesArray = [],
		propertyNamesArray = [],
		propertyValuesArray = [],
		index=0,
		propertyType='string',
		propertyTemplate = '<div>'+
				'<label>Property Name:</label>'+
				'<input type="text" name="propertyName1" class="property" id="PropertyName1" index="{{index}}">'+
				'<input type="radio" name="{{index}}" value="function" class="propertyTypeRadio">Function'+
				'<input type="radio" name="{{index}}" value="string" class="propertyTypeRadio" checked>String'+
				'<input type="radio" name="{{index}}" value="object" class="propertyTypeRadio">Object'+
				'<button class="deleteProperty">X</button>'+
			'</div>';
	$('#privateProperties').on('click','.propertyTypeRadio',function(event){
		var index = parseInt($(this).siblings('input[type="text"]').attr('index'));
		/*propertiesArray[index] = propertiesArray[index].replace(/{{value}}/,
			constructPropertyType($(this).attr('value')));*/
		propertyValuesArray[index]=constructPropertyType($(this).attr('value'));
		generatePropertyString(index);
		
	});
	$('#className').on('keypress',function(event){
		className = $(this).val() + String.fromCharCode(event.keyCode);
		constructClass();
	});
	$('body').on('keypress','.property',function(event){
		var index = $(this).attr('index');
		/*var property = getPropertyTemplate().replace(/{{propertyName}}/,$(this).val() + String.fromCharCode(event.keyCode));
		propertiesArray[$(this).attr('index')] = property;*/
		// properties = getPropertyTemplate().replace(/{{\w*}}/,$(this).val() + String.fromCharCode(event.keyCode));
		//$('#outputArea').text(template.replace(/{{properties}}/,properties));
		propertyNamesArray[index] = $(this).val() + String.fromCharCode(event.keyCode);
		propertyValuesArray[index] = constructPropertyType('string');
		generatePropertyString(index);
		
	});
	function getPropertyTemplate(){
		return "this.{{propertyName}}={{value}}";
	}
	$('#addProperty').on('click',function(){
		$('#privateProperties').append(propertyTemplate.replace(/{{index}}/ig,index));
		index++;

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