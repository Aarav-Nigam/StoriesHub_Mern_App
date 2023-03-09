import mongoose from "mongoose";
const postSchema=mongoose.Schema({
    title:String,
    story:String,
    author:String,
    authorId:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
const PostModel=mongoose.model('PostMessage',postSchema);
export default PostModel;