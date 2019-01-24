const connection = require("../db").getDb();


function getAllBookings(userID) {

  return new Promise((resolve, reject) => {
    // const query = "SELECT BP.Id AS id , BP.Price AS value, C.Name As kategorie, BH.Name AS text, BH.Date AS date FROM bookings_pos AS BP " +
    //   "INNER JOIN bookings_head AS BH ON BH.Id = BP.HeadId " +
    //   "INNER JOIN categories AS C ON C.Id = BP.KatId " +
    //   "WHERE BH.UserId = ?"
    // ;

    const query = `SELECT bp.Id AS id , bp.Price AS value, c.Name As kategorie, bh.Name AS text, bh.Date AS date 
                  FROM bookings_pos bp, bookings_head bh, categories c
                  WHERE bh.id = bp.HeadId
                  AND C.id = bp.KatId
                  AND bh.UserID = ?;`

    connection.query(query,[userID],(error, results)=>{
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
 booking.id === null ? insertBooking(booking): updateBooking(booking)
}
function insertBooking(booking){
  belegname = booking.text;
  posPreis = booking.value;
  kategoriename = booking.kategorie;
  belegdatum = booking.date;

   // return new Promise((resolve, reject) => {
  //    const query = 

  //   connection.query(query,[userId],(error, results)=>{
  //     if (error){
  //       reject(error)
  //     } else {
  //       resolve(results);
  //     }
  //   });

  // });
}

function updateBooking(booking){
  booking.id = parseInt(booking.id,10);

  let index = data.findIndex(item => item.id === booking.id);
  data[index] = booking;
}
module.exports = {
  getAllBookings,
  deleteBooking,
  getBooking,
  saveBooking
};
