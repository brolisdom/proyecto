$(document).ready(function(){
	$('ul.tabs li a:first').addClass('active');
	$('.seccions article').hide();
	$('.seccions article:first').show();

	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.seccions article').hide();

		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});
});