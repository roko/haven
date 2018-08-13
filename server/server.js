const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

//placeholder get route
app.get("*", (req, res) => {
  res.status(200).send();
});

//placeholder post route
app.post("*", (req, res) => {
  res.status(200).send();
});

const server = app.listen(PORT);
console.log(`Node server listening at http://localhost:${PORT}`);
