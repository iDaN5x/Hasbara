const CamelCase = require('camelcase-keys');

const {thinky} = require('./app-components.js'),
      Types = thinky.types;

const Sentiment = require('./sentiment.js'),
      User = require('./user.js');

// Create tweet model.
const Tweet = thinky.createModel('Tweet', {
  id: Types.string(),
  lang: Types.string(),
  text: Types.string(),
  userId: Types.string(),
  createdAt: Types.date(),
  coordinates: Types.point(),
  retweetCount: Types.number().inetger().min(0),
  favoriteCount: Types.number().integer().min(0)
});

// Factory method.
Tweet.from = async function(raw) {
  // Create tweet entitiy from raw data.
  let tweet = new Tweet(CamelCase(raw));

  // Get tweet text's sentiment.
  let sentiment = await Sentiment.from(tweet.text);

  // Set tweet's sentiment.
  tweet.sentiment = sentiment;

  // Save tweet to database.
  return await tweet.saveAll({sentiment: true});
};

// Create User->Tweet relation.
Tweet.belongsTo(User, "user", "userId", "id");

// Create Tweet<-Sentiment relation.
Tweet.hasOne(Sentiment, "sentiment", "text", "text");

module.exports = Tweet;
