const connection = require("../db").getDb();


function getAllBookings(userId) {

  return new Promise((resolve, reject) => {
    const query = "SELECT BP.Id AS PosId , BP.Price AS PosPreis, C.Name As Kategoriename, BH.Name AS Belegname, BH.Date AS Belegdatum FROM bookings_pos AS BP " +
      "INNER JOIN bookings_head AS BH ON BH.Id = BP.HeadId " +
      "INNER JOIN categories AS C ON C.Id = BP.KatId " +
      "WHERE BH.UserId = ?"
    ;

    connection.query(query,[userId],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function deleteBooking(id) {
  data = data.filter(booking => booking.id !== id);
}
function getBooking(id) {
  return data.find(booking.id === booking);
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
