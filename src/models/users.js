const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const validator=require("validator");

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        validate(value){
            if(value.length<=0){
                throw new Error("Please enter the name")
            }
        }
    },
    email:{
        type:String,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Please enter a valid email")
            }
        }
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        validate(value){
            if(value.length<10){
                throw new Error("Please enter the proper phone number")
            }
        }
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    token:{
        type:String
    },
    events:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Event"
    }]
})

userSchema.methods.generateAuthToken=async function(){
    const user=this
    const token=jwt.sign({_id:user._id.toString()},'motorq')
    user.token=token
    await user.save();
    return token
}

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await User.findOne({
        username
    });
    if (!user) {
        throw new Error("Invalid Username!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Password!");
    }
    return user;
};

userSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});


const User=mongoose.model("User",userSchema);
module.exports=User;