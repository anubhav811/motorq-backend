require("dotenv").config();
const express=require("express");
const cors=require("cors");
const db=require("./config/db");
const userRouter=require("./routes/user");
const eventRouter=require("./routes/event");
const app=express();
const port=process.env.PORT|| 3000;

app.use(cors());
app.use(express.json());
app.use("/users",userRouter);
app.use("/events",eventRouter);

app.get("/",(req,res)=>{
    res.status(200).send({
        message:"Welcome to the server"
    });
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})