const NodeGeocoder = require('node-geocoder'),

const {thinky} = require('./app-components.js'),
      Types = thinky.types;

const User = require('./user.js');

// Connect to GeoCoder service.
const geocoder = new NodeGeocoder(config.geocoder);

// Create location model.
const Location = thinky.createModel('Location', {
  id: Types.string().uuid(),
  coordinates: Types.point(),
  name: Types.string()
});

// Add static factory function.
Location.from = async function(name) {
  let geo = await geocoder.geocode(name);

  if (geo.length > 0) {
    let coordinates ={
      "type": "point",
      "coordinates": [geo[0].longitude, geo[0].latitude]
    };

    return new Location({name, coordinates});
  }

  return null;
};

// Create User<-Location relation.
Location.hasMany(User, "users", "name", "locationName");

module.exports = Location;
