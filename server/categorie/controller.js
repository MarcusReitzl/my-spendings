const model = require('./model');

function listAction(request, response) {
    model.getAll(request.userId).then(
        categories => {
            if(categories.length < 1){
                response.status(200).json({message:"keine Kategorien vorhanden"});
            }
            else{
                response.status(200).json(categories);
            }
        },
        error => response.send(error)
    );
}

  function detailAction(request, response) {
    let id = parseInt(request.params.id, 10);
  
    model.get(id,request.userId).then(
        categorie => {
            if(categorie.length < 1){
                response.status(401).json({message:"keine Kategorie gefunden"});
            }
            else{
                response.status(200).json(categorie);
            }
        },
      error => response.send(error)  
    );
  }

  function deleteAction(request, response) {
    let id = parseInt(request.params.id, 10);
    
    model.remove(id, request.userId).then(
      results => {
        response.status(200).json(results);
      },
      error => response.send(error),
    );
  }

  function updateAction(request, response) {

    const categorie = {
      id: request.params.id,
      name: request.body.name,
      amount: request.body.amount,
      budgetId: request.body.budgetId
    };
    model.save(categorie,request.userId).then(
      categorie => response.status(200).json(categorie),
      error => response.status(500).json(error),
    );
  }

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
    detailAction,
    deleteAction,
    createAction,
    updateAction
  };