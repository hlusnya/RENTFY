
	
$(function(){

    $.mask.definitions['~']='[78]';
	$(".phone-mask").mask("~(999)999-99-99");
	$(".card-mask").mask("9999 9999 9999 9999");
	$(".date-card-mask").mask("99");
	$(".cvc-mask").mask("999");

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


	$('.input-place .input').focus(function () {
	    $(this).next('.text_place').hide();
		
	});
	$('.input-place .input').blur(function () {
	    if ($(this).val().trim() === '') {
			$(this).next('.text_place').show();
	    }
	});
	$('.input-place .input').each(function( index ) {
	  	if ($(this).val().trim() === '') {
	        $(this).next('.text_place').show();
	    }
	    else {
			$(this).next('.text_place').hide();
		}
	});

	$(".pass-view").on("click", function (e) {
		if ($(this).hasClass('view')) {
			$(this).prev().attr('type', 'password');
		} else {
			$(this).prev().attr('type', 'text');
		}
		$(this).toggleClass('view')
	});
	

	/**************************************************************
	ПОПАПЫ
	**************************************************************/
	$('body').on('click', '.btn-popup', function(e){
        e.preventDefault();
		$('.popup').fadeOut(800);

        let popup = $('.popup[data-popup="'+$(this).attr('data-popup')+'"]');
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
		let val = parseInt($(counter).find('.counter-value').text());
		if (Number.isNaN(val)) val = 0;
		val++;
		$(counter).find('.counter-value').text(val);
		$(counter).find('input').val( val );
		$(counter).parents('.counter-fix').prev().val(val);
	});	
	$('.counter-minus').click(function () {
		let counter = $(this).parents('.counter');
		let val = parseInt($(counter).find('.counter-value').text());
		if (Number.isNaN(val)) val = 0;
		val--; 
		val = val < 1 ? 1 : val;
		$(counter).find('.counter-value').text(val);
		$(counter).find('input').val(val);
		$(counter).parents('.counter-fix').prev().val(val);
	});
	
	$('body').on('focus', '.input-counter', function(e){
        e.preventDefault();
        $(this).next().fadeIn();
	})
	$(document).mouseup( function(e){ // событие клика по веб-документу
		var div = $( ".counter-fix" ); // тут указываем ID элемента
		if ( !div.is(e.target) // если клик был не по нашему блоку
		    && div.has(e.target).length === 0
			&& !$('.input-counter').is(e.target) ) { // и не по его дочерним элементам
			div.hide(); // скрываем его
		}
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

		if (step == count_step) {
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


	var main_cl = 'addap__photos-item--main'; 
	var main_cont = '<div class="addap__photos-item__main">\
						Главное фото\
						<div class="hint__box">\
							<img src="images/icons/hint-i-white.svg" alt="">\
							<div class="hint">Фотография, которая будет <br>\
								всегда отображаться первой</div>\
						</div>\
					</div>\
				</div>';

	//Добавление фото
    $("body").on('change', '.add-photos-apart [type=file]', function (event)
    {
		
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

							let main_cl_c = '', main_cont_c = '';
							if ($('.addap-photo-item').length == 0) {
								main_cl_c = main_cl; 
								main_cont_c = main_cont;
							}
							
							$('.addap-photos-items').append('\
									<div class="addap__photos-item '+main_cl_c+' addap-photo-item">\
										<a href="#" class="addap__photos-item__remove hint__box addap-photo-item-remove">\
											<div class="hint">Удалить фото</div>\
										</a>\
										<div class="addap__photos-item__wrap"><img src="'+compressedData+'" alt=""></div>'
									+  main_cont_c
								);
							
                        }),
                        (img.onerror = function (err) {
                            reject(err);
                        }),
                        (img.src = dataUri);
                    }
                    reader.readAsDataURL(input.files[i]);

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

	//Добавление фото
    $("body").on('click', '.addap-photo-item-remove', function (e) {
        e.preventDefault();

		let main_cl_c = '', main_cont_c = '';
		if ($(this).parents('.addap-photo-item').index() == 0) {
			main_cl_c = main_cl; 
			main_cont_c = main_cont;
		}
		$(this).parents('.addap-photo-item').remove();
		$('.addap-photo-item:first').addClass(main_cl_c).append(main_cont_c);
	})

	
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
		// $(row).find('input').val( $(row).find('input').attr('data-val') );
	})	
	$('body').on('submit', '.settings-row-form', function(e){
        e.preventDefault();
		
        $('.popup[data-popup="change_profile_data"]').fadeIn(500); 
		$('body').addClass('noscroll');


        let row = $(this).parents('.settings-row');
		$(row).removeClass('changed');
		$(row).find('.settings-row-form').fadeOut(100);
		$(row).find('.settings-row-info').fadeIn(300);
		

		// let input =  $(row).find('input');
		// $(row).find('.settings-row-value').text( $(input).val() );
		// $(input).attr('data-val', $(input).val() );
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

	
	/**************************************************************
	Избранное
	**************************************************************/	
	$('body').on('click', '.favour-link', function(e){
        e.preventDefault();
		let favour = $(this).parents('.favour');
        $(favour).toggleClass('active');
		$(favour).removeClass('hover'); 
		if ($(favour).hasClass('active')) {
			$(favour).find('.favour-thank').fadeIn(200);
			setInterval(function(){
				$(favour).find('.favour-thank').fadeOut(200);
			}, 3000);
		}
	})	
	$(".favour-link").mouseover(function() {
		let favour = $(this).parents('.favour');
		$(favour).addClass('hover');    
	})
	.mouseout(function(){       
		let favour = $(this).parents('.favour');    
		$(favour).removeClass('hover');    
	});

	$('body').on('click', '.favour-add', function(e){
        e.preventDefault();
		let favour = $(this);
        $(favour).toggleClass('active');
	})	
	

	
	/**************************************************************
	Удаление строки в таблице
	**************************************************************/	
	$('body').on('click', '.link-remove', function(e){
        e.preventDefault();
		$('.popup-remove').fadeIn(800); 
		$('body').addClass('noscroll');
	})	
	
		
	/**************************************************************
	Скролл стилизация
	**************************************************************/	
	$(".content-scroll").mCustomScrollbar({
        scrollButtons:{
            enable:false
        },
        scrollInertia:50,
        horizontalScroll:false,
        autoDraggerLength:true,
        // autoHideScrollbar:true,
        advanced:{
            autoScrollOnFocus: false,autoExpandHorizontalScroll:true,updateOnContentResize:true}
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
