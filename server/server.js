const cfg = require('./config.json');
const express = require('express');
const db = require("./db");
const app = express();

let bodyParser = require('body-parser');

const bookingRoutes = require('./routes/booking');

app.use("/booking", bookingRoutes);

db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
    console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")});

//test
