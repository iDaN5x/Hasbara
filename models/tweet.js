const {thinky} = require('./AppComponents.js'),
      User = require('./user.js');

const Types = thinky.types;

// Create tweet model.
const Tweet = thinky.createModel('Tweet', {
  id: Types.string(),
  lang: Types.string(),
  text: Types.string(),
  userId: Types.string(),
  createdAt: Types.date(),
  coordinates: Types.point(),
  retweetCount: Types.inetger(),
  favoriteCount: Types.number().min(0)
});

// Create User->Tweet relation.
Tweet.belongsTo(User, "user", "userId", "id");

module.exports = Tweet;
