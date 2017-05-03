const AylienTextAPI = require('aylien_textapi'),
      CamelCase = require('camelcase-keys');

const {thinky} = require('./app-components.js'),
      config = require('./config.json'),
      Types = thinky.types;

const Tweet = require('./tweet.js');

// Connect to Aylien's Text API.
let aylien = new AylienTextAPI(config.aylien);

// Create sentiment model.
const Sentiment = thinky.createModel('Sentiment', {
  id: Types.string(),
  polarity: Types.string().enum('positive', 'natural', 'negative'),
  subjectivity: Types.string().enum('objective', 'subjective'),
  subjectivityConfidence: Types.number().min(0).max(1),
  polarityConfidence: Types.number().min(0).max(1),
  text: Types.string()
});

// Factory method.
Sentiment.from = async function(text) {
  // Check if anaylzed before.
  let sentiment = await Sentiment
                  .filter({text: tweet.text})
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

// Create Tweet<-Sentiment relation.
Sentiment.hasMany(Tweet, "tweets", "text", "text");

module.exports = Sentiment;
