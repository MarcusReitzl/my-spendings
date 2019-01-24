const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser')
const connection = require("../db").getDb();
const jwt = require('jsonwebtoken');
const checkAuth = require('../checkAuth');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get('/', checkAuth, (req, res)=>{
    let userdate;
    let userID = req.userId;


    const query = `SELECT c.Id as id, c.Name AS name, uc.categorieAmount AS amount
                   FROM categories c, usercategorie uc, users u
                   WHERE c.Id = uc.userID
                   AND uc.userID = ?; 
                    `;
    connection.query(query,[], (err, row) =>{
        if(err){
            res.sendStatus(500);
        } else if(row.length = 0) {
            response.sendStatus(403);
        } else {
            response.json(row);
        }
    });
});

router.post('/saveNew', checkAuth, (req, res) =>{
    let categorie = req.body;
    let userID = req.userId;

    const querySELECT = `SELECT u.id, users u WHERE c.name = ?;`; 

    connection.query(querySELECT,[categorie.name],(err, row) => {
        if(err){
            res.sendStatus(500);
        } else if (row.length > 0){
        
        } else {
            const queryINSERTfirst = `INSERT INTO categories (name)
                    VALUES (?);`;
            
            const queryINSERTsecond = `INSERT INTO usercategorie (userID, categorieID, categorieAmount)
                                       VALUE ()`

            connection.query(query,[categorie.name], (err, row)=>{
                if(err){
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });

        }
    })

    
})