var animate = 1;
$(document).ready(function(){

	$("[class *= optional]").click(event => {
		if ($(event.target).hasClass('optional-show'))
		{
			$($(event.target).nextAll('div')[0]).slideUp(1000, () => {
				$(event.target).removeClass('optional-show'); 
				$(event.target).addClass('optional-hide');
			});
		}
		else
		{
			$($(event.target).nextAll('div')[0]).slideDown(1000, () => {
				$(event.target).removeClass('optional-hide');
				$(event.target).addClass('optional-show');
			});
		}
	})

	$(".optional-hide").each(function() {
		$($(this).nextAll('div')[0]).slideUp(0);
	});
});