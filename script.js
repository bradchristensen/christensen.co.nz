$('document').ready(function(){
	resize();

	$('a').click(function(){
		if (this.hash.length > 1) {
			$.scrollTo (this.hash, 500);
			return false;
		}
	});

	$(".portfolio a").fancybox({
		openEffect: 'elastic',
		closeEffect: 'elastic'
	});

	$(window).resize(resize);

	$(window).scroll(function () {
		var st = $(document).scrollTop();

		var i = (st + $(window).height() / 3) / $(window).height();
		$('#map li').removeClass('current');
		$('#map li').eq(i).addClass('current');

		$('.slide').each(function() {
			var offset = (st-$(this).offset().top)/10;
			
			$(this).css('backgroundPosition', 'center ' + offset + 'px');
			$('.wrapper', this).css('opacity', 1.2-(offset/100));
		})
	});
});

var resize = function() {
	$('.slide').css('height', '' + $(window).height() + 'px');
}