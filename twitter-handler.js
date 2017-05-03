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
    // Create new tweet entry.
    let tweet = Tweet.from(t);
    if (!tweet) return;

    // Check if exisiting user.
    let user = await User
              .filter({id: t.user.id})
              .getJoin({location: true})
              .run();

    // If new user create entry.
    if (!user) {
      user = new User(CamelCase(t.user));
    }

    // Update user location if chanegd.
    let currLocation = await Location.from(t.user.location);

    // If current location exist update user DB entry.
    if (currLocation != user.location) {
      user.location = currLocation;
      await user.saveAll({location: true});
    }

    // Get coordinates for tweet placement.
    let coordinates = user.location.coordinates || tweet.coordinates;


  }
}

module.exports = TwitterHandler;
