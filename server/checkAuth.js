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
               this.userdata = authData;
               
            }
        });

        //get user ID;
        query = `SELECT Id FROM users WHERE username = ?`; 
        connection.query(query,[this.userdata.username],(err, row)=>{
            if(err){
            
            }else if(row.length === 0){
             res.send
            } else {
            userid = row[0].Id;
            
            req.userId = userid;
            next();
            }
        });
        //Next middleware
        

    }else{
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = verifyToken;