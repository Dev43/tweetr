"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", function(req, res) {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.post("/", function(req, res) {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.put("/:handle/like", function(req, res){
             //increment the like in db
             // ME refers to the person who liked the tweet

     DataHelpers.likeTweets(req.params.handle, 'ME', function(error){
      if(error){
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }

     });
    // if(isSuccessfullUpdate){
    //   res.status(201).send();
    // } else{
    //   res.status(500).send("Problems with the database");
    // }


  });

  return tweetsRoutes;

}
