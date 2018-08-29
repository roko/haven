const fetch = require("node-fetch");
const sentimentUrl = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment';
const positivityUrl = 'https://healthruwords.p.mashape.com/v1/quotes/?maxR=1&size=medium&=Hope';
const config = require('./config');
const twilio = require('twilio')(config.twilio.sid, config.twilio.token);;

const sendForSupport = function (userFirstName, phoneNumbers, message) {

  for (var i = 0; i < phoneNumbers.length; i++) {
    twilio.messages
      .create({ 'from': '+14159854939', 'body': userFirstName + ' ' + message, 'to': '+1'+phoneNumbers[i] })
      .then((message) => console.log(message.sid))
      .done();
  }
}

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
module.exports.sendForSupport = sendForSupport;