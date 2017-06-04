const CamelCase = require('camelcase-keys');

const {thinky} = require('../app-components.js'),
      Type = thinky.type;

// Create user model.
const User = thinky.createModel('User', {
  id: Type.string(),
  locationName: Type.string(),
  statusCount: Type.number().integer().min(0),
  followersCount: Type.number().integer().min(0)
});

// Override toString method.
User.prototype.toString = function() {
  return `@${this.id} from ${this.location}`;
};

// Factory method.
User.from = async function(raw) {
  // Check if exisiting user.
  let user = await User
            .filter({id: raw.id})
            .getJoin({location: true})
            .run()[0];

  if (!user) {
    // Raw location is not GeoJson.
    delete raw['location'];

    // Create tweet entitiy from raw data.
    user = new User(CamelCase(raw));
  }

  return user;
};

module.exports = User;

const Tweet = require('./tweet.js'),
      Location = require('./location.js');

// Create User->Tweet relation.
User.hasMany(Tweet, 'tweets', 'id', 'userId');

// Create User<-Location relation.
User.hasOne(Location, 'location', 'locationName', 'name');
