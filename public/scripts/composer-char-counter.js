$(document).ready(function(){

const MAXCHAR = 140;

function charCount(element){
  //console.log($(element).val())
  let count = MAXCHAR - $(element).val().length;
    let $counterElement = $(element).siblings(".counter");
    $counterElement.removeClass("max-characters");
    if(count < 0){
      $counterElement.addClass("max-characters");
    }
  $counterElement.text(count);
}


$('.new-tweet form textarea').on('keyup', function(event){
    charCount(this);
});

$('.new-tweet form textarea').on('cut', function(event){
  console.log($(this))
  charCount(this);
});

});