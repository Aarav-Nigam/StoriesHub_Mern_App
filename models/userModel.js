import mongoose from "mongoose";
const userModel=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
})
const UserModel=mongoose.model('User',userModel);
export default UserModel;