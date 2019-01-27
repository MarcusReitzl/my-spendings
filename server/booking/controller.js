const model = require('./model');
const jwt = require('jsonwebtoken');


function listAction(request, response) {
  model.getAll(request.userId).then(
    bookings => {
      if(bookings.length < 1){
        response.status(401).json({message:"keine Buchungen vorhanden"});
        }
      else{
        response.status(200).json(bookings);
      }
    },
    error => response.send(error),

  );
}
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
function deleteAction(request, response) {
  let id = parseInt(request.params.id, 10);
  model.remove(id).then(
    results => {
      response.status(200).json({message:"Buchung wurde gelöscht"});
    },
    error => response.send(error),

  );

}

function updateAction(request, response) {
  const booking = {
    id: request.params.id,
    name: request.body.name,
    date: request.body.date,
    price: request.body.price,
    katId: request.body.katId,
  };
  model.save(booking,request.userId).then(
    booking => response.status(200).json(booking),
    error => response.status(500).json(error),
  );
}

function createAction(request, response) {

  const booking = {
    name: request.body.text,
    date: request.body.date,
    price: request.body.value,
    katId: request.body.katId,
  };
  model.save(booking,request.userId).then(
    booking => response.status(200).json(booking),
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
