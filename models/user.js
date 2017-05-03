const {thinky} = require('./AppComponents.js'),
      User = require('./tweet.js');

const Types = thinky.types;

// Create user model.
const User = thinky.createModel('User', {
  id: Types.string(),
  locationName: Types.string(),
  statusCount: Types.number().integer().min(0),
  followersCount: Types.number().integer().min(0)
});

// Create User->Tweet relation.
User.hasMany(Tweet, "tweets", "id", "userId");

// Create User<-Location relation.
User.hasOne(Location, "location", "locationName", "name");

module.exports = Tweet;
