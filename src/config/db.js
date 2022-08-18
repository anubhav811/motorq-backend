require("dotenv").config();
const mongoose=require("mongoose");
const db=process.env.URI;

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}).then(()=>{
    console.log("Connection Successful");
}).catch((err)=>{
    console.log("No connection:",err);
})