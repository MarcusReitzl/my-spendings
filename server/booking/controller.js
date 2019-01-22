const model = require('./model');

function listAction(request, response) {
  model.getAllBookings(1).then(
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
  let booking = request.body.booking;
  model.saveBooking(booking);
  response.redirekt(request.baseUrl)
}

module.exports = {
  listAction,
  deleteAction,
  formAction,
  saveAction
};
