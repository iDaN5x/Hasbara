const AylienTextAPI = require('aylien_textapi'),
      CamelCase = require('camelcase-keys');

const {thinky} = require('../app-components.js'),
      config = require('../../config.json'),
      Type = thinky.type;

// Connect to Aylien's Text API.
let aylien = new AylienTextAPI(config.aylien);

// Create sentiment model.
const Sentiment = thinky.createModel('Sentiment', {
  id: Type.string(),
  polarity: Type.string().enum('positive', 'natural', 'negative'),
  subjectivity: Type.string().enum('objective', 'subjective'),
  subjectivityConfidence: Type.number().min(0).max(1),
  polarityConfidence: Type.number().min(0).max(1),
  text: Type.string()
});

// Factory method.
Sentiment.from = async function(text) {
  // Check if anaylzed before.
  let sentiment = await Sentiment
                  .filter({text})
                  .run();

  if (!sentiment) {
    // Get sentiment using Aylien Text API.
    let raw = await aylien.sentiment({
      'text': raw.text,
      'mode': 'tweet'
    });

    // Create sentiment entry from raw data.
    sentiment = new Sentiment(CamelCase(raw));
  }

  return sentiment;
};

module.exports = Sentiment;

const Tweet = require('./tweet.js');

// Create Tweet<-Sentiment relation.
Sentiment.hasMany(Tweet, 'tweets', 'text', 'text');
