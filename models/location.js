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

// Factory method.
Location.prototype.constructor = async function(name) {
  // Check if known location.
  let location = await Location.
                 .filter({name})
                 .run();

  // Geocode name.
  let geo = await geocoder.geocode(name);

  // If geocoding succeeded.
  if (geo.length > 0) {
    // Convert google KML(?) to GeoJson.
    let coordinates ={
      "type": "point",
      "coordinates": [geo[0].longitude, geo[0].latitude]
    };

    // Create a new location entry.
    location = new Location({name, coordinates});
  }

  return location;
};

// Create User<-Location relation.
Location.hasMany(User, "users", "name", "locationName");

module.exports = Location;
