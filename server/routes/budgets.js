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
    
    
    const query = `SELECT b.Id AS budgetId, b.Name AS budgetName, b.Amount AS value
                   FROM budgets b
                   WHERE b.userID = ?
                   `;

    connection.query(query,[userID], (err, row) =>{
        if(err){
            res.sendStatus(500);
            console.log(err);
        } else if(row.length === 0) {
            res.sendStatus(404);
        } else {
            let data = [];
           
            for(let budget of row){
                data.push({budgetId: budget.budgetId, 
                    budgetName:budget.budgetName, 
                    value: budget.value, 
                    includedCategories: []}); 
            }
            
            res.status(200).json(data);
        }
    });
});

router.post('/', checkAuth, (req, res) =>{
    //set Values
    let budgetName = req.body['name'];
    let userID = req.userId;
    let amount = req.body['amount'];
    
    //check for existing categorie
    // query= `SELECT * FROM budgets WHERE userID = ? and Name = ?`;
    // connection.query(query,[userID, budgetName],(err, row)=>{
    //     if(err){
    //         res.sendStatus(500);
    //     }else if(row.length > 0 ){
    //         res.status(200).json({message: 'Budget already exists!'})
    //     } else {
    console.log(userID);
    
    
            insertQuery=`INSERT INTO budgets (Name, Amount, userID ) VALUES (?, ?, ?)`;
            connection.query(insertQuery,[budgetName, amount, userID], (err)=>{
                if(err){
                    res.sendStatus(500);
                } else {
                    getInsertedID = `SELECT Id as budgetId, Name as budgetName, Amount as value FROM budgets WHERE userID = ?`;
                    connection.query(getInsertedID,[userID], (err, row)=>{
                        if(err){
                            res.sendStatus(500);
                        } else {
                            let data = []
                            for(let budget of row){
                                    data.push( {budgetId: budget.budgetId, 
                                        budgetName:budget.budgetName, 
                                        value: budget.value, 
                                        includedCategories: []})
                            }
                           
                            res.status(200).json(data);
                        }
                    })
                }
            })
   //     }
  //  })    
});

router.delete('/:id', checkAuth, (req, res)=>{
    let userID = req.userId;
    let budgetID = req.params.id;
    console.log('hello, im delete');

    let queryDeletCat = `DELETE FROM budgets WHERE userID = ? AND Id = ? `;
    connection.query(queryDeletCat, [userID, budgetID], (err)=>{
        if(err){
            console.log('there')
            res.sendStatus(500);
        } else {
            let queryUpdateBudgetId = `UPDATE categories SET BudgetId = 0 WHERE BudgetId = ? AND userID = ?`
            connection.query(queryUpdateBudgetId,[budgetID, userID], (err, row)=>{
                if(err){
                    res.sendStatus(500);
                }else{
                    console.log('here');
                    res.status(200).json(row);
                }
            })
        }
    });
});
//put to update Amount
router.put('/update/:id', checkAuth, (req, res) => {
    let budgetID = req.params.id;
    let userID = req.userId;
    let amount = req.body['value'];
    

    query = `UPDATE budgets SET Amount = ? WHERE userID = ? AND Id = ?`;
    connection.query(query,[amount, userID, budgetID], (err)=>{
        if(err){
            res.sendStatus(500);
        }else{
            console.log('sent 200')
            res.sendStatus(200);
        }
    });
});




module.exports = router;