$(document).ready(function(){

	if (typeof(homeslider_speed) == 'undefined')
		homeslider_speed = 1000;
	if (typeof(homeslider_pause) == 'undefined')
		homeslider_pause = 3000;
	if (typeof(homeslider_loop) == 'undefined')
		homeslider_loop = true;
    if (typeof(homeslider_width) == 'undefined')
        homeslider_width = 1170;


	if (!!$.prototype.bxSlider)
		$('#homeslider').bxSlider({
			mode:'horizontal',
			useCSS: false,
			maxSlides: 1,
			speed: 1000,
			easing: 'easeOutQuint',	
			slideWidth: homeslider_width,
			infiniteLoop: homeslider_loop,
			hideControlOnEnd: true,
			pager: false,
			autoHover: true,
			autoControls: true,
			auto: homeslider_loop,
			speed: homeslider_speed,
			pause: homeslider_pause,
			controls: true,
			startText:'',
			stopText:'',
			pagerCustom: '',
	   onSliderLoad: function() {
		$('.homeslider-description').fadeIn(800);				
			},	
						
		onSlideBefore: function() {
		$('.homeslider-description').fadeOut(200);	
			},
		onSlideAfter: function() {
		$('.homeslider-description').fadeIn(300);
			
			}
			
		});

    $('.homeslider-description').click(function () {
        window.location.href = $(this).prev('a').prop('href');
    });
})




