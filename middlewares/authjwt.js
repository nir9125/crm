const jwt = require("jsonwebtoken");
const config = require("../configs/auth.configs");
const User = require("../models/user.model");
const constants = require('../utils/constants')

/*
*Authentication
*   - if the token passed is valid or not
* 
*1. if no token is passed in the request header - Not allowed
* 2. if token is passed : Authenticated
*    if correct allow , else reject
*/

const { JsonWebTokenError } = require("jsonwebtoken");

verifyToken = (req,res,next)=> {
    /*
    Read the token from the header
    */
   const token = req.headers['x-access-token']; 

   if(!token){
       return res.status(403).send({
           message : "No token provided"
       })
   }

   //if the token was provided , we need to verify it
   Jwt.verify(token,config.secret,(err,decoded)=>{
       if(err){
           return res.status(401).send({
               message : "Unauthorised"
           });
       }
       //I will try to read the userId from the decoded token and store it in req object  ...10th,1:25
       req.userId= decoded.id;
       next();
   })
};

/*
* If the passed access token is of ADMIN or not
*/

isAdmin = async (req,res,next) =>{
    /*
    * fetch user from the DB using the userid
    */
   const user = await User.findOne({userId : req.userId});
   //check what is user Type
   if(user && user.userType==constants.user.userType.isAdmin){
       next();
   }else {
       res.status(403).send({
           message : "Requires ADMIN role"
       })
   }
}

const authJwt = {
    verifyToken : verifyToken,
    isAdmin :  isAdmin
};
module.exports=authJwt;