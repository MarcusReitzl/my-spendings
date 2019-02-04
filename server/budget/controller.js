/*
Budget-Controller

Definiert die Methoden welche im Router angegeben werden. Verarbeitet den Request leitet diese an die Model weiter und
schickt Repsonse zurück an den Client.
 */

const model = require('./model');


/*
Funktion um alle Budgets für jeweilige UserId zurückzugeben
 */
function listAction(request, response) {
    model.getAll(request.userId).then(
        budgets => {
            if(budgets.length < 1){
                response.status(200).json({message:"keine Budgets vorhanden"});
            }
            else{
                response.status(200).json(budgets);
            }
        },
        error => response.send(error)
    );
}
/*
Funktion um genau ein Budget zurückzugeben. Parameter Id wird ausgelesen und zur Abfrage weitergeleitet
 */
function detailAction(request, response) {
    let id = parseInt(request.params.id, 10);
  
    model.get(id,request.userId).then(
        categorie => {
            if(categorie.length < 1){
                
                response.status(200).json([]);
            }
            else{
                response.status(200).json(categorie);
            }
        },
      error => response.send(error)  
    );
  }
/*
Funktion löscht Budgets abhängig von der übergebenen Budget Id
 */
function deleteAction(request, response) {
    let id = parseInt(request.params.id, 10);
    
    model.remove(id, request.userId).then(
      results => {
        response.status(200).json(results);
      },
      error => response.send(error),
    );
}


/*
Funktion updatet Budgets
 */
function updateAction(request, response) {
    const budget = {
      id: request.params.id,
      name: request.body.name,
      amount: request.body.amount
    };
  
    model.save(budget,request.userId).then(
      categorie => response.status(200).json(categorie),
      error => response.status(500).json(error),
    );
}
/*
Funktion fügt neues Budget in die Datenbank
 */
function createAction(request, response) {
    const categorie = {
        name: request.body.name,
        amount: request.body.amount
    };
    
    model.save(categorie,request.userId).then(
      categorie => response.status(200).json(categorie),
      error => response.status(500).json(error),
    );
    
}

  module.exports = {
    listAction,
    deleteAction,
    createAction,
    updateAction,
    detailAction
  };
