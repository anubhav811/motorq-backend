const Event=require("../models/events");

const home=(req,res)=>{
    try{
        res.status(200).send({
            message:"Welcome to the events page"
        });
    }catch(error){
        res.status(400).send(error);
    }
}

const add=async(req,res)=>{
    const event=new Event({
        name:req.body.name,
        start_timestamp:new Date(req.body.start_timestamp),
        end_timestamp:new Date(req.body.end_timestamp),
        location:req.body.location,
        capacity:req.body.capacity
    });
    try{
        const result=await event.save();
        res.status(200).send(result);
    }catch(error){
        res.status(400).send(error);
    }
};

const getAll=async(req,res)=>{
    try{
        const result=await Event.find();
        if(result){
            return  res.status(200).send(result);
        }else{
            return res.status(400).send({
                message:"No events found"
            });
        }
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getDetailsById=async(req,res)=>{
    try{
        const result=await Event.findById(req.params.eventId);
        if(result){
            return res.status(200).send(result);
        }else{
            return res.status(400).send({
                message:"Event not found"
            });
        }
    }
    catch(error){
        res.status(400).send(error);
    }
}

const getDetailsByName=async(req,res)=>{
    try{
        const result=await Event.find({name:req.params.name});
        if(result){
            return res.status(200).send(result);
        }else{
            return res.status(400).send({
                message:"Event not found"
            });
        }
    }
    catch(error){
        res.status(400).send(error);
    }
}

const deleteEvent=async(req,res)=>{
    try{
        const result=await Event.findByIdAndDelete(req.params.id);
        res.status(200).send({
            message:"Event deleted successfully"
        });
    }
    catch(error){
        res.status(400).send(error);
    }
}

module.exports={
    home,
    add,
    getAll,
    getDetailsById,
    getDetailsByName,
    deleteEvent
}