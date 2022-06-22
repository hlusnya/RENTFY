
	
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
		$('.datepicker-to').datepicker( "option", "minDate", e.target.value );
	});
	$(".datepicker-to").on("change", function (e) {
		$('.datepicker-from').datepicker( "option", "maxDate", e.target.value );
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