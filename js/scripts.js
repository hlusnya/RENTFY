
	
$(function(){

    $.mask.definitions['~']='[78]';
	$(".phone-mask").mask("~(999)999-99-99");

	$('.datepicker-from').datepicker({
		minDate: 0,   
		format: 'dd/mm/yyyy'
	});
	$('.datepicker-to').datepicker({
		minDate: 0,   
		format: 'dd/mm/yyyy',
		useCurrent: false
	});
	$(".datepicker-from").on("change", function (e) {
		$(this).parents('.datepicker-block').find('.datepicker-to').datepicker( "option", "minDate", e.target.value );
	});
	$(".datepicker-to").on("change", function (e) {
		$(this).parents('.datepicker-block').find('.datepicker-from').datepicker( "option", "maxDate", e.target.value );
	});




	/**************************************************************
	ПОПАПЫ
	**************************************************************/
	$('body').on('click', '.btn-popup', function(e){
        e.preventDefault();
        let popup = $('.popup[data-popup="'+$(this).attr('data-popup')+'"]');
        
        if ($(this).attr('data-push') != '')
        	$(popup).find('form').attr('data-push', $(this).attr('data-push'));
        $(popup).fadeIn(800); 
		$('body').addClass('noscroll');
	})		
	$('.popup-close').click(function(e){
		e.preventDefault();
		$('.popup').fadeOut(500);
		$('body').removeClass('noscroll');
	})

	/**************************************************************
	меню
	**************************************************************/
	$('#menu_toggler').click(function(e){
		e.preventDefault();
		$(this).toggleClass('active');
		$('.header__navfix').toggleClass('active');
		$('body').toggleClass('noscroll');
	})
	$('.close-menu').click(function(e){
		e.preventDefault();
		$('#menu_toggler').removeClass('active');
		$('.header__navfix').removeClass('active');
		$('body').removeClass('noscroll');
	})

	/**************************************************************
	Интуп счетчик
	**************************************************************/
	$('.counter-plus').click(function () {
		let counter = $(this).parents('.counter');
		let val = parseInt($(counter).find('input').val());
		if (Number.isNaN(val)) val = 0;
		val++;
		$(counter).find('input').val( val );
	});	
	$('.counter-minus').click(function () {
		let counter = $(this).parents('.counter');
		let val = parseInt($(counter).find('input').val());
		if (Number.isNaN(val)) val = 0;
		val--; 
		val = val < 1 ? 1 : val;
		$(counter).find('input').val(val);
	});

	/**************************************************************
	СЛАЙДЕР ФОТОК В КАРТОЧКЕ ЖИЛЬЯ
	**************************************************************/
	$(".housing-photo-slider").slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplaySpeed: 8000,
        speed: 300,
        slidesToShow: 1
    });


	
	/**************************************************************
	Табы в регистрации
	**************************************************************/
	$('.auth-navt-link').click(function (e) {
		e.preventDefault();
		$('.auth-navt-link').removeClass('active')
		$(this).addClass('active');
		$('.auth-tab').fadeOut(0);
		$('.auth-tab[data-tab='+$(this).attr('data-tab')+']').fadeIn(0);
	});	


	/**************************************************************
	Добавление апартоментов
	**************************************************************/
	var count_step = $('.addap-step').length+1;
	var percent_progr = (100/count_step).toFixed();
	$('#progress_addap_percent').css('width', percent_progr+'%');	

	//Шаг вперёд
	$('.addap-next').click(function(e){
		e.preventDefault();

		let step = $('.addap-step.active').index()+1,
			curr_step = $('.addap-step.active');

		if ( $(window).outerWidth() < 768 ) {
			$('html, body').stop().animate({
	        	scrollTop: $('.addap').offset().top-100
	        }, 700,'easeInOutExpo');
		}

		$(curr_step).removeClass('active').fadeOut(100).next('.addap-step').addClass('active').fadeIn(300);
		step++;
		percent_progr = (100/count_step*step).toFixed();
		$('#progress_addap_percent').css('width', percent_progr+'%');

		if (step == (count_step-1)) {
			$('.addap-next').hide();
			$('.addap-finish').show();
		}

	});
	//Шаг назад
	$('.addap-prev').click(function(e){
		e.preventDefault();		

		
		let step = $('.addap-step.active').index()+1,
			curr_step = $('.addap-step.active');

		if (step == 1) return;	
		
		if ( $(window).outerWidth() < 768 ) {
			$('html, body').stop().animate({
	        	scrollTop: $('.addap').offset().top-100
	        }, 700,'easeInOutExpo');
		}

		$(curr_step).removeClass('active').fadeOut(100).prev('.addap-step').addClass('active').fadeIn(300);
		step--;
		percent_progr = (100/count_step*step).toFixed();
		$('#progress_addap_percent').css('width', percent_progr+'%');	

		$('.addap-next').show();
		$('.addap-finish').hide();
	});	
	//Последний шаг перед предпросмотром
	$('.addap-finish').click(function(e){
		e.preventDefault();

		location.href = 'add-preview.html';
	});	
	//Сохранить шаги
	$('.addap-save').click(function(e){
		e.preventDefault();

		
	});		
	//Публикация
	$('.addap-public').click(function(e){
		e.preventDefault();

		location.href = 'add-thank.html';
	});


	//Добавление фото
    $("body").on('change', '.add-photos-apart [type=file]', function (event)
    {
		$('.addap-photo-item').show();
        var input = $(this)[0];
        if (input.files && input.files[0])
        {
            if (input.files[0].type.match('image.*'))
            {
                var file = input.files[0];

                
                var filesAmount = input.files.length;
                for (i = 0; i < filesAmount; i++)
                {
					
                    var reader = new FileReader();
                    var numb = 0;
                    reader.onload = function (event)
                    {
                        var dataUri = event.target.result,
                            img = document.createElement("img");
                            const canvas = document.createElement("canvas");

                        (img.onload = function () {
                            let width = img.width,
                                height = img.height;
                            const maxHeight = 1500,
                                maxWidth = 1500;
                            var photoClass = "photoV";
                            width > height
                                ? (width > maxWidth && ((height = Math.round((height *= maxWidth / width))), (width = maxWidth)), (photoClass = "photoH"))
                                : (height > maxHeight && ((width = Math.round((width *= maxHeight / height))), (height = maxHeight)), (photoClass = "photoV")),
                                (canvas.width = width),
                                (canvas.height = height);
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, width, height);
                            let compressedData = canvas.toDataURL("image/jpeg", 0.7);

							$('.addap-photo-item.empty').eq(0).removeClass('empty').append('<img class="" src="' + compressedData + '" />');
							
                        }),
                        (img.onerror = function (err) {
                            reject(err);
                        }),
                        (img.src = dataUri);
                    }
                    reader.readAsDataURL(input.files[i]);

					
					addap_count_photo++;
					$('.addap-photos-count').text(addap_count_photo);
					if (addap_count_photo == addap_count_photo_max) return;
					if (addap_count_photo <= addap_count_photo_max-4) {
						$('.addap-photos-items').append('<div class="addap__photos-item empty  addap-photo-item"></div>');
					}
                }

            } else
            {
                console.log('Не изображение');
            }
        } else
        {
            console.log('Нет файла');
        }

    });

	
	/**************************************************************
	Профиль
	**************************************************************/	
	$('body').on('click', '.settings-row-edit', function(e){
        e.preventDefault();
        let row = $(this).parents('.settings-row');
		$(row).addClass('changed');
		$(row).find('.settings-row-info').fadeOut(100);
		$(row).find('.settings-row-form').fadeIn(300);
	})	
	$('body').on('click', '.settings-row-cancel', function(e){
        e.preventDefault();
        let row = $(this).parents('.settings-row');
		$(row).removeClass('changed');
		$(row).find('.settings-row-form').fadeOut(100);
		$(row).find('.settings-row-info').fadeIn(300);
		$(row).find('input').val( $(row).find('input').attr('data-val') );
	})	
	$('body').on('submit', '.settings-row-form', function(e){
        e.preventDefault();
        let row = $(this).parents('.settings-row');
		$(row).removeClass('changed');
		$(row).find('.settings-row-form').fadeOut(100);
		$(row).find('.settings-row-info').fadeIn(300);

		let input =  $(row).find('input');
		$(row).find('.settings-row-value').text( $(input).val() );
		$(input).attr('data-val', $(input).val() );
	})	

	$('body').on('click', '.settings-change-password', function(e){
        e.preventDefault();
        let row = $(this).parents('.settings-row');
		$(row).addClass('changed');
		$(row).find('.settings-form-password').fadeIn(300);
	})	
	$('body').on('submit', '.settings-form-password', function(e){
        e.preventDefault();
        let row = $(this).parents('.settings-row');
		$(row).removeClass('changed');
		$(row).find('.settings-form-password').fadeOut(100);
	})	

	
	/**************************************************************
	Деталка
	**************************************************************/	
	$(window).scroll(function(){
        var top_scroll = window.pageYOffset || document.documentElement.scrollTop;
		if ($('.apdetail-booking-sf').length > 0)
			if ( top_scroll > $('.apdetail-booking-sf').offset().top+$('.apdetail-booking-sf').height() )	{
				$('.apdetail-booking-fixed').fadeIn(300);
			}
			else {
				$('.apdetail-booking-fixed').fadeOut(300);
			}
    });

	/**************************************************************
	choosen
	**************************************************************/	
	$('body').on('click', '.show-date-choosen', function(e){
        e.preventDefault();
        $(this).parents('.wrap-date-choosen').find('.date-choosen').slideToggle();
	})		

	
	/**************************************************************
	Фильтр
	**************************************************************/	
	$('.filter-catalog-open').click(function(){
		if ($(this).hasClass('opened')) {
			$('#filter-catalog').fadeOut();
			$('body').removeClass('noscroll');
			$(this).removeClass('opened');
		} else {
			$('#filter-catalog').fadeIn();
			if ( $(window).outerWidth() < 768 )
				$('body').addClass('noscroll');
			$(this).addClass('opened');
		}
	})
	$('.filter-catalog-close').click(function(e){
        e.preventDefault();
		$('#filter-catalog').fadeOut();
		$('body').removeClass('noscroll');
		$('.filter-catalog-open').removeClass('opened');
	})

	

	
	/**************************************************************
	
	**************************************************************/	
	$('body').on('click', '.dashbord-item-more', function(e){
        e.preventDefault();
        $(this).parents('.dashbord-block').find('.dashbord-item').toggleClass('active');
		$(this).hide();
	})	

	
	
	/**************************************************************
	accord
	**************************************************************/
	// $(".accord-toggle").on("click", function (e) {
	// 	e.preventDefault();
		
	// 	$(this).parent('.accord').toggleClass('opened');
	// 	$(this).next('.accord-body').slideToggle();
	// });
	$(".accord").on("click", function (e) {
		e.preventDefault();
		
		$(this).toggleClass('opened');
		$(this).find('.accord-body').slideToggle();
	});

});


/**************************************************************
СТИЛИЗАЦИЯ ИНПУТОВ
**************************************************************/
(function($) {
	$(function() {
		$('.styler').styler({
			selectSearch: true
		});
	});
})(jQuery);