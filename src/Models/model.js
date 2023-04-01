const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const RegisterSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
},{
    timestamps:true
});

RegisterSchema.methods.generateToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(e){
        console.log(e);
    }
}

RegisterSchema.pre("save",async function(next){
    if(this.isModified("password")){
        let hash =await bcrypt.hash(this.password,10);
        this.password = hash;
    }
    next();
})

const User = new mongoose.model("LoginUsers",RegisterSchema);
module.exports=User;