/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// START OF THE DOCUMENT
 $(document).ready(function(){


function loadTweets(){
  $.getJSON("/tweets", function(arrayOfTweets){
    renderTweets(arrayOfTweets)
  })
}

loadTweets();

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

function createTweetElement(tweet){

  let $tweet = $("<article>").addClass("tweet");
  let html = `<header>
              <img src=${tweet.user.avatars.small}>
              <div class="user-name">${escape(tweet.user.name)}</div>
              <div class="user-id">${escape(tweet.user.handle)}</div>
              </header>

              <div class="tweet-body">${escape(tweet.content.text)}</div>
              <footer>${timeSince(tweet.created_at)}
              <div id="flag" class="fa fa-flag"></div>
              <div id="share" class="fa fa-retweet"></div>
              <div id="like" class="fa fa-heart-o"></div>
              </footer>
              `


  return $tweet.append(html);
}


function renderTweets(arrayOfTweets){
  $('#tweets').empty();
  arrayOfTweets.forEach(function(tweet){
    $('#tweets').prepend(createTweetElement(tweet));
  });

}


$('form').on('submit', function(event){
  event.preventDefault();

  if (event.target[0].value.length > 140){
    return alert('Text too long, please give me a shorter text')
  } else if(!event.target[0].value.length){
    return alert('Please input a text!');
  }


  $.post( "/tweets", $(this).serialize(), function() {
    loadTweets();
  });
  $("form textarea").val("");

})

$("#nav-bar #compose").on('click', function(){

  $('.new-tweet').slideToggle();
  $('.new-tweet textarea').focus()


})

});





// function lastUpdated(date){

//   let secondsElapsed = (Date.now() - date) / 1000;

//   let mins = secondsElapsed / 60;
//   let hours = mins / 60;
//   let days = hours / 24 | 0 ;
//   let years = days / 365.25 | 0;
//   console.log(days)
//   console.log(secondsElapsed)

//   if (days > 365){
//     return years + ' years ago';
//   } if(days > 1) {
//     return days + " days ago";
//   }
//   return hours + " hours ago";

// }
