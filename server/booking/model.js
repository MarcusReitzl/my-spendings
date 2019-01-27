const connection = require("../db").getDb();


function getAll(userId) {

  return new Promise((resolve, reject) => {

    const query =
      `SELECT B.Id as id, B.Name as text, B.price as value, C.Name as kategorie, B.Date as date FROM Bookings AS B 
       LEFT JOIN Categories AS C ON C.Id = B.KatId
       WHERE B.userId = ?`;

    connection.query(query,[userId],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function get(id, userId) {
  return new Promise((resolve, reject) => {

    const query =
      `SELECT B.*, C.Name FROM Bookings AS B 
       INNER JOIN Categories AS C ON C.Id = B.KatId
       WHERE B.id = ? AND B.userId = ?`;

    connection.query(query,[id,userID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function remove(id, userId) {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM Bookings WHERE id = ? AND userId = ? ';
    connection.query(query,[id,userID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });
  });
}

function save(booking,userId){
  if (!booking.id) {
    return insert(booking, userId);
  } else {
    return update(booking, userId);
  }
}

function insert(booking, userId) {
  return new Promise((resolve, reject) => {
    const query =
      'INSERT INTO bookings (Name, Date, Price, KatId, UserId) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [booking.name, booking.date, booking.price, booking.katId, userId],(error,results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

function update(booking, userId) {
  return new Promise((resolve, reject) => {
      const query =
      'UPDATE Bookings SET Name = ?, Date = ?, Price = ?, KatId = ?, UserId = ? WHERE Id = ?';
        connection.query(query,[booking.name, booking.date, booking.price, booking.katId, userId, booking.id], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      },
    );
  });
}

module.exports = {
  getAll,
  get,
  remove,
  save
};
