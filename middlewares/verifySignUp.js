
//This file will contain the custom middleware for varifying the request body
const user = require('../models/user.model');
validateSignupRequest = async  (req,res,next)=>{
    //validate if userName exists
    if(!req.body.name){
        return res.status(400).send({
            message : "Failed ! User name is not provided"
        })

    //validate if the userId exists
    if(!req.body.userId ){
            return res.status.send({
                message : "Failed ! User ID id not provided"
            })
        }

        //validate if userId is already exist
        const user = await User.findOne({userId : req.body.userId});
        if(user!=null){
            return res.status.send({
                message : "Failed ! User Id already exist"
            }) 
        }

        //similar validation for all the other fields...(home work)
          //for email , password, usertype
        
          next(); //given control to the controller
    }

    
}
module.exports = {
    validateSignupRequest : validateSignupRequest
}