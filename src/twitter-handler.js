const Twitter = require('twit');

const config = require('../config.json');

const { User, Tweet, Location, Sentiment } = require('./models/all.js');

class TwitterHandler {
  constructor() {
    // Initialize Twitter client.
    this.twitter = new Twitter(config.twitter);

    // Open tweets stream.
    this.stream = this.twitter.stream('statuses/filter', config.stream);

    // Register handlers.
    this.stream.on('tweet', this.onTweet);
  }

  async onTweet(t) {
    console.log(t.text);

    // Only process tweets written in supported languages.
    if (config.supportedLanguages.contains(t.lang)) {
      // Get user location as GeoJson object.
      let userLocation = Location.from(t.user.location);

      // Grab pin coordinates.
      let coordinates = userLocation.coordinates || t.coordinates;

      // Only if coordinates exist.
      if (coordinates) {
        // Build user entry.
        let user = await User.from(t.user);
        user.location = userLocation;

        // Build tweet entry.
        let tweet = new Tweet(t);
        tweet.sentiment = await Sentiment.from(tweet.text);
        tweet.user = user;

        // Save tweet to database.
        await tweet.saveAll();
      }
    }
  }
}

module.exports = TwitterHandler;
