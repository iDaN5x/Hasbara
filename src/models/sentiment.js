const SentimentAnalyzer = require("../sentiment-analyzer.js"),
      CamelCase = require('camelcase-keys');

const {thinky} = require('../app-components.js'),
      Type = thinky.type;

// Create sentiment model.
const Sentiment = thinky.createModel('Sentiment', {
  id: Type.string(),
  polarity: Type.string().enum('positive', 'neutral', 'negative'),
  subjectivity: Type.string().enum('objective', 'subjective'),
  subjectivityConfidence: Type.number().min(0).max(1),
  polarityConfidence: Type.number().min(0).max(1),
  text: Type.string()
});

// Override toString method.
Sentiment.prototype.toString = function() {
  return `${this.subjectivity} ${this.polarity}`;
};

// Factory method.
Sentiment.from = async function(text) {
  // Check if anaylzed before.
  let sentiment = await Sentiment
                  .filter({text})
                  .run()[0];

  if (!sentiment) {
    // Get sentiment using Aylien Text API.
    let raw = await SentimentAnalyzer.analyze({
        'text': text,
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
