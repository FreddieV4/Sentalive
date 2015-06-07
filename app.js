/*jshint node:true*/

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, appEnv.bind, function() {
// print a message when the server starts listening
<<<<<<< HEAD
console.log("\nServer: " + appEnv.url + '\n');
});
||||||| merged common ancestors
console.log("server starting on " + appEnv.url);

=======
console.log("server starting on " + appEnv.url);

)}

>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
  ///////////////
  // Variables //
  ///////////////
  var tweetData = {
    before:
    {
      text:"",
      positive:0,
      negative:0,
      neutral:0,
      ambivalent:0,
    },
    during:
    {
      text:"",
      positive:0,
      negative:0,
      neutral:0,
      ambivalent:0,
    },
    after:
    {
      text:"",
      positive:0,
      negative:0,
      neutral:0,
      ambivalent:0,
<<<<<<< HEAD
    }};

||||||| merged common ancestors
    };
=======
    }
  };
>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
  var http = require("https");
  var input = '#angelhack';
  var options = 'https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=' + input;
  var eventDate = new Date("2015-06-06T09:00:00.000Z");
  var eventEndDate = new Date("2015-06-07T18:00:00.000Z");

  //JSON object filled with an array of "tweets", each with their own data
<<<<<<< HEAD
  var request = http.get(options, function(response) {
||||||| merged common ancestors
  var request = http.get(options, function(res){
=======
  var request = http.get(options, function(response){
>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
    // Teddy is our hero
<<<<<<< HEAD
      response.on('data', function(chunk) {
      var chunkyString = chunk.toString();
      var res = JSON.stringify(chunkyString);
      console.log("THIS IS RES: " + res);

      // Temp vars
    var sentiment;
    var tweetDate;
    // Foreach loop to iterate through the JSON tweets
    //for(var tweet in res["tweets"])
    for(var i=0; i<res.tweets.length; i++) {
      // Store the date as a date type, instead of a string
      tweetDate = new Date(res.tweets[i].message.postedTime);
      // Check to see if the tweet is within range
      if( checkWithinMaxRange(tweetDate, eventDate) ) {
        // Store the sentiment so I don't have to write it out every time
        sentiment = res.tweets[i].content_sentiment.polarity;
        // Do a switch on the time comparison
        switch ( compareTime(tweetDate, eventDate) ) {
          // If tweet is before the event
          case -1:
              // Add text so Watson can use it
              tweetData.before.text+=res.tweets[i].message.body;
              // Compare sentiment and add vars accordingly
              if(sentiment == "positive")
                tweetData.before.positive++;
              else if(sentiment == "negative")
                tweetData.before.negative++;
              else if(sentiment == "neutral")
                tweetData.before.neutral++;
              else
                tweetData.before.ambivalent++;
              break;

          // If tweet is during the event
          case 0:

              tweetData.during.text+=res.tweets[i].message.body;

              if(sentiment == "positive")
                tweetData.during.positive++;
              else if(sentiment == "negative")
                tweetData.during.negative++;
              else if(sentiment == "neutral")
                tweetData.during.neutral++;
              else
                tweetData.during.ambivalent++;
              break;

          // If tweet is after the event
          case 1:

              tweetData.after.text+=res.tweets[i].message.body;

              if(sentiment == "positive")
                tweetData.after.positive++;
              else if(sentiment == "negative")
                tweetData.after.negative++;
              else if(sentiment == "neutral")
                tweetData.after.neutral++;
              else
                tweetData.after.ambivalent++;
              break;
||||||| merged common ancestors
    res.on('data', function(chunk){
      console.log(chunk.toString());
    })
    // Temp vars
    var sentiment;
    var tweetDate;
    // Foreach loop to iterate through the JSON tweets
    //for(var tweet in res["tweets"])
    for(var i=0; i<res.tweets.length; i++)
    {
      // Store the date as a date type, instead of a string
      tweetDate = new Date(res.tweets[i].message.postedTime);
      // Check to see if the tweet is within range
      if( checkWithinMaxRange(tweetDate, eventDate) ) {
        // Store the sentiment so I don't have to write it out every time
        sentiment = res.tweets[i].content_sentiment.polarity;
        // Do a switch on the time comparison
        switch ( compareTime(tweetDate, eventDate) )
        {
          // If tweet is before the event
          case -1:
              // Add text so Watson can use it
              tweetData.before.text+=res.tweets[i].message.body;
              // Compare sentiment and add vars accordingly
              if(sentiment == "positive")
                tweetData.before.positive++;
              else if(sentiment == "negative")
                tweetData.before.negative++;
              else if(sentiment == "neutral")
                tweetData.before.neutral++;
              else
                tweetData.before.ambivalent++;
              break;
          // If tweet is during the event
          case 0:
              tweetData.during.text+=res.tweets[i].message.body;
              if(sentiment == "positive")
                tweetData.during.positive++;
              else if(sentiment == "negative")
                tweetData.during.negative++;
              else if(sentiment == "neutral")
                tweetData.during.neutral++;
              else
                tweetData.during.ambivalent++;
              break;
          // If tweet is after the event
          case 1:
              tweetData.after.text+=res.tweets[i].message.body;
              if(sentiment == "positive")
                tweetData.after.positive++;
              else if(sentiment == "negative")
                tweetData.after.negative++;
              else if(sentiment == "neutral")
                tweetData.after.neutral++;
              else
                tweetData.after.ambivalent++;
              break;
=======
    response.on('data', function(chunk)
    {
      // Convert the JSON string into a javascript JSON object
      var res = JSON.parse(chunk.toString());
      // Temp vars
      var sentiment;
      var tweetDate;
      // Foreach loop to iterate through the JSON tweets
      for(var i=0; i<res.tweets.length; i++)
      {
        // Store the date as a date type, instead of a string
        tweetDate = new Date(res.tweets[i].message.postedTime);
        // Check to see if the tweet is within range
        if( isWithinRange(tweetDate, eventDate) )
        {
          // Store the sentiment so I don't have to write it out every time
          sentiment = res.tweets[i].content_sentiment.polarity;
          // Do a switch on the time comparison
          switch ( sortTweets(tweetDate, eventDate, eventEndDate) )
          {
            // If tweet is before the event
            case -1:
                // Add text so Watson can use it
                tweetData.before.text+=res.tweets[i].message.body;
                // Compare sentiment and add vars accordingly
                if(sentiment == "positive")
                  tweetData.before.positive++;
                else if(sentiment == "negative")
                  tweetData.before.negative++;
                else if(sentiment == "neutral")
                  tweetData.before.neutral++;
                else
                  tweetData.before.ambivalent++;
                break;
            // If tweet is during the event
            case 0:
                tweetData.during.text+=res.tweets[i].message.body;
                if(sentiment == "positive")
                  tweetData.during.positive++;
                else if(sentiment == "negative")
                  tweetData.during.negative++;
                else if(sentiment == "neutral")
                  tweetData.during.neutral++;
                else
                  tweetData.during.ambivalent++;
                break;
            // If tweet is after the event
            case 1:
                tweetData.after.text+=res.tweets[i].message.body;
                if(sentiment == "positive")
                  tweetData.after.positive++;
                else if(sentiment == "negative")
                  tweetData.after.negative++;
                else if(sentiment == "neutral")
                  tweetData.after.neutral++;
                else
                  tweetData.after.ambivalent++;
                break;
            default:
                console.log("Something went wrong in the switch statement");
          }
>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
        }
      }
<<<<<<< HEAD
    }

    })
    
||||||| merged common ancestors
    }
=======
    });
>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
  });

///////////////
// Functions //
///////////////
//Returns whether or not the tweet time is before or after the event
<<<<<<< HEAD
function compareTime(tweetTime, eventTime) {
  // Note that time is a string
  var tweetDate = new Date(tweetTime);
  //if()
||||||| merged common ancestors
function compareTime(tweetTime, eventTime)
{
  // Note that time is a string
  var tweetDate = new Date(tweetTime);
  //if()
=======
function sortTweets(tweetTime, eventStart, eventEnd){
  if (tweetTime.getTime() < eventStart.getTime()){
    return -1;
  } else if (tweetTime.getTime() < eventEnd.getTime()){
    return 0;
  } else {
    return 1;
  }
>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
}
// Returns true if the tweet is within 30 days (subject to change) of the event
<<<<<<< HEAD
function checkWithinMaxRange(tweetTime, eventTime) { 
  // if(tweetTime.Days)
  //     ;
}
||||||| merged common ancestors
function checkWithinMaxRange(tweetTime, eventTime)
{
  if(tweetTime.Days)
}
=======
function isWithinRange(tweetTime, eventStart, eventEnd) {
  var numDays = 30;
  var startTime = eventStart.getTime() - (1000*60*60*24*numDays);
  if (tweetTime.getTime() > startTime) {
    return true;
  }
  return false;
}
>>>>>>> 3614fbe664f150b1766d3d0d09196c1ab1904933
