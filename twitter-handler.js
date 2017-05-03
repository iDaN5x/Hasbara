const Twitter = require('twit'),
      CamelCase = require('camelcase-keys');

const {io} = require('./app-components.js'),
      config = require('./config.json');

const Location = require('./models/location.js'),
      Tweet = require('./models/tweet.js'),
      User = require('./models/user.js');

class TwitterHandler {
  constructor() {
    // Initialize Twitter client.
    this.twitter = new Twitter(config.twitter);

    // Open tweets stream.
    this.stream = twitter.stream('statuses/filter', config.stream);

    // Register handlers.
    this.stream.on('tweet', this.onTweet);
  }

  onTweet(t) {
    // Only process tweets written in supported languages.
    if (config.supportedLanguages.contains(t.lang)) {
      // Get user location as GeoJson object.
      let userLocation = Location.from(t.user.location);

      // Grab pin coordinates.
      let coordinates = userLocation.coordinates || t.coordinates;

      // Only if coordinates exist.
      if (coordinates) {
        // Build user entry.
        let user = User.from(t.user);
        user.location = userLocation.

        // Build tweet entry.
        let tweet = new Tweet(t);
        tweet.sentiment = Sentiment.from(tweet.text);
        tweet.user = user;

        // Save tweet to database.
        await tweet.saveAll();
      }
    }
  }
}

module.exports = TwitterHandler;
