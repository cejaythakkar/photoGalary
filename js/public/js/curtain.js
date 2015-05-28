$(function(){
		
		var curtainComponent = (function(){
			var init = function (){
				$('<div>',{id:"curtain"}).appendTo('body');
			};
			return {
				init : init,
				flag : false
			};
		})();
		
		curtainComponent.init();
		$('.templateAnchors').on('mouseenter',function(evt){
				evt.stopPropagation();
				var $this = $(this).children('div.templates'),
				heightWidth = {height:$this.outerHeight() + 'px',
								width:$this.outerWidth() + 'px'},
				offset = $this.offset(),
				cords = {x:offset.left,y:offset.top};
			
				$('#curtain').css({'top':cords.y,
								'left':cords.x,
								'height':heightWidth.height,
								'width':heightWidth.width})
							.addClass('curtain').removeClass('curtain-remove');
		});
		$('body').off('mouseleave').on('mouseleave','#curtain',function(){
          $(this).addClass('curtain-remove').removeClass('curtain');
		}).on('mousedown','#curtain',function(){
			$(this).addClass('curtain-pressed').removeClass('curtain');
		}).on('mouseup','#curtain',function(){
			$(this).addClass('curtain').removeClass('curtain-pressed');
		});
	});