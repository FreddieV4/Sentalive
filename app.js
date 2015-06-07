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
console.log("\nServer: " + appEnv.url + '\n');
});
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
    }};
  var http = require("https");
  var input = 'ah8';
  var options = 'https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=' + input;
  var eventDate = new Date("2015-06-06T09:00:00.000Z");
  var countryFilter = 'United States';
  var stateFilter = '';

  //JSON object filled with an array of "tweets", each with their own data
  var request = http.get(options, function(response) {
    // Teddy is our hero
      var jsonData = '';
      response.on('data', function(chunk) {
      jsonData += chunk.toString();
    });

      var res;
      response.on('end', function(chunk) {
        res = JSON.parse(jsonData);

      console.log("THIS IS RES: " + res.tweets[20].message.body);


      // Temp vars
    var sentiment;
    var tweetDate;
    // Foreach loop to iterate through the JSON tweets
    //for(var tweet in res["tweets"])
    for(var i=0; i<res.tweets.length; i++) {
      // Check to make sure it's in English (IT MUST BE)
      if(res.tweets[i].message.actor.languages[0] == 'en')
      {
        // Check to make sure it's in the right country
        if(countryFilter='' || (countryFilter!='' && isInCountry(res.tweets[i], countryFilter))
        {
          // Check to make sure it's in the right state
          if(stateFilter='' || (stateFilter!='' && isInState(res.tweets[i], stateFilter)))
          {
            // Store the date as a date type, instead of a string
            tweetDate = new Date(res.tweets[i].message.postedTime);
            // Check to see if the tweet is within range
            if( isWithinRange(tweetDate, eventDate) ) {
              // Store the sentiment so I don't have to write it out every time
              sentiment = res.tweets[i].cde.content.sentiment.polarity;
              // Do a switch on the time comparison
              switch ( compareTime(tweetDate, eventDate) ) {
                // If tweet is before the event
                case -1:
                    // Add text so Watson can use it
                    tweetData.before.text+=res.tweets[i].message.body + ' ';
                    // Compare sentiment and add vars accordingly
                    if(sentiment == "POSITIVE")
                      tweetData.before.positive++;
                    else if(sentiment == "NEGATIVE")
                      tweetData.before.negative++;
                    else if(sentiment == "NEUTRAL")
                      tweetData.before.neutral++;
                    else
                      tweetData.before.ambivalent++;
                    break;

                // If tweet is during the event
                case 0:

                    tweetData.during.text+=res.tweets[i].message.body;

                    if(sentiment == "POSITIVE")
                      tweetData.during.positive++;
                    else if(sentiment == "NEGATIVE")
                      tweetData.during.negative++;
                    else if(sentiment == "NEUTRAL")
                      tweetData.during.neutral++;
                    else
                      tweetData.during.ambivalent++;
                    break;

                // If tweet is after the event
                case 1:

                    tweetData.after.text+=res.tweets[i].message.body;

                    if(sentiment == "POSITIVE")
                      tweetData.after.positive++;
                    else if(sentiment == "NEGATIVE")
                      tweetData.after.negative++;
                    else if(sentiment == "NEUTRAL")
                      tweetData.after.neutral++;
                    else
                      tweetData.after.ambivalent++;
                    break;
              }
            }
          }
        }
      }
    }

    })
      });

  ///////////////
  // Functions //
  ///////////////
  //Returns whether or not the tweet time is before or after the event
  function sortTweets(tweetTime, eventStart, eventEnd){
    if (tweetTime.getTime() < eventStart.getTime()){
      return -1;
    } else if (tweetTime.getTime() < eventEnd.getTime()){
      return 0;
    } else {
      return 1;
    }
  }
  // Returns true if the tweet is within 30 days (subject to change) of the event
  function isWithinRange(tweetTime, eventStart, eventEnd) {
    var numDays = 30;
    var startTime = eventStart.getTime() - (1000*60*60*24*numDays);
    if (tweetTime.getTime() > startTime) {
      return true;
    }
    return false;
  }
  // Returns true if the tweet is in the specified country
  function isInCountry(tweetData, countryName)
  {
    if(tweetData.cde.author.location.country == countryName)
      return true;
      else
        return false;
  }
  // Returns true if the tweet is in the specified state
  function isInState(tweetData, stateName)
  {
    if(tweetData.cde.author.location.country == stateName)
      return true;
      else
        return false;
  }
