/**
 * Created by idan5 on 6/4/2017.
 */
const NodeGeocoder = require('node-geocoder'),
      config = require("../config.json");

const geocoder = NodeGeocoder(config.geocoder);

module.exports.geocode = async function (name) {
    return new Promise((resolve, reject) => {
        geocoder.geocode(name, (err, res) => {
           if (err) reject(err);
           else resolve(res);
        });
    });
};