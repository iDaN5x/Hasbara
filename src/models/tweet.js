const CamelCase = require('camelcase-keys');

const {thinky} = require('../app-components.js'),
      Type = thinky.type;

// Create tweet model.
const Tweet = thinky.createModel('Tweet', {
  id: Type.number().integer(),
  lang: Type.string(),
  text: Type.string(),
  userId: Type.string(),
  createdAt: Type.date(),
  coordinates: Type.point(),
  retweetCount: Type.number().integer().min(0),
  favoriteCount: Type.number().integer().min(0)
});

// Override toString method.
Tweet.prototype.toString = function() {
  return `${this.user} tweeted the following ${this.sentiment} post:
          ${this.text}`;
};

// Factory method.
Tweet.from = async function(raw) {
  // Create tweet entitiy from raw data.
  let tweet = new Tweet(CamelCase(raw));

  // Set tweet's sentiment.
  tweet.sentiment = await Sentiment.from(tweet.text);

  // Save tweet to database.
  return tweet;
};

module.exports = Tweet;

const Sentiment = require('./sentiment.js'),
      User = require('./user.js');

// Create User->Tweet relation.
Tweet.belongsTo(User, 'user', 'userId', 'id');

// Create Tweet<-Sentiment relation.
Tweet.hasOne(Sentiment, 'sentiment', 'text', 'text');
