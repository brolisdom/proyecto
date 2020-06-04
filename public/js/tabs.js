$(document).ready(function(){
	$('.sections article#tab2').hide();
    $('.sections article#tab3').hide();
	$('.seccions article:first').show();

	$('ul.tabs li a').click(function(){
		$('ul.tabs li a').removeClass('active');
		$(this).addClass('active');
		$('.sections article').hide();
        
		var activeTab = $(this).attr('href');
		$(activeTab).show();
		return false;
	});
});