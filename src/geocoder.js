/**
 * Created by idan5 on 6/4/2017.
 */
const NodeGeocoder = require('node-geocoder'),
      config = require("../config.json");

const geocoder = NodeGeocoder(config.geocoder);

const originalGeocode = geocoder.geocode;

geocoder.geocode = function(name) {
    return new Promise(function(resolve, reject) {
        originalGeocode.apply(geocoder, [name, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve([res[0].latitude, res[0].longitude]);
            }
        }]);
    });
};

module.exports = geocoder;