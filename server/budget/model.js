const connection = require("../db").getDb();

function getAll(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT b.Id AS budgetId, b.Name AS budgetName, b.Amount AS value
        FROM budgets b
        WHERE b.userID = ?
        `;
        connection.query(query,[userId],(error, results)=>{
            if (error){
                reject(error)
            } else {
                resolve(results);
            }
        });
    });
}

function get(id, userId) {
    
    return new Promise((resolve, reject) => {
  
      const query =
        `SELECT c.Id , c.Name as name, c.amount FROM categories c WHERE BudgetId = ? AND userID = ? `
  
      connection.query(query,[id, userId],(error, results)=>{
        if (error){
          reject(error)
        } else {
          resolve(results);
        }
      });
  
    });
  }

function remove(id, userId) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM budgets WHERE userID = ? AND Id = ? `;
        connection.query(query,[userId, id],(error)=>{
            if (error){
                reject(error)
            } else {
                resolve(getAll(userId));
            }
        });
    });
}

function save(budget,userId){
    if (!budget.id) { 
        
      return insert(budget, userId);
    } else {
      return update(budget, userId);
    }
}
  
function insert(budget, userId) {
    return new Promise((resolve, reject) => {
        query = `INSERT INTO budgets (Name, Amount, userID ) VALUES (?, ?, ?)`;
         connection.query(query, [budget.name, budget.amount, userId],(error) => {
            if (error) {
                reject(error);
            } else {   
                resolve(getAll(userId));
            }
        });
    });
}
  
function update(budget, userId) {
    return new Promise((resolve, reject) => {
        const query =
        `UPDATE budgets SET Amount = ? WHERE userID = ? AND Id = ?`;
            connection.query(query,[budget.amount, userId, budget.id], (error) => {
            if (error) {
                reject(error);
            } else {
                resolve(getAll(userId));
            }
        });
    });
}

module.exports = {
    getAll,
    remove,
    save,
    get
  };
  