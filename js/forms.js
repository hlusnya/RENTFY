$(document).ready(function(){

	$('body').find('.form-valid').each(function() {
		$(this).validate({
			errorPlacement: function(error, element) {},
			debug: false,
			rules: {
				'phone':{
					required: true,	
					phones: true,				
				}
			},
			submitHandler: function(form) {
				sendMail(form, '');
			
			}
		});
	});
	
	jQuery.validator.addMethod(
		"phones", 
		function(value, element) {
			return this.optional(element) || /^[78]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{2}\-[0-9]{2}/.test(value);
		}, 
		"������� ������ �������"
	);  
	
	
	function sendMail(form, message) {   
	
		var ya = $(form).attr('data-push');
		var formData = new FormData($(form)[0]);
		var thank = $(form).attr('data-thank') !== undefined ? $(form).attr('data-thank') : 'thank';
	
		$.ajax({
			type: "POST",
			url: 'send.php',
			contentType: false,
			processData: false,
			data:  formData, 
			beforeSend: function() {
				$('.popup').fadeOut(300);
				$('.popup[data-popup="'+thank+'"]').fadeIn(800);				
			},
			success: function(html) {	
				//dataLayer.push({'event': 'lead'});			
			}
		});		
	}
	
	
		
});
		
	