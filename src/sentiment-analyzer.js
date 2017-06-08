/**
 * Created by idan5 on 6/4/2017.
 */
const AylienTextAPI = require('aylien_textapi'),
    config = require("../config.json");

const aylien = new AylienTextAPI(config.aylien);

module.exports.analyze = async function(info) {
    return new Promise(function(resolve, reject) {
        aylien.sentiment(info, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        });
    });
}