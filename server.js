const express = require ("express"); //1
const serverConfig =  require('./configs/server.config');//2
const mongoose = require("mongoose"); //4
const dbConfig = require("./configs/db.config");  //
const bodyParser = require("body-parser");//8
const User = require("./models/user.model");
const bcrypt = require('bcryptjs')
const router = express.Router();
const app = express();//3
app.use(bodyParser.json());//9
app.use(bodyParser.urlencoded({extended: true}));//10




// router.get("/",(req,res)=>{
//     res.send("Hi")
// })
app.get("/",(req,res)=>{
    res.send("Hi")
})

//setup the mongodb connection and create an ADMIN user






require('./routes/auth.routes')(app); //7 make the server aware of routes

//start the express server
app.listen(8081,()=>{                              
          //4
    console.log("Application has started on the PORT",serverConfig.PORT);
})

mongoose.connect(dbConfig.DB_URL,(error)=>{ 
    if(error)
    {

        console.log(error);
    }  //6
    else{
        console.log("MongoDB connected");
    }
   
    //initialization
   // init();
})