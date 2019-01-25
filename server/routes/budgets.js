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
    let userID = req.userId;
    
    
    const query = `SELECT b.Id as id, b.Name AS name, bc.amount AS value
                   FROM budgets b, budgetscategories bc
                   WHERE b.Id = uc.categorieID
                   AND uc.userID = ?; 
                `;

    connection.query(query,[userID], (err, row) =>{
        if(err){
            res.sendStatus(500);
        } else if(row.length === 0) {
            res.status(404);
        } else {
            res.status(200).json(row);

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
        } else if (row.length > 0){     //categorie exists
            let catId = row[0].Id;
            //<--------------------- check if categorie exists for this user  ------------------>
            const queryCheckForUser = `SELECT * FROM usercategorie WHERE userID = ? AND categorieID = ?`
            const queryINSERTsecond = `INSERT INTO usercategorie (userID, categorieID, categorieAmount) OUTPUT INSERTED.Id VALUE (?,?,0)`;
            connection.query(queryCheckForUser,[userID, catId], (err, row)=>{          
                if(err){
                    row.sendStatus(500);
                } else if(row.length === 0) {         // does not exist for this user
                    console.log('does not exist for this user');
                    connection.query(queryINSERTsecond,[userID, catId],(err, row)=>{
                        if(err){
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    });
                }
            });
        } else if (row.length === 0) {
            //categorie does not exit => insert into categories and usercategorie
            const queryINSERTfirst = `INSERT INTO categories (name) VALUES (?);`;
            const queryINSERTsecond = `INSERT INTO usercategorie (userID, categorieID, categorieAmount)OUTPUT INSERTED.Id SELECT (?,id,0) FROM categories WHERE Name = ?`;

            connection.query(queryINSERTfirst,[categorie], (err, row)=>{
                if(err){
                    res.sendStatus(500);
                } else {
                    let id = row[0].Id;
                    connection.query(queryINSERTsecond,[userID],(err)=>{
                        if(err){
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(200);
                        }
                    });
                }
            });      
        } 
    })    
})
router.delete('/delete/:name', checkAuth, (req, res)=>{
let userID = req.userId;
let catName = req.params.name;

queryCatID = `SELECT Id FROM categories WHERE Name = ?`
queryDeletCat = `DELETE FROM usercategorie WHERE userID = ? and categorieID = ?`

connection.query(queryCatID, [catName], (err, row)=>{
    if(err){
        res.sendStatus(500);
    } else {
        let catID = row[0].Id;
        connection.query(queryDeletCat,[userID, catID],(err, row)=>{
            if(err){
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        })
    }
})


});

router.put('/update/:id', checkAuth, (req, res) => {
    let catID = req.params.id;
    let userID = req.userId;
    let amount = req.body['amount'];

    query = `UPDATE usercategorie SET categorieAmount = categorieAmount + ? WHERE userID = ? AND categorieID = ?`;
    connection.query(query,[amount, userID, catID], (err, row)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });

})
module.exports = router;