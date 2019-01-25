const connection = require('./db').getDb();
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    //get Header value
    const header = req.headers['authorization'];
    let userdata;
    // check is bearer is undefined
    if(typeof header !== 'undefined'){
        //Split at the space
        const bearer = header.split(' ');
        //Get token from Array
        const token = bearer[1];
               
        //verfyToken
        jwt.verify(token, 'secretkey', (err, authData) => {
            if(err) {
               //response.sendStatus(403);
            } else {
               req.userId = authData.id;
               next();
            }
        });
    }    
}

module.exports = verifyToken;