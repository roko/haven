const fetch = require("node-fetch");
const sentimentUrl = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
const config = require('./config');

const getSentimentScore = function(content
) {
  console.log('im in utils now ZZZ')
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

module.exports.getSentimentScore = getSentimentScore;