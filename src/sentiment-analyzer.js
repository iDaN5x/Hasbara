/**
 * Created by idan5 on 6/4/2017.
 */
const AylienTextAPI = require('aylien_textapi'),
    config = require("../config.json");

const aylien = new AylienTextAPI(config.aylien);

const SentimentAnalyzer = {
    analyze: async function(info) {
        return new Promise((resolve, reject) => {
           aylien.sentiment(info, (err, res) => {
              if (err) reject(err);
              else resolve(res);
           });
        });
    }
};

module.exports = SentimentAnalyzer;