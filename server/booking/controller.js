const model = require('./model');
const jwt = require('jsonwebtoken');

//Gibt alle Buchungen des Users an den Client weiter
function listAction(request, response) {
  model.getAll(request.userId).then(
    bookings => {
      if(bookings.length < 1){
        response.status(200).json({message:"keine Buchungen vorhanden"});
        }
      else{
        response.status(200).json(bookings);
      }
    },
    error => response.send(error),

  );
}

//Gibt auch einzelne Buchungen an den Client weiter
function detailAction(request, response) {
  let id = parseInt(request.params.id, 10);

  model.get(id,request.userId).then(
    booking => {
      if(booking.length < 1){
        response.status(401).json({message:"keine Buchung gefunden"});
      }
      else{
        response.status(200).json(booking);
      }
    },
    error => response.send(error),

  );
}

//Löscht Buchung aus der DB mit der übereinstimmenden ID
function deleteAction(request, response) {
  let id = parseInt(request.params.id, 10);
  model.remove(id, request.userId).then(
    results => {
      response.status(200).json(results);
    },
    error => response.send(error),
  );
}

//Aktualisiert eine Buchung in der DB
function updateAction(request, response) {
  const booking = {
    id: request.params.id,
    name: request.body.name,
    date: request.body.date,
    amount: request.body.amount,
    katId: request.body.katId
  };
  model.save(booking,request.userId).then(
    booking => response.status(200).json(booking),
    error => response.status(500).json(error),
  );
}

//Fügt der DB eine neue Buchung hinzu
function createAction(request, response) {

  const booking = {
    name: request.body.text,
    date: request.body.date,
    amount: request.body.amount,
    katId: request.body.katId,
  };
  console.log(booking);

  model.save(booking,request.userId).then(
    booking => response.status(200).json(booking),
    error => response.status(500).json(error),
  );
  
}
//export für Aufruf
module.exports = {
  listAction,
  detailAction,
  deleteAction,
  createAction,
  updateAction
};
