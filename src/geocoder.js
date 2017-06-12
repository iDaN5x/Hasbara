/**
 * Created by idan5 on 6/4/2017.
 */
const NodeGeocoder = require('node-geocoder'),
      config = require("../config.json");

const geocoder = NodeGeocoder(config.geocoder);

module.exports.geocode = async function (name) {
    return new Promise((resolve, reject) => {
        if (!name) return;

        geocoder.geocode(name, (err, res) => {
           if (err) {
               reject(err);
           }

           else {
               if (res.length > 0) {
                   resolve([res[0].longitude, res[0].latitude]);
               } else {
                   resolve(null);
               }
           }
        });
    });
};