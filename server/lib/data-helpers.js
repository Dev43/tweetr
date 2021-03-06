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
      db.collection('tweets').findOne({ "_id": ObjectId(id) },(err, tweet) => {
        if(tweet.peopleWhoLiked.indexOf(personWhoLiked) === -1){ // if he is not there

          db.collection('tweets') // update db
          .updateOne({ "_id": ObjectId(id) },
           { $inc: {likes: 1}, $push: {peopleWhoLiked: personWhoLiked}}, {}, (err, result) => {
            if(err){
              callback(err, null);
            }
              callback(null,result);
           });
        } else {
          db.collection('tweets')
          .updateOne({ "_id": ObjectId(id) },
           { $inc: {likes: -1}, $pull: {peopleWhoLiked: personWhoLiked}}, {}, (err, result) => {
            if(err){
              callback(err, null);
            }
              callback(null,result);
          });
        }
      });
    },

    getTweetLikes: function(id, callback){
      db.collection('tweets').findOne({ "_id": ObjectId(id) }, (err, tweet) => {
        if(err){
          callback(err, null);
        } else {
          callback(null, tweet.likes);
      }
    });
   }
  };
}
