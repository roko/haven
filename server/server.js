const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const util = require('./serverUtils');
const db = require('./../database/db');
const app = express();
app.use(bodyParser.json());

//create an entry in journal table
app.post('/journal', (req, res) => {
  console.log('is this posting', req.body);
  db.addJournalEntry(req);
  res.sendStatus(200);
});

//get all the user's entries from journal table
app.get('/journal/:userId', async (req, res) => {
  entries = await db.getJournalEntries(req.params.userId, ((entries, rows) => {
    if (entries) {
      res.send(entries);
    }
    console.log('did we get entries')
  }));
});

app.get('/analyze/:content', async (req, res) => {
  score = await util.getSentimentScore(req.params.content);
  console.log('what is score', score);
  res.send(JSON.stringify(score));
});

app.get('/positive/', async (req, res) => {
  quoteImage = await util.getPositiveQuote();
  res.send(JSON.stringify(quoteImage));
});

app.post('/support/', async (req,res) => {
  console.log('getting some support!', req.body);
  await util.sendForSupport(req.body.userFirstName, req.body.phoneNumbersOfTrustedConfidantes, req.body.setMessageForSupport);
  res.sendStatus(200);
  console.log('req sent!')
})

const server = app.listen(PORT);
console.log(`Node server listening at http://localhost:${PORT}`);
