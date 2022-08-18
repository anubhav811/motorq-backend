const express=require("express");
const {home,register,login,logout}=require("../controllers/users");
const auth=require("../middleware/user");
const router=new express.Router();

router.get("/",home);
router.post("/register",register);
router.post("/login",login);
router.get("/logout",auth,logout);

module.exports=router;