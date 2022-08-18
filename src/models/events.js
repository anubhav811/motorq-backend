const mongoose=require("mongoose");

const eventSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    start_timestamp:{
        type:Date,
        required:true
    },
    end_timestamp:{
        type:Date,
        required:true
    },
    location:{
        latitude:{
            type:Number,
            required:true
        },
        longitude:{
            type:Number,
            required:true
        }
    },
    capacity:{
        type:Number,
        required:true
    },
})

const Event=mongoose.model("Event",eventSchema);
module.exports=Event;