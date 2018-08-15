const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const db = require('./../database/db');
const app = express();
app.use(bodyParser.json());

//placeholder get route
app.get("*", (req, res) => {
  res.status(200).send();
});

//commented out for the time being to get journal posting working
//placeholder post route
// app.post("*", (req, res) => {
//   res.status(200).send();
// });

//make server create an entry in journal table
app.post('/journal', (req, res) => {
  console.log('is this posting', req.body);
  db.runSchema('havendata.db');
  db.addJournalEntry(req);
      res.sendStatus(200);
});

const server = app.listen(PORT);
console.log(`Node server listening at http://localhost:${PORT}`);
