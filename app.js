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

 

function GETWrapper(json) {

app.get('/', function(req, res){

  res.render('index', { jsonData : json });

  console.log("JUST RENDERED")

  console.log(jsonData);

 /* updated this line */

});

}

 

 

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

  var request = require("request");

  var input = 'angelhack%20OR%20%23ah8';

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

 

 

 

  var options ='https://821f292fdc3ca76b1a542b7edfd52ea9:AhzRt1NRAW@cdeservice.mybluemix.net:443/api/v1/messages/search?q=posted%3A'

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

      /*

      var total = tweetData.before.positive + tweetData.before.negative + tweetData.before.neutral + tweetData.before.ambivalent;

      var posPercent = parseInt(tweetData.before.positive / total * 100, 10);

      var negPercent = parseInt(tweetData.before.negative / total * 100, 10);

      var neutPercent = parseInt(tweetData.before.neutral / total * 100, 10);

      var ambivPercent = parseInt(tweetData.before.ambivalent / total * 100, 10);

 

      var sentiString = '<p><h1>Event Sentiment</h1>';

      sentiString += '<ul><li>Positive: ' + posPercent + '%</li>';

      sentiString += '<li>Negative: ' + negPercent + '%</li>';

      sentiString += '<li>Neutral: ' + neutPercent + '%</li>';

      sentiString += '<li>Ambivalent: ' + ambivPercent + '%</li></ul></p>';

      //console.log(tweetData.before);

 

var watson = require('watson-developer-cloud');

 

var personality_insights = watson.personality_insights({

  username: 'c43a289d-f38b-44e1-aefa-4c8258a01f95',

  password: 'x7y8KpZhhLVi',

  version: 'v2'

});

 

personality_insights.profile({

 text: tweetData.before.text },

  function (err, response) {

    if (err) {

      console.log('error:', err);

    }

    else {

      //console.log(JSON.stringify(response, null, 2));

      var root = response.tree.children; //big 5, needs, values

      //GETWrapper(root);

      var string = sentiString + '<p><h1>Collective Personality</h1><br><table style="display:block;float:left;">';

      for (var i = 0; i < root.length; i++) {

        string += '<tr><td>';

        var root_name = root[i].name;

        string += '<h3>' + root_name + '</h3>';

        string += '</td><td></td></tr>';

        //console.log('ROOT: ' + root_name);

        for (var j = 0; j < root[i].children.length; j++) {

          var child = root[i].children[j];

          for (var k = 0; k < child.children.length; k++) {

            string  += '<tr><td>';

            var child_child_name = child.children[k].name;

            string += child_child_name;

            string += '</td>';

            string += '<td>';

            var child_child_percentage = child.children[k].percentage * 100;

            child_child_percentage = parseInt(child_child_percentage, 10);

            child_child_percentage = child_child_percentage + '%';

            string += child_child_percentage;

            string += '</td></tr>';

            //console.log('----LOW: ' + child_child_name);

            //console.log('-----LOWP: ' + child_child_percentage);

          }

        }

      }

      string += '</table></p>';

      GETWrapper(string);

    }

    });

    */

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

 

      var total = tweetData.during.positive + tweetData.during.negative + tweetData.during.neutral +tweetData.during.ambivalent;

      var posPercent = parseInt(tweetData.during.positive / total * 100, 10);

      var negPercent = parseInt(tweetData.during.negative / total * 100, 10);

      var neutPercent = parseInt(tweetData.during.neutral / total * 100, 10);

      var ambivPercent = parseInt(tweetData.during.ambivalent / total * 100, 10);

 

      var sentiString = '<p><h1>Event Sentiment</h1>';

      sentiString += '<ul><li>Positive: ' + posPercent + '%</li>';

      sentiString += '<li>Negative: ' + negPercent + '%</li>';

      sentiString += '<li>Neutral: ' + neutPercent + '%</li>';

      sentiString += '<li>Ambivalent: ' + ambivPercent + '%</li></ul></p>';

      //console.log(tweetData.before);

 

      var watson = require('watson-developer-cloud');

 

      var personality_insights = watson.personality_insights({

      username: 'c43a289d-f38b-44e1-aefa-4c8258a01f95',

      password: 'x7y8KpZhhLVi',

      version: 'v2'

      });

 

      personality_insights.profile({

      text: tweetData.during.text },

      function (err, response) {

      if (err) {

      console.log('error:', err);

      }

      else {

      //console.log(JSON.stringify(response, null, 2));

      var root = response.tree.children; //big 5, needs, values

      //GETWrapper(root);

      var string = sentiString + '<p><h1>Collective Personality</h1><br><table style="display:block;float:left;">';

      for (var i = 0; i < root.length; i++) {

        string += '<tr><td>';

        var root_name = root[i].name;

        string += '<h3>' + root_name + '</h3>';

        string += '</td><td></td></tr>';

        //console.log('ROOT: ' + root_name);

        for (var j = 0; j < root[i].children.length; j++) {

          var child = root[i].children[j];

          for (var k = 0; k < child.children.length; k++) {

            string  += '<tr><td>';

            var child_child_name = child.children[k].name;

            string += child_child_name;

            string += '</td>';

            string += '<td>';

            var child_child_percentage = child.children[k].percentage * 100;

            child_child_percentage = parseInt(child_child_percentage, 10);

            child_child_percentage = child_child_percentage + '%';

            string += child_child_percentage;

            string += '</td></tr>';

            //console.log('----LOW: ' + child_child_name);

            //console.log('-----LOWP: ' + child_child_percentage);

          }

        }

      }

      string += '</table></p>';

      GETWrapper(string);

      }

      });

 

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

 

 function timeConverterForURL(dateObj) {

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
