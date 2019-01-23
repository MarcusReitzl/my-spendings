function verifyToken(req, res, next){
    //get Header value
    const header = req.headers['authorization'];

    // check is bearer is undefined
    if(typeof header !== 'undefined'){
        //Split at the space
        const bearer = header.split(' ');
        //Get token from Array
        const token = bearer[1];
        //Set the Token
        req.token = token;
        //Next middleware
        next();

    }else{
        // Forbidden
        res.sendStatus(403);
    }
}

module.exports = verifyToken;