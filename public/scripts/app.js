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



 $(document).ready(function(){


function lastUpdated(date){

  let secondsElapsed = Date.now() - date;
  let mins = secondsElapsed / 60;
  let hours = mins / 60;
  let days = hours / 24 |0;
  let years = days / 365.25 | 0

  if (days > 10){
    return years + ' years ago';
  } if(days > 1) {
    return days + " days ago";
  }
  return hours + " hours ago";

}

function createTweetElement(tweet){

  let $tweet = $("<article>").addClass("tweet");


  let html = `<header>
              <img src=${tweet.user.avatars.small}>
              <div class="user-name">${tweet.user.name}</div>
              <div class="user-id">${tweet.user.handle}</div>
              </header>

              <div class="tweet-body">${tweet.content.text}</div>
              <footer>${lastUpdated(tweet.created_at)}
              <div id="flag" class="fa fa-flag"></div>
              <div id="share" class="fa fa-retweet"></div>
              <div id="like" class="fa fa-heart-o"></div>
              </footer>
              </article>`

  $tweet = $tweet.append(html);
  return $tweet;
}


function renderTweets(arrayOfTweets){

  arrayOfTweets.forEach(function(tweet){
    $('#tweets').append(createTweetElement(tweet));
  });

}






// Test / driver code (temporary)
// $('#tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.



renderTweets(data);

});