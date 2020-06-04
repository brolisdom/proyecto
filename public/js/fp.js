new fullpage('.fullpage', {
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    navigation: true,
	navigationPosition: 'right',
	navigationTooltips: ['Inicio', 'Categorias', 'Premios', 'Fases de inscripción'],
	showActiveTooltip: false,
});
// HIDE NAVIGATION IN OTHERS TABS
document.getElementById("fp-nav").style.display="none";
$(document).ready(function(){
	$('ul.tabs li a').click(function(){
		var elm = document.getElementById('a_tournament');
        if(!(elm.classList.contains('active'))) {
            document.getElementById("fp-nav").style.display="none";
        }
        else if (elm.classList.contains('active')) {
            document.getElementById("fp-nav").style.display="block";
        }
		return false;
	});
});