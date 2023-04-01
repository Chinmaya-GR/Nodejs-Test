const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("DataBase Connected Successfully.");
}).catch((e)=>{
    console.log(e);
})