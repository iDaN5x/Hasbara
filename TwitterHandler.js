const Twitter = require('twit'),
      CamelCase = require('camelcase-keys');

const Location = require('./models/location.js'),
      Tweet = require('./models/tweet.js'),
      User = require('./models/user.js');

class TwitterHandler {
  constructor(config) {
    // Initialize Twitter client.
    this.twitter = new Twitter(config.twitter);

    // Open tweets stream.
    this.stream = twitter.stream('statuses/filter', config.stream);

    // Register handlers.
    this.stream.on('tweet', this.onTweet);
  }

  onTweet(t) {
    // Create new tweet entry.
    let tweet = new Tweet(CamelCase(t));

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
    user.location = await Location.from(t.user.location) ||
                    user.location;

    // Save new/updated user.
    await user.saveAll();
  }
}

module.exports = TwitterHandler;
