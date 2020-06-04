//const select = document.querySelector('#select');
//const options = document.querySelector('#options');
//const contentSelect = document.querySelector('#select .content_select');
//const hiddenInput = document.querySelector('#select-1');
//
//document.querySelectorAll('#options > .option').forEach((option) => {
//    option.addEventListener('click', (e) => {
//        e.preventDefault();
//        contentSelect.innerHTML = e.currentTarget.innerHTML;
//        select.classList.toggle('active');
//        options.classList.toggle('active');
//        hiddenInput.value = e.currentTarget.querySelector('.name').innerText;
//        console.log(e.currentTarget.querySelector('.name').innerText);
//    });
//});
//
//select.addEventListener('click', () => {
//    options.classList.toggle('active');
//});

$(document).ready(function(){
    $('select').formSelect();
    $('.collapsible').collapsible();
  });