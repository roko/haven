const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require('./../database/db');
const app = express();
app.use(bodyParser.json());

//commented out for the time being to get journal fetch get working
//placeholder get route
// app.get("*", (req, res) => {
//   res.status(200).send();
// });

//commented out for the time being to get journal posting working
//placeholder post route
// app.post("*", (req, res) => {
//   res.status(200).send();
// });

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
  }));
});

// //get all the user's entries from journal table
// app.get('/journal:userId', async (req, res) => {
//   console.log('we are retrieving this user\' journal entries', req.params.userId);
//   entries = await db.getJournalEntries(req.params.userId);
//   res.send(entries);
// });

const server = app.listen(PORT);
console.log(`Node server listening at http://localhost:${PORT}`);
