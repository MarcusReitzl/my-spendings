const cfg = require('./config.json');
const express = require('express');
const bodyParser = require('body-parser');
const db = require("./db");
const cors = require('cors');

const bookingRoutes = require('./booking');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const categorieRoutes = require('./routes/categories');
const budgetRoutes = require('./routes/budgets');



const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.get('/',(request, response) => response.redirect('/booking'));

app.use("/booking", bookingRoutes);
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/categories", categorieRoutes);
app.use("/budgets", budgetRoutes);

db.initDb.then(() => {
  app.listen(cfg.server.port, () => {
    console.log("Listening on port " + cfg.server.port + "...");
  });
}, () => {console.log("Failed to connect to DB!")});



//test
