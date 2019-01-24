const model = require('./model');
const jwt = require('jsonwebtoken');


function listAction(request, response) {
  model.getAllBookings(request.userId).then(
    bookings => {
      if(bookings.length < 1){
        response.status(401).json({message:"keine Buchungen vorhanden"});
        }
      else{
        /*const bookingsResponse = {
          bookings,
          links: [{rel: 'self', href: request.baseUrl + '/'}],
        }; */
        response.status(200).json(bookings);
      }
    },
    error => response.send(error),

  );
}
function deleteAction(request, response) {
  let id = parseInt(request.params.id, 10);
  model.deleteBooking(id);
  response.redirect(request.baseUrl)
}

function formAction(request, response) {
  response.send(model.getBooking(parseInt(request.params.id,10)));
}

function saveAction(request, response) {
  
  //Verify the Token, Userdata in the payload

  // jwt.verify(request.token, 'secretkey', (err, authData) => {
  //   if(err) {
  //     response.sendStatus(403);
  //   } else {
  //     // do something with the data
  //     response.json({
  //       authData
  //     });
  //   }
  // });

let booking = request.body;
model.saveBooking(booking);
  
}

module.exports = {
  listAction,
  deleteAction,
  formAction,
  saveAction
};
