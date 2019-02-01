const connection = require("../db").getDb();

function getAll(userId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT c.Id as id, c.Name AS name, c.amount AS value
        FROM categories c
        WHERE c.userID = ?;`;
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
        `SELECT BudgetId FROM categories 
         WHERE userID = ?
         AND Id = ? `
  
      connection.query(query,[userId, id],(error, results)=>{
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
        const query =
        `DELETE FROM categories WHERE Id = ? AND userID = ?`;
        connection.query(query,[id,userId],(error)=>{
            if (error){
                reject(error)
            } else {
                resolve(getAll(userId));
            }
        });
    });
}

function save(categorie,userId){
    if (!categorie.id) {
    console.log(categorie)
      return insert(categorie, userId);
    } else {
       
      return update(categorie, userId);
    }
}
  
function insert(categorie, userId) {
    return new Promise((resolve, reject) => {
        query = `INSERT INTO categories (Name, userID, BudgetId, amount) VALUES (?, ?, ?, ?)`;
         connection.query(query, [categorie.name, userId, 0,  categorie.amount],(error) => {
            if (error) {
                reject(error);
            } else {   
                resolve(getAll(userId));
            }
        });
    });
}
  
function update(categorie, userId) {
    if(categorie.budgetId === undefined){
        return new Promise((resolve, reject) => {
            const query =
            'UPDATE categories SET amount = ? WHERE userID = ? AND Id = ?';
                connection.query(query,[ categorie.amount, userId, categorie.id], (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(getAll(userId));
                }
            });
        });
    } else {
     
        return new Promise((resolve, reject) => {
            const query =
            'UPDATE categories SET BudgetId = ? WHERE userID = ? AND Id = ?';
                connection.query(query,[ categorie.budgetId, userId, categorie.id], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        }); 
    }

}

module.exports = {
    getAll,
    remove,
    save,
    get
  };
  