/*jshint node:true*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
// AngelHack Boston 2015

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
  console.log("server starting on " + appEnv.url);
<<<<<<< HEAD

  var http = require("http");
  var options = 'https://<username>:<password>@cdeservice.mybluemix.net:443/api/v1/messages/search?q=' + <input>;
  //{
    //host:'https://<username>:<password>@cdeservice.mybluemix.net:443/api/v1/messages/search?q=',
    //path: <input>,
  //};

  //JSON object filled with an array of "tweets", each with their own data
  var request = http.get(options, function(res){
    for()
  });

///////////////
// Functions //
///////////////
//Returns whether or not the tweet time is before or after the event
function compareTime(tweetTime, eventTime)
{
  
}

});
