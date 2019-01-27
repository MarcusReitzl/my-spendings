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
    
    
    const query = `SELECT c.Id as id, c.Name AS name, c.amount AS value
                   FROM categories c
                   WHERE c.userID = ?; 
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
    query= `SELECT * FROM categories WHERE userID = ? and Name = ?`;
    connection.query(query,[userID, categorie],(err, row)=>{
        if(err){
            
            res.sendStatus(500);
        }else if(row.length > 0 ){
            res.status(200).json({message: 'Categorie already exists!'})
        } else {
            insertQuery=`INSERT INTO categories (Name, userID) VALUES (?, ?)`;
            connection.query(insertQuery,[categorie, userID], (err)=>{
                if(err){
                   
                    res.sendStatus(500);
                } else {
                    getInsertedID = `SELECT Id as id, Name as name, amount as value  FROM categories WHERE Name = ? and userID = ?`;
                    connection.query(getInsertedID,[categorie, userID], (err, row)=>{
                        if(err){
                            
                            res.status(500);
                        } else {
                            console.log(row);
                            res.status(200).json(row);
                        }
                    })
                }
            })
        }
    })    
});

router.get('/budgetCat/:id', checkAuth, (req, res)=>{
    let userID = req.userId;
    let budgetID = req.params.id
    
    
    const query = `SELECT c.Id , c.Name as name, c.amount FROM categories c WHERE BudgetId = ? AND userID = ?`;

    connection.query(query,[budgetID, userID], (err, row) =>{
        if(err){
            res.sendStatus(500);
            console.log(err);
        } else if(row.length === 0) {
            res.status(200);
        } else {
            console.log(row);
            res.status(200).json(row);
        }
    });
});

router.delete('/delete/:id', checkAuth, (req, res)=>{
let userID = req.userId;
let catName = req.params.id;


queryDeletCat = `DELETE FROM categories WHERE Id = ?`

    connection.query(queryDeletCat, [catName], (err, row)=>{
        if(err){
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    })
});

router.put('/update/:id', checkAuth, (req, res) => {
    let catID = req.params.id;
    let userID = req.userId;
    let amount = req.body['amount'];

    query = `UPDATE categories SET amount = amount + ? WHERE Id = ? AND userID = ?`;
    connection.query(query,[amount, catID, userID], (err, row)=>{
        if(err){
            res.sendStatus(500);
        }else{
            res.sendStatus(200);
        }
    });

});

router.put('/budgetID/:id', checkAuth, (req, res)=> {
    categorieID = req.params.id;
    budgetID = req.body.budgetID;
    userID = req.userId;
    
    query = `SELECT BudgetId FROM categories WHERE userID = ? AND Id = ?`
    connection.query(query,[userID, categorieID], (err,row)=>{
        if(err){
           
            res.sendStatus(500);
        } else if (row.length === 0){
            queryUpdate = `UPDATE categories SET BudgetId = ? WHERE Id = ? AND userID = ?`
            connection.query(queryUpdate,[budgetID, categorieID, userID],(err)=>{
                if(err){
                    
                    res.sendStatus(500);
                } else {
                    
                    res.sendStatus(200);
                }
            })
        }else if(row.length > 0){ 
            for(let i = 0; i < row.length; i++){
                if(row[i].BudgetId === budgetID){
                    res.status(400).json({message: 'Already done'})
                }else{
                    queryUpdate = `UPDATE categories SET BudgetId = ? WHERE Id = ? AND userID = ?`
                    connection.query(queryUpdate,[budgetID, categorieID, userID],(err)=>{
                        if(err){
                            
                            res.sendStatus(500);
                        } else {
                            
                            res.sendStatus(200);
                        }
                    })
                }
            }
        } 
    })

    
    });


module.exports = router;