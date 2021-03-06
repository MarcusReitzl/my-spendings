// by David Langmeier
//
// get authoriziation part from header
// split header into bearer and token
// verify token

const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  //get auth header value
  const header = req.headers['authorization'];
  // check if bearer is undefined
  if (typeof header !== 'undefined') {
    // split at space -> gives back array
    const bearer = header.split(' ');
    // get token from array
    const token = bearer[1];

    // verify Token
    jwt.verify(token, 'secretkey', (err, authData) => {
      if (err) {
        response.sendStatus(401);
      } else {
        req.userId = authData.id;
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;
