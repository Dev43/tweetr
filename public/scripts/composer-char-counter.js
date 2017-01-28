$(document).ready(function(){

const MAXCHAR = 140;

function charCount(element){
  //console.log($(element).val())
  let count = MAXCHAR - element.val().length;
    let counterElement = element.siblings(".counter");
    counterElement.removeClass("max-characters");
    if(count < 0){
      counterElement.addClass("max-characters");
    }
  counterElement.text(count);
}

$('.new-tweet form').on('submit', function(event){
  charCount($('.new-tweet form textarea'));
})
$('.new-tweet form textarea').on('keyup', function(event){
  charCount($(this));
});

$('.new-tweet form textarea').on('cut', function(event){
  charCount($(this));
});

});