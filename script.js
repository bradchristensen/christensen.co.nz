$(document).ready(function(){
	$('a').click(function(){
		if (this.hash.length > 1) {
			$.scrollTo (this.hash, 500);
			return false;
		}
	});

	$(window).scroll(function() {
		var st = $(document).scrollTop();

		$('.slide').each(function(i) {
			var offset = st - $(this).offset().top;
			
			if ( offset + $(window).height()/2 > 0 ) {
				$('#map li').removeClass('current');
				$('#map li').eq(i).addClass('current');
			}
		});
	});
});