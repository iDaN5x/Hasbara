// Native dependencies.
const Http = require('http'),
      Path = require('path');

// External dependencies.
const Twitter = require('twit'),
      lodash = require('lodash'),
      Express = require('express'),
      SocketIO = require('socket.io'),
      RethinkDB = require('rethinkdbdash'),
      NodeGeocoder = require('node-geocoder');

// Load configuration file.
const config = require('./config.json');

// Declare app components.
let app = new Express(),
    server = Http.Server(app),
    io = new SocketIO(server);

// Connect to database.
//let r = new RethinkDB(config.rethinkdb);

// Expose static files to client.
app.use(Express.static(Path.join(__dirname, 'public')));

// Connect to Twitter API.
var twitter = new Twitter(config.twitter);

// Open tweet stream.
var stream = twitter.stream('statuses/filter', config.stream);

stream.on('tweet', tweet => {
  console.log(tweet.user.location);
});

// Start listening for incoming requests.
let port = config.port || 3000;

server.listen(port, () => {
  console.log(`Hasbara app started listening on port ${port}`);
});
