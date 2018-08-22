const fetch = require("node-fetch");
const sentimentUrl = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
const positivityUrl = 'https://healthruwords.p.mashape.com/v1/quotes/?maxR=1&size=medium&=Hope';
const config = require('./config');

const getSentimentScore = function(content) {
  return fetch(sentimentUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": config.textAnalytics.apiKey,
      "Accept": "application/json"
    },
    json: true,
    body: JSON.stringify({
      documents: [
        {
          "language": "en",
          "id": "1",
          "text": content
        }]
    })
  })
  .then((response) => {
    return response.json();
  })
  .then((response) => {
      return response.documents[0] ? response.documents[0].score : 'undefined'
  })
    .catch(err => console.error(err));
}

const getPositiveQuote = function () {
  return fetch(positivityUrl, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "X-Mashape-Key": config.positiveQuote.apiKey
    }
  })
  .then((response) => response.json())
  .then ((response) => {
    console.log('what did we get', response);
    return response[0] ? response[0].media : 'undefined'
  })
  .catch(err => console.log(err));
}
module.exports.getPositiveQuote = getPositiveQuote;
module.exports.getSentimentScore = getSentimentScore;