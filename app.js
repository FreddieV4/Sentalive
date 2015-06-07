/*jshint node:true*/

// This application uses express as it's web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// serve the files out of ./public as our main files
app.use('/public', express.static(__dirname + '/public'));
// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.get('/', function(req, res){
  res.render('index');
 /* updated this line */
});

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
    /*
  var http = require("https");
  var input = 'thing';
  var eventDate = new Date("2015-06-06T09:00:00.000Z");
  var eventEndDate = new Date("2015-06-07T18:00:00.000Z");
  //var startTimeAnalysis = calculateStartTime(eventDate).toISOString();
  //var endTimeAnalysis = calculateEndingTime(eventEndDate).toISOString();
  //var newStartTimeAnalysis = startTimeAnalysis.replace(/:/g, "%3A");
  //var newEndTimeAnalyzsis = endTimeAnalysis.replace(/:/g, "%3A");
  var newStartTimeAnalysis = timeConverterForURL(calculateStartTime(eventDate));
  var newEndTimeAnalyzsis = timeConverterForURL(calculateEndingTime(eventEndDate));

  var options = 'https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=posted%3A' 
                            + newStartTimeAnalysis + '%2C' + newEndTimeAnalyzsis + '%20AND%20' + input + '&size=500';
  console.log("\nOPTIONS BITCH: " + options);
  var countryFilter = '';
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
        //console.log('STRING: ' + chunk.toString());
      // Temp vars
    var sentiment;
    var tweetDate;
    // Foreach loop to iterate through the JSON tweets
    //for(var tweet in res["tweets"])
    for(var i=0; i<res.tweets.length; i++) {
      // Check to make sure it's in English (IT MUST BE)
      console.log('TWEET #: ' + i + ' ' + res.tweets[i].message.postedTime);
      if(res.tweets[i].message.actor.languages[0] == 'en')
      {
        // Check to make sure it's in the right country
        if(countryFilter=='' || (countryFilter!='' && isInCountry(res.tweets[i], countryFilter)))
        {
          // Check to make sure it's in the right state
          if(stateFilter=='' || (stateFilter!='' && isInState(res.tweets[i], stateFilter)))
          {
              // Store the date as a date type, instead of a string
              tweetDate = new Date(res.tweets[i].message.postedTime);
              // Store the sentiment so I don't have to write it out every time
              sentiment = res.tweets[i].cde.content.sentiment.polarity;
              // Do a switch on the time comparison
              switch ( sortTweets(tweetDate, eventDate, eventEndDate) ) {
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
 //console.log(tweetData);

    })
      });
*/

  var http = require("https");
  var input = 'grok';
  var eventDate = new Date("2015-06-06T09:00:00.000Z");
  var eventEndDate = new Date("2015-06-07T18:00:00.000Z");
  //var startTimeAnalysis = calculateStartTime(eventDate).toISOString();
  //var endTimeAnalysis = calculateEndingTime(eventEndDate).toISOString();
  //var newStartTimeAnalysis = startTimeAnalysis.replace(/:/g, "%3A");
  //var newEndTimeAnalyzsis = endTimeAnalysis.replace(/:/g, "%3A");
  var newStartTimeAnalysis = timeConverterForURL(calculateStartTime(eventDate));
  var newEndTimeAnalyzsis = timeConverterForURL(calculateEndingTime(eventEndDate));
  var newEventDateBegin = timeConverterForURL(eventDate);
  var newEndEventDate = timeConverterForURL(eventEndDate);
  var countryFilter = '';
  var stateFilter = '';



  var options = 'https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=posted%3A' 
                            + newStartTimeAnalysis + '%2C' + newEventDateBegin + '%20AND%20' + input + '&size=500';

 var request1 = http.get(options, function(response) {
    // Teddy is our hero
      var jsonData = '';
      response.on('data', function(chunk) {
      jsonData += chunk.toString();
    });
 
      var res;
      response.on('end', function(chunk) {
      res = JSON.parse(jsonData);

      var sentiment;
      var tweetDate;

      // Foreach loop to iterate through the JSON tweets
      //for(var tweet in res["tweets"])
      for(var i=0; i<res.tweets.length; i++) {
        // Check to make sure it's in English (IT MUST BE)
        //console.log('TWEET #: ' + i + ' ' + res.tweets[i].message.postedTime);
        if(res.tweets[i].message.actor.languages[0] == 'en')
        {
          // Check to make sure it's in the right country
          if(countryFilter=='' || (countryFilter!='' && isInCountry(res.tweets[i], countryFilter)))
          {
            // Check to make sure it's in the right state
            if(stateFilter=='' || (stateFilter!='' && isInState(res.tweets[i], stateFilter)))
            {
                // Store the date as a date type, instead of a string
                tweetDate = new Date(res.tweets[i].message.postedTime);
                // Store the sentiment so I don't have to write it out every time
                sentiment = 'nothing';
                if (res.tweets[i].cde.content != null) {
                  sentiment = res.tweets[i].cde.content.sentiment.polarity;
                }
                tweetData.before.text+=res.tweets[i].message.body + ' ';
                // Compare sentiment and add vars accordingly
                if(sentiment == "POSITIVE")
                  tweetData.before.positive++;
                else if(sentiment == "NEGATIVE")
                  tweetData.before.negative++;
                else if(sentiment == "NEUTRAL")
                  tweetData.before.neutral++;
                else if(sentiment == "AMBIVALENT")
                  tweetData.before.ambivalent++;
            }
          }
        }
      }          
      });
    });

