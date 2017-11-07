// setting modules
var express = require('express');
var Twitter = require('twitter');
var fs = require('fs');
var natural = require('natural');



var router = express.Router();

// twitter data
var TweetCount = 0;
var TweetID = [];
var TweetText = [];
var TweetName = [];
var TweetHashtag = [];
var TweetLastText = [];
var TweetSimilarText = [];
var TweetSimilarName = [];
var TweetSimilarPercentage = [];
var TweetSimilarHarshtag = [];
var TweetData = [];


// this post occurs when a user enters some next text
router.post('/', function(req, res, next) {
  TweetData = [];
    // global varibles for the functions loops
    results = "#" + req.body.search.split(" ").join("+");
        console.log(results);
    var TweetName = results;
// local functions for callbacks

  var tweets = "none"
  tweets = GetTweets(TweetName, render);

  function render(data){

            if (data.statuses.length !== 0){
              TweetData.push(data);
         TweetCount ++;
         TweetID[TweetCount] = data.statuses[0].id;
         TweetText[TweetCount] = data.statuses[0].text;
         TweetHashtag[TweetCount] = TweetName;
         TweetName[TweetCount] = data.statuses[0].user.name;
         TweetLastText[TweetCount] = "";
             console.log(TweetHashtag[1] + TweetText[1] + TweetID[1]);
        Similarity();
        console.log("Rendering");
        res.render('index',{tags:TweetHashtag, texts:TweetText, names:TweetName, similarname:TweetSimilarName,
           similartext: TweetSimilarText, similarpercentage: TweetSimilarPercentage, similarharshtag:TweetSimilarHarshtag});
       }
  }

});

// this is the check posts
router.post('/check', function(req, res, next) {
// this is where the program will check fro any updates
TweetData = [];
var TweetList = [];
var TweetListTweet = [];
var TweetListOwner = [];
var i = 1;
var TweetTest = 0;
StartWaterfall();


  function StartWaterfall(){
  GetTweets(TweetHashtag[i],checkdata);
}

      function checkdata(data) {
        // check if there is data to be compared to
        TweetData.push(data);
        console.log(data.statuses[0].user);
        if (data.statuses.length !== 0){
TweetTest = data.statuses[0].id
        // check tweets

        // add all tweet text to list
        for (var k = 0; k < data.statuses.length; k ++){

            TweetList.push(data.statuses[k].text);
            TweetListTweet.push(data.statuses[k].text);
            TweetListOwner.push(data.statuses[k].user.name);
          //  console.log(data.statuses[k].text + " ADDED");
        }
        console.log(TweetList.length);
        if (TweetID[i] === TweetTest){
        } else {
                // if there is a change we will update the data
                TweetID[i] = TweetTest;
                TweetLastText[i] = TweetText[i];
                TweetText[i] = data.statuses[0].text;
                TweetName[i] = data.statuses[0].user.name;

        }
                                }
        if (i != TweetCount){
          i ++
          console.log('relooping');
          StartWaterfall();
        } else {
        // this checks how similar strings are
        Similarity();
        console.log("Rendering");
        res.render('index',{tags:TweetHashtag, texts:TweetText, names:TweetName, similarname:TweetSimilarName,
           similartext: TweetSimilarText, similarpercentage: TweetSimilarPercentage, similarharshtag:TweetSimilarHarshtag});
        }
      }

});



// functions

