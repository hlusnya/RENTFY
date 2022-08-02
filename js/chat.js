function chatScrollBottom() {
    setTimeout(function(){
        $('#chat_messages').mCustomScrollbar('scrollTo','bottom');
    }, 100);
} 
	
$(function(){
    $(".chat-scroll").mCustomScrollbar({
        scrollButtons:{
            enable:false
        },
        scrollInertia:50,
        horizontalScroll:false,
        autoDraggerLength:true,
        autoHideScrollbar:true,
        advanced:{
            autoScrollOnFocus: false,autoExpandHorizontalScroll:true,updateOnContentResize:true}
    });   
    chatScrollBottom();


    $('.chat-users li').click(function(e){
		e.preventDefault();
        $('#chat_messages .mCSB_container').html( $('#loader-start').html() );
        $('.chat').addClass('chat-msg-mob');


		$('.chat-users li').removeClass('active');
        $(this).addClass('active');
        
        let text = $('.text-chat[data-id='+$(this).attr('data-id')+']').html();

        //$('#chat_messages .mCSB_container').html( $('#loader-start').html() ).delay(3000).html(text);
        $('#chat_messages .mCSB_container').html(text);
        chatScrollBottom();
        
	})
    $('#chat-returnuser').click(function(e){
		e.preventDefault();
        $('.chat').removeClass('chat-msg-mob');
	})
    

    $('#chat_form').submit(function(e){
		//e.preventDefault();
        // var text = $.trim( $('#chat_form [name="text"]').val() );
        // if (text === '') return false;
        
        // let Data = new Date();

        // $('#chat_messages .mCSB_container').prepend('\
        //     <div class="chat__messages-item chat__messages-item-right">\
        //         <div class="chat__user chat__messages-item__user">\
        //             <div class="chat__user-photo chat__photo"><img src="images/photo1.jpg" alt=""></div>\
        //             <div class="chat__user-name">Иван Петров 145 <span class="chat__user-date">'+Data.getHours()+':'+Data.getMinutes()+'</span></div>\
        //         </div>\
        //         <div class="chat__messages-item__text">'+
        //            text
        //         +'</div>\
        //     </div>\
        // ');
        // $('#chat_form [name="text"]').val('');
        // chatScrollBottom();

        // return false;
	})
});
