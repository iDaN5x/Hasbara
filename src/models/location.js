const NodeGeocoder = require('node-geocoder'),
    GeoJson = require('@mapbox/togeojson');

const {thinky} = require('../app-components.js'),
    config = require('../../config.json'),
    Type = thinky.type;

const User = require('./user.js');

// Connect to GeoCoder service.
const geocoder = NodeGeocoder(config.geocoder);

// Create location model.
const Location = thinky.createModel('Location', {
    id: Type.string(),
    coordinates: Type.point(),
    name: Type.string()
});

// Override toString method.
Location.prototype.toString = function () {
    return `${Location.name} (${location.coordinates.longitude},${location.coordinates.latitude})`;
};

// Factory method.
Location.from = async function (name) {
    // Check if known location.
    let location = await Location
        .filter({name})
        .run();

    if (location.length == 0) {
        // Geocode name.
        let geo = geocoder.geocode(name);

        geo.then(x => console.log(x)).catch(x => console.log(x));

        // If geo-coding succeeded.
        if (geo.length > 0) {
            // Convert google KML to GeoJson.
            let coordinates = GeoJson(geo);

            // Create a new location entry.
            location = new Location({name, coordinates});
        }
    }

    return location;
};

module.exports = Location;

// Create User<-Location relation.
Location.hasMany(User, 'users', 'name', 'locationName');