options = 'https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=posted%3A' 
                            + newEventDateBegin + '%2C' + newEndEventDate + '%20AND%20' + input + '&size=500';

 var request2 = http.get(options, function(response) {
    // Teddy is our hero
      var jsonData = '';
      response.on('data', function(chunk) {
      jsonData += chunk.toString();
    });
 
      var res;
      response.on('end', function(chunk) {
      res = JSON.parse(jsonData);

      var sentiment;
      var tweetDate;

      // Foreach loop to iterate through the JSON tweets
      //for(var tweet in res["tweets"])
      for(var i=0; i<res.tweets.length; i++) {
        // Check to make sure it's in English (IT MUST BE)
        //console.log('TWEET #: ' + i + ' ' + res.tweets[i].message.postedTime);
        if(res.tweets[i].message.actor.languages[0] == 'en')
        {
          // Check to make sure it's in the right country
          if(countryFilter=='' || (countryFilter!='' && isInCountry(res.tweets[i], countryFilter)))
          {
            // Check to make sure it's in the right state
            if(stateFilter=='' || (stateFilter!='' && isInState(res.tweets[i], stateFilter)))
            {
                // Store the date as a date type, instead of a string
                tweetDate = new Date(res.tweets[i].message.postedTime);
                // Store the sentiment so I don't have to write it out every time
                sentiment = 'nothing';
                if (res.tweets[i].cde.content != null) {
                  sentiment = res.tweets[i].cde.content.sentiment.polarity;
                }
                tweetData.during.text+=res.tweets[i].message.body + ' ';
                // Compare sentiment and add vars accordingly
                if(sentiment == "POSITIVE")
                  tweetData.during.positive++;
                else if(sentiment == "NEGATIVE")
                  tweetData.during.negative++;
                else if(sentiment == "NEUTRAL")
                  tweetData.during.neutral++;
                else if(sentiment == "AMBIVALENT")
                  tweetData.during.ambivalent++;
            }
          }
        }
      }          
      });
    });

options = 'https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=posted%3A' 
                            + newEndEventDate + '%2C' + newEndTimeAnalyzsis + '%20AND%20' + input + '&size=500';

 var request3 = http.get(options, function(response) {
    // Teddy is our hero
      var jsonData = '';
      response.on('data', function(chunk) {
      jsonData += chunk.toString();
    });
 
      var res;
      response.on('end', function(chunk) {
      res = JSON.parse(jsonData);

      var sentiment;
      var tweetDate;

      // Foreach loop to iterate through the JSON tweets
      //for(var tweet in res["tweets"])
      for(var i=0; i<res.tweets.length; i++) {
        // Check to make sure it's in English (IT MUST BE)
        //console.log('TWEET #: ' + i + ' ' + res.tweets[i].message.postedTime);
        if(res.tweets[i].message.actor.languages[0] == 'en')
        {
          // Check to make sure it's in the right country
          if(countryFilter=='' || (countryFilter!='' && isInCountry(res.tweets[i], countryFilter)))
          {
            // Check to make sure it's in the right state
            if(stateFilter=='' || (stateFilter!='' && isInState(res.tweets[i], stateFilter)))
            {
                // Store the date as a date type, instead of a string
                tweetDate = new Date(res.tweets[i].message.postedTime);
                // Store the sentiment so I don't have to write it out every time
                sentiment = 'nothing';
                if (res.tweets[i].cde.content != null) {
                  sentiment = res.tweets[i].cde.content.sentiment.polarity;
                }
                tweetData.after.text+=res.tweets[i].message.body + ' ';
                // Compare sentiment and add vars accordingly
                if(sentiment == "POSITIVE")
                  tweetData.after.positive++;
                else if(sentiment == "NEGATIVE")
                  tweetData.after.negative++;
                else if(sentiment == "NEUTRAL")
                  tweetData.after.neutral++;
                else if(sentiment == "AMBIVALENT")
                  tweetData.after.ambivalent++;
            }
          }
        }
      }          
      });
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
  // Returns the starting time
  function calculateStartTime(eventStart) {
    var numDays = 30;
    var startTime = new Date(eventStart.getTime() - (1000*60*60*24*numDays));
    return startTime;
  }
  // Returns the ending time
  function calculateEndingTime(eventEnd) {
    var numDays = 30;
    var endTime = new Date(eventEnd.getTime() + (1000*60*60*24*numDays));
    return endTime;
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
    if(tweetData.cde.author.location.state == stateName)
      return true;
      else
        return false;
  }

 function timeConverterForURL(dateObj)
{
  var stringz;
  var year = dateObj.getFullYear().toString();
  var month = dateObj.getMonth();
  var day = dateObj.getDay();
  var hours = dateObj.getHours();
  var mins = dateObj.getMinutes();
  var secs = dateObj.getSeconds();
month++;
  if(month<10)
    month = "0"+month.toString();
    else month=month.toString();
day++;
  if(day<10)
    day = "0"+day.toString();
    else day=day.toString();

  if(hours<10)
    hours = "0"+hours.toString();
    else hours=hours.toString();

  if(mins<10)
    mins = "0"+mins.toString();
    else mins=mins.toString();

  if(secs<10)
    secs = "0"+secs.toString();
    else secs=secs.toString();

    stringz = year+'-'+month+'-'+day+'T'+hours+'%3A'+mins+'%3A'+secs+'Z';
    return stringz;
}