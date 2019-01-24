const Router = require('express').Router;
const router = Router();
const bodyParser = require('body-parser')
const connection = require("../db").getDb();
const checkAuth = require('../checkAuth');
const cors = require('cors');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(cors());

router.get('/', checkAuth, (req, res)=>{
   
    let userdate;
    let userID = req.userId;


    const query = `SELECT c.Id as id, c.Name AS name, uc.categorieAmount AS amount
                   FROM categories c, usercategorie uc, users u
                   WHERE c.Id = uc.userID
                   AND uc.userID = ?; 
                    `;
    connection.query(query,[userID], (err, row) =>{
        if(err){
            res.sendStatus(500);
        } else if(row.length === 0) {
            res.status(404);
        } else {
            console.log(row);
            res.json(row);
        }
    });
});


router.post('/save', checkAuth, (req, res) =>{
    //set Values
    
    let categorie = req.body['categorie'];
    let userID = req.userId;

    //check for existing categorie
    const querySELECT = `SELECT c.Id FROM categories c WHERE c.name = ?;`; 
    
    connection.query(querySELECT,[categorie],(err, row) => {
        if(err){
            res.sendStatus(500);
            console.log('first')
        } else if (row.length > 0 &&){
            //still need an if + query
            let catId = row[0].Id;
            
            //if categorie exists => insert into usercategorie
            const queryINSERTsecond = `INSERT INTO usercategorie (userID, categorieID, categorieAmount)
                                       VALUE (?,?,0)`;
            connection.query(queryINSERTsecond,[userID, catId],(err, res)=>{
                if(err){
                    res.sendStatus(500);
                    console.log('second')
                } else {
                    res.sendStatus(200);
                }
            });


        } else if (row.length === 0) {
            
            //categorie does not exit => insert into categories and usercategorie
            const queryINSERTfirst = `INSERT INTO categories (name) VALUES (?);`;
            const queryINSERTsecond = `INSERT INTO usercategorie (userID, categorieID, categorieAmount) SELECT (?,id,0) FROM categories WHERE Name = ?`;

            connection.query(queryINSERTfirst,[categorie], (err, res)=>{
                if(err){
                    res.sendStatus(500);
                    console.log('third')
                } else {
                    res.sendStatus(200);
                }
            });

            connection.query(queryINSERTsecond,[userID],(err, res)=>{
                if(err){
                    console.log('four')
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });

        } else if(row.length > 0 && userID === row[0].Id){
            res.json({messsage:'Exists already'});
        }
    })

    
})

module.exports = router;