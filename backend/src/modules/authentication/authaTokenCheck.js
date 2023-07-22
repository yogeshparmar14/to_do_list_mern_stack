var jwt = require('jsonwebtoken');
const userModel=require("../../db/models/registerSchema.js")
var authTokenCheck = async(req,res,next)=>{
    let token
    const {authorization} = req.headers
    //   console.log("authorization",authorization);
    if(authorization&&authorization.startsWith('Bearer')){
        try {
            //Get token from header
            token = authorization.split(' ')[1]
            // console.log(token)
            //Verify Token
            const { userID }= jwt.verify(token,process.env.JWT_SECRET_KEY)
//   console.log("userID",userID);
            // Get user from token
            req.user = await await userModel.findById(userID).select('-password');
            // console.log("req.user",req.user);

            next()
        } catch (error) {
            console.log(error)
            res.status(404).send({
                data: {},
                error: {
                   message: "invaild token"
                
                }
                })
            
        }
        if(!token){
        res.status(401).send({
            data: {},
            error: {
               message: "no token"
            
            }
            })}
    }

}

module.exports= authTokenCheck;