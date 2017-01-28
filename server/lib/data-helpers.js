"use strict";

const ObjectId = require('mongodb').ObjectId;
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

    likeTweets: function(id, personWhoLiked, callback){


       db.collection('tweets')
       .updateOne({ "_id": ObjectId(id) },
         { $inc: {like: 1}, $push: {peopleWhoLiked: personWhoLiked}}, {}, (err, result) => {
          console.log(err);
          if(err){
            callback(err, null);
          }
            callback(null,result);
         });
       } // did not throw an error
  };
}
