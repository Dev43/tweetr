/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

 $(document).ready(function(){


function lastUpdated(date){
    console.log(date);
  let secondsElapsed = Date.now() - date;
  console.log(secondsElapsed)
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
  console.log(html)
  return $tweet;
}




var tweetData = {
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
}

var $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$('#tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});