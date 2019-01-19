const model = require('./model');

function listAction(request, response) {
  response.send(model.getAllBookings());
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
