"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
    try{
      db.collection('tweets').insertOne( newTweet )
    } catch(e) {
      callback(e, false);
    }
        callback(null, true);
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection('tweets').find().toArray((err, tweets) => {
        const sortNewestFirst = (a, b) => a.created_at - b.created_at;
        callback(null, tweets.sort(sortNewestFirst));
      });
    },

    likeTweets: function(handle){
      db.collection('tweets')
        .find({ "user.handle": { $eq: handle }})
        .toArray((err,result) => console.log(result) )
      //db.collection('tweets').update({likes:1}, {$set:{b:2}});
    }

  };
}
