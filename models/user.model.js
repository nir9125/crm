//this file will hold the schema for the user resource

const mongoose = require ('mongoose');//1

const userSchema = new mongoose.Schema({                          //2
    //-> name,userId,password,email,createdAt,updatedAt
    // -> userType [ADMIN | ENGINEER | CUSTOMER ],
    // userStatus [Pending | Approved | Rejected]

    name : {
        type : String,
        required : true
    },
    userId : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String ,
        required : true 
    },
    email : {
        type : String,
        required : true,
        lowercase : true,
        minlength : 10,
        unique : true
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : ()=>{
            return Date.now();
        }
    },
    updatedAt : {
        type : Date,
        default : () =>{
            return Date.now();
        }
    },
    userType : {
        type : String,
        required : true,
        default : "CUSTOMER"
    },
    userStatus : {
        type : String,
        requiered : true,
        default : "APPROVED"
    }

});

module.exports = mongoose.model("User",userSchema);  //3  automatically collection name plural ban jayeja i.e., Users from user 