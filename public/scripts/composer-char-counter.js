$(document).ready(function(){

const MAXCHAR = 140;
$('.new-tweet form textarea').on('keyup', function(event){
    let count = $(this).val().length;
    let counterElement = $(this).siblings(".counter");
    counterElement.removeClass("max-characters");
    if(count > MAXCHAR){
      count = MAXCHAR - count;
      counterElement.addClass("max-characters");
    }

   counterElement[0].innerText = count;
})

});