const CamelCase = require('camelcase-keys');

const {thinky} = require('./app-components.js'),
      Types = thinky.types;

const Tweet = require('./tweet.js'),
      Location = require('./location.js');

// Create user model.
const User = thinky.createModel('User', {
  id: Types.string(),
  locationName: Types.string(),
  statusCount: Types.number().integer().min(0),
  followersCount: Types.number().integer().min(0)
});

// Factory method.
User.from = async function(raw) {
  // Check if exisiting user.
  let user = await User
            .filter({id: raw.id})
            .getJoin({location: true})
            .run();

  if (!user) {
    // Raw location is not GeoJson.
    delete raw["location"];

    // Create tweet entitiy from raw data.
    let user = new User(CamelCase(raw));
  }

  return user;
}

// Create User->Tweet relation.
User.hasMany(Tweet, "tweets", "id", "userId");

// Create User<-Location relation.
User.hasOne(Location, "location", "locationName", "name");

module.exports = User;
