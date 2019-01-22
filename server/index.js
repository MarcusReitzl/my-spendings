const cfg = require('./config.json');
const express = require('express');
const bodyParser = require('body-parser');
const bookingRoutes = require('./booking');
const db = require("./db");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.get('/',(request, response) => response.redirect('/booking'));

app.use("/booking", bookingRoutes);



db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
    console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")});



//test
