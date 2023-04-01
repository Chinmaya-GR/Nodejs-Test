const express = require("express");
const app = express();
const User = require("./src/Models/model");
require("./src/DB/conn");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

app.use(express.json());

app.post("/auth/signup",async (req,res)=>{
    console.log(req.body);
    try{
        let PersonData = new User(req.body);
        let token = await PersonData.generateToken;
        console.log("Token: "+token);
        let createdData =await PersonData.save();
        res.status(200).send(createdData); 
    }catch(e){
        res.send(400).send(e);
    }
})

app.post("/auth/login",async (req,res)=>{
    console.log(req.body);
    try{
        let memberData =await User.findOne({email:req.body.email});
        if(memberData){
            let compare = bcrypt.compare(req.body.password,memberData.password);
            let token = await memberData.generateToken();
            if(compare == true){
                res.status(200).send({
                    message:"Successfully Login.",
                    Token:token,
                    Data:memberData
                });
            }else{
                res.status(400).send({
                    message:"password is invalid."
                });
            }
        }
    }catch(e){
        res.status(404).send({
            message:"You are not registered. SignUp first."
        });
    }
});

app.listen(5000,()=>{
    console.log("Listening to port 5000....");
})