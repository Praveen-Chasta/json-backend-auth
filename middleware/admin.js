const json = require('jsonwebtoken');

const {JWT_SECRET} = require('../config')


function adminMiddleware(req,res,next){
    const token = req.headers.authorization;
    const word = token.split(" ");
    const jsonToken = word[1];

    try{
        const decodedValue = json.verify(jsonToken, JWT_SECRET)
        
        if(decodedValue.username){
            next();
        }
        else{
            res.status(400).json({
                msg : "You Are Not Authonticated"
            })
        }
    }
    catch(e){
        res.json({
            msg : "Incorrect Inputs"
        })
    }
}

module.exports = adminMiddleware