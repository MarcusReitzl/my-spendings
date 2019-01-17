let cfg = require('../config.json');
const express = require('express');
const router = express.Router();
const getDb = require("../db").getDb;
let bodyParser = require('body-parser');



router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));



router.get('/:bookings', (req, res) => {
  const db = getDb();

  const queryString = "SELECT BP.Id AS PosId , BP.Price AS PosPreis, C.Name As Kategoriename, BH.Name AS Belegname, BH.Date AS Belegdatum FROM bookings_pos AS BP " +
                      "INNER JOIN bookings_head AS BH ON BH.id = BP.headId " +
                      "INNER JOIN categories AS C ON C.id = BP.katId ";


  db.query(queryString,(err, rows) => {
    if(err){

      res.status(400).json({message: "error occured"});
    }
    else if(rows.length < 1){


      res.status(401).json({message:"keine Buchungen vorhanden"});

    }
    else{
      let response = JSON.stringify(rows);

      res.status(200).json(response);

    }

  });

});

module.exports = router;
