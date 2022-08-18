const express=require("express");
const {home,add,getAll,getDetailsById,getDetailsByName,deleteEvent}=require("../controllers/events");
const router=new express.Router();

router.get("/",home);
router.post("/add",add);
router.get("/list",getAll);
router.get("/:eventId",getDetailsById);
router.get("/:eventName",getDetailsByName);
router.delete("/delete/:eventId",deleteEvent);

module.exports=router;