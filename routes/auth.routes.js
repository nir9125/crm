//this file will act as the route for authentication and authorization 

//define the routes -REST endpoints for user registration 
const authcontroller = require("../controllers/auth.controller.js");
const {verifySignUp} = require("../middlewares");
module.exports = (app)=>{
    //POST 127.0.0.1:8080/crm/api/v1/signypup
    console.log("Hi");
    app.post("/crm/app/v1/auth/signup",authcontroller.signup);
    app.get("/crm", (req, res) => {
        console.log("ddd");
        res.send("Ho");
    })

    //POST 127.0.0.1:8080/crm/api/v1/sigin
    app.post("/crm/app/v1/auth/signin",authcontroller.signin);
}