let data = [
  {id:1, name: "testbooking",price: 100.00}
];

function getAllBookings() {
  return data;
}
function deleteBooking(id) {
  data = data.filer(movie => movie.id !== id);
}
function getBooking(id) {
  return data.find(movie.id === id);
}
function saveBooking(booking){
  booking.id === '' ? insertBooking(booking): updateBooking(booking)
}
function insertBooking(booking){
  data.push(booking);
}
function updateBooking(booking){
  booking.id = parseInt(movie.id,10);

  let index = data.findIndex(item => item.id === booking.id);
  data[index] = booking;
}
module.exports = {
  getAllBookings,
  deleteBooking,
  getBooking,
  saveBooking
};