function GetTweets(hashtag, callback) {

    var client = new Twitter({
    consumer_key: 'mFaxC8RtkhFi5TOdbuRbjMOMI',
    consumer_secret: 'sBiIu8PqCZbVjSzDqYjayloP5tP7XISR1634yFD9pA9NUyLAg3',
    access_token_key: '916933942971834368-76xM43oOgnNTMwz1wVctpf8jJ0tcUIt',
    access_token_secret: 'BEybjQuYFRRGniJveeTpdJAouAKNKWfFVvLlLJ614hOf0'
  });

  var client2 = new Twitter({
  consumer_key: 'ff93U7NRMXb8xBlYJa1MsFEtJ',
  consumer_secret: 'ziPu8McA4J01pUM9y0C96WXhjkmsfKQzHp49UMzjrbwzSqji7i',
  access_token_key: '923113515052761088-Y9d8LEkptDeBdPdanXGGxgY7hDtS8IO',
  access_token_secret: 'qpe4hQ2m4FNCaJuouy4tmXgJZRZboPmb2gDsXoJLYHIBg'
});

var client3 = new Twitter({
consumer_key: 'dUqURxMDZjOBeM2gPlqndeHnM',
consumer_secret: 'HhTVX6e5397ShwNN8Ek7wksu1s0nFjGPhNWbT1R4EfTApiokwR',
access_token_key: '2365443590-P6ES9JOcV8pn7QVw8S7rez1KBSHa5oxwypAfvHN',
access_token_secret: '0ibm4ZEGkAl1MGEsylP4WoKgDQFwTklOCYArurGQLF2R4'
});

var client4 = new Twitter({
consumer_key: '	hsTvlRPZZBB4TXCWh49pJ1l2E',
consumer_secret: 'jYYFDZWzKME9Nsg9BA1mjIHKzmIkTgkAaLuksjIlrN1T6PhNWW',
access_token_key: '925139252228136960-QPayQc6TuDxQnow4aNeyzwUNd3i6dIi',
access_token_secret: '3GaaJDBQDOZsRg8f1xsJ5AewL96jQCG5RwLfzpp6oRh1W'
});

var client5 = new Twitter({
consumer_key: '	RIqQtGUpXwDkklOizk6UirdKs',
consumer_secret: '0GRSTsRkA4k5wfKnGk2GonzmCBKGoAfxFpFlkdEtBcW8LQkubl',
access_token_key: '925140284513468416-z9q0XLi6YZXFKrH2RKgN64YIySWlf9f',
access_token_secret: 'h53KCgbTTwULJbRxt47vlf8atI8piod71pbMX4lwidjlt'
});

// check if there is a tweetid
    var params = {q:hashtag, count: 100, lang: 'en'};

  client.get('search/tweets', params, function(error, tweets, response) {
    if (!error) {
                          callback(tweets);
      } else {
                      console.log("entering tweet account 2");
        client2.get('search/tweets', params, function(error, tweets, response) {
          if (!error) {
                                callback(tweets);
            } else {
              console.log("entering tweet account 3");
              client3.get('search/tweets', params, function(error, tweets, response) {
                if (!error) {
                                      callback(tweets);
                  } else {
                                  console.log("entering tweet account 4");
                    client4.get('search/tweets', params, function(error, tweets, response) {
                      if (!error) {
                                            callback(tweets);
                        } else {
                                        console.log("entering tweet account 5");
                          client5.get('search/tweets', params, function(error, tweets, response) {
                            if (!error) {
                                                  callback(tweets);
                              } else {

                              }
                                            });
                        }
                                      });
                  }

              });
            }

        });
      }

  });
}

// this function checks the simlarty of every main tweet with every tweet recieved find the most similar
function Similarity(){
  // enter 3 loops
  for (var u=1;u<TweetText.length;u++){
    var Similarnum = 0;
    var SimilarName ="";
    var SimilarText ="";
    var SimilarHarshtag ="";
    for(var z=0;z<TweetData.length;z++){
    for(var x=0;x<TweetData[z].statuses.length;x++){
      if (TweetData[z].statuses[x].text !==TweetText[u]){
        //console.log("comparing:" + TweetData[z].statuses[x].text + "With : " + TweetText[u]);
    match = natural.JaroWinklerDistance(TweetData[z].statuses[x].text,TweetText[u]);
    if (match > Similarnum){
      Similarnum = match;
      SimilarName = TweetData[z].statuses[x].user.name
      SimilarText = TweetData[z].statuses[x].text;
      SimilarHarshtag = TweetData[z].search_metadata.query;
      console.log("Growing to: " +  Similarnum);
    }
  } // end if

    }
  }
  var percentage = Similarnum * 100;
   TweetSimilarText[u] = SimilarText;
   TweetSimilarName[u] = SimilarName;
   TweetSimilarPercentage[u] = percentage.toFixed(2);
   TweetSimilarHarshtag[u] = SimilarHarshtag;
  console.log("the most similar tweet for:" + TweetText[u] + " is " + SimilarText + " by " + SimilarName + " That scored a " + Similarnum );
  }

}




module.exports = router;
