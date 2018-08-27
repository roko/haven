// Please rename this to be config.js and update with API keys
//also make sure the dummyConfig.js in the Journal component's dummyData folder has your router ip!

//get a free one at https://azure.microsoft.com/en-us/free/ - $200 credit so essentially free or borrow Ro's
const textAnalytics = {
  apiKey: 'UPDATE THIS'
}

//get a free one at https://market.mashape.com/healthruwords/universal-inspirational-quotes or borrow Ro's
const positiveQuote = {
  apiKey: 'UPDATE THIS'
}

//go to https://www.twilio.com/ to get your sid/token - texts are $0.0075-$0.04  each depending on inbound/outbound/region. Trial account has $14.50 credit but you will need to manually validate the To numbers on the Twilio website. To be able to send to nonvalidated numbers you need to upgrade account for $20. $1/month to maintain the From number, pay as you go for the text message sending.
const twilio = {
  sid: 'UPDATE THIS',
  token: 'UPDATE THIS'
}

module.exports.textAnalytics = textAnalytics;
module.exports.positiveQuote = positiveQuote;