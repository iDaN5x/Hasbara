const NodeGeocoder = require('node-geocoder').
      GeoJson = require('@mapbox/togeojson');

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
Location.from = async function(name) {
  // Check if known location.
  let location = await Location
                 .filter({name})
                 .run();

  if (!location) {
    // Geocode name.
    let geo = await geocoder.geocode(name);

    // If geocoding succeeded.
    if (geo.length > 0) {
      // Convert google KML to GeoJson.
      let coordinates = GeoJson(geo);

      // Create a new location entry.
      location = new Location({name, coordinates});
    }
  }

  return location;
};

// Create User<-Location relation.
Location.hasMany(User, "users", "name", "locationName");

module.exports = Location;
