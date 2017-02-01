/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// START OF THE DOCUMENT
 $(document).ready(function(){




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


function loadTweets(){
  $.getJSON("/tweets", function(arrayOfTweets){
    renderTweets(arrayOfTweets)
  });
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
              <div id="flag" data-id = ${escape(tweet._id)} class="fa fa-flag"></div>
              <div id="share" data-id = ${escape(tweet._id)} class="fa fa-retweet"></div>
              <div id="like" data-id = ${escape(tweet._id)} class="fa fa-heart-o"></div>
              <div id="likeNum" data-id = ${escape(tweet._id)}>0</div>

              </footer>`

  return $tweet.append(html);
}


function renderTweets(arrayOfTweets){
  // when you send a post request to the server upon completion
  // get back the actual tweet, and render it, not all of them
  // again.
  $('#tweets').empty();
  arrayOfTweets.forEach(function(tweet){
    $('#tweets').prepend(createTweetElement(tweet));
  });

}




function initializePage(){ // loads tweets and bind the event listeners

  loadTweets();

  $( "#tweets" ).on( "click", "#like", function( event ) {
      //event.preventDefault();
      const id = $(this).data().id;
      const element = $(this);

       $.ajax({url: `tweets/${id}/like`,
                method: "PUT",
                  success: toggleLike
                });

    function toggleLike(response){
      element.toggleClass("toggled");
      $(`[data-id=${id}]:last`).text(response);
    }
  });




$('form').on('submit', function(event){
  event.preventDefault();
  if (event.target[0].value.length > 140){
    return alert('Text too long, please give me a shorter text')
  } else if(!event.target[0].value.length || !event.target[0].value.split(" ").join("").length){
    return alert('Please input a text!');
  }


  $.post( "/tweets", $(this).serialize(), function() {
    loadTweets();
  });
  $("form textarea").val("");
});

$("#nav-bar #compose").on('click', function(){
  $('.new-tweet').slideToggle();
  $('.new-tweet textarea').focus()
});


$("#register").on('click', (event) => {
$.get("/register")
$('#tweets').empty();
let html = `
<form action="/register" id="registrationForm" method="POST">
 EMAIL: <input type="email" name="email">
PASSWORD: <input type="password" name="password">
</form>`
return $('#tweets').append(html);

})



  }

  initializePage();

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
