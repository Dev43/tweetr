/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];


// START OF THE DOCUMENT
 $(document).ready(function(){


function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}


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
  arrayOfTweets.forEach(function(tweet){
    $('#tweets').append(createTweetElement(tweet));
  });

}


renderTweets(data);


function success(response){
}

$('form').on('submit', function(event){
  event.preventDefault();

  console.log($(this).serialize());

  // $.ajax({
  // type: "POST",
  // url: "/tweets",
  // data: $(this).serialize(),
  // success: success
  // });

  $.post( "/tweets", $(this).serialize(), function( data ) {
  console.log("It has been posted!!!");
  console.log(data);
});

})

});