const GeoCoder = require('../geocoder.js');

const {thinky} = require('../app-components.js'),
    Type = thinky.type;

const User = require('./user.js');

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
    if (name == null || name === "") {
        return null;
    }

    // Check if known location.
    let indexed = await Location
        .filter({name})
        .run();

    if (indexed.length > 0) {
        var location = indexed[0];
    }

    else {
        // Geocode name.
        let coordinates = await GeoCoder.geocode(name);

        if (coordinates) {
            // Create a new location entry.
            location = new Location({name, coordinates});
        }
    }

    return location;
};

module.exports = Location;

// Create User<-Location relation.
Location.hasMany(User, 'users', 'name', 'locationName');
