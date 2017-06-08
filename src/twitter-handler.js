const Twitter = require('twit');

const config = require('../config.json');

const {User, Tweet, Location, Sentiment} = require('./models/all.js');

class TwitterHandler {
    constructor() {
        // Initialize Twitter client.
        this.twitter = new Twitter(config.twitter);

        // Open tweets stream.
        this.stream = this.twitter.stream('statuses/filter', config.stream);

        // Register handlers.
        this.stream.on('tweet', this.onTweet);
        this.stream.on('error', console.log);
    }

    async onTweet(t) {
        // Only process tweets written in supported languages.
        if (config.supportedLanguages.includes(t.lang)) {
            // Get user location as GeoJson object.
            let userLocation = await Location.from(t.user.location);

            // Grab pin coordinates.
            let coordinates = userLocation.coordinates || t.coordinates;

            // Only if coordinates exist.
            if (coordinates) {
                // Build user entry.
                let user = await User.from(t.user);
                user.location = userLocation;

                // Set tweet's sentiment.
                let sentiment = await Sentiment.from(t.text);

                // Build tweet entry.
                let tweet = await Tweet.from(t);
                tweet.sentiment = sentiment;
                tweet.user = user;

                // Save tweet to database.
                try {
                    let doc = await tweet.saveAll();
                    console.log(doc);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}

module.exports = TwitterHandler;
