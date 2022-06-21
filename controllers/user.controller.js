//This file will have all the logic manipulate the user resources
const User = require ("../models/user.model");
const objectConverter = require("../utils/objectconverter")

// fetch the list of user
  // - only ADMIN is allowed to call this method
  // - ADMIN should be able to filter based on:
     // 1.Name
     // 2. UserType
     // 3. UserStatus

exports.findallUsers = async (req,res) => {


  /*
  * Read the  data from the query param
  */

  const nameReq = req.query.name;
  const userStatusReq = req.query.UserStatus;
  const userTypeReq = req.query.userType;

  const mongoQueryObj = {}
  if(nameReq && userStatusReq && userTypeReq){
    mongoQueryObj.name  = nameReq;
    mongoQueryObj.userStatus  = userStatusReq;
    mongoQueryObj.userType  = userTypeReq;
    
  }else if(userStatusReq && userTypeReq){
    mongoQueryObj.userStatus  = userStatusReq;
    mongoQueryObj.userType  = userTypeReq; 
  }else if(nameReq && userStatusReq){
    mongoQueryObj.name  = nameReq;
    mongoQueryObj.userStatus  = userStatusReq;
  }else if(userStatusReq && userTypeReq){
    mongoQueryObj.userStatus  = userStatusReq;
    mongoQueryObj.userType  = userTypeReq;
  }else if(nameReq && userTypeReq){
    mongoQueryObj.name  = nameReq;
    mongoQueryObj.userType  = userTypeReq;
  }else if(nameReq){
    mongoQueryObj.name  = nameReq;
  } else if(userStatusReq){
    mongoQueryObj.userStatus  = userStatusReq;
  }else if(userTypeReq){
    mongoQueryObj.userType  = userTypeReq;
  }



 /*
 * write the code here to fetch all the Users from the db
 * fetch the documents from the users collection 
 * 
 * 
 */
  try{
    const users = await User.find();
    return rest.status(200).send(objectConverter.usersResponse(users));//user passoword will not be send
  }catch(err){
    console.log(err.message);
    res.status(500).send({
      message : "Internal error while fetching all users"
    })
  }
}

/*
* Fetch the user based on userId
*     
*/
exports.findUserId = async (req,res)=>{
  const userIdReq = req.params.userId; //Reading from the request parameter
  const user = await User.find({userId : userIdReq});//not User.finOne , bcz we need array for userResponse function as parameter
  if(user){
    res.status(200).send(objectConverter.userResponse(user));
  }else {
    res.status(200).send({
      message : "User with id" + userIdReq + "doesn't exist"
    })
  }
}

/*
* update the user - status ,  userType
* - only ADMIN should be allowed to do
*    - admim will provide name, status,userType for updating
*/
exports.updateUser = (req,res)=>{
  //one of the ways of updating
  try{
    const userIdReq = req.params.userId;
    const user = User.findOneAndUpdate({
      userId : userIdReq
    },{
      name : req.body.UserStatus,
      UserStatus  : req.body.UserStatus,
      userType : req.body.userType
    }).exec();

    res.status(200).send({
      message : "User record successfully updated"
    })
  }catch(err){
    console.log(err.message);
    res.status(500).send({
      message : "Internal server error while updatng"
    })
  }
}   