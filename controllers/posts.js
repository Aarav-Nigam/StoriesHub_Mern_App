import mongoose from "mongoose";
import PostModel from "../models/postMessage.js"
export const getPosts= async (req, res)=>{
    try {
        const page=req.params.page;
        const LIMIT=3;
        const startIndex=(Number(page)-1)*LIMIT
        const total=await PostModel.countDocuments({})
        const postMessages=await PostModel.find().sort({_id:-1}).limit(LIMIT).skip(startIndex);
        res.status(200).json({postsArray:postMessages,currentPage:Number(page),numberOfPage:Math.ceil(total/LIMIT)});
    } catch (error) {
        console.error(`${error.message}!!`)
        res.status(404).send(error)
    }
}
export const getPost= async (req, res)=>{
    try {
        const id=req.params.id;
        const postMessage=await PostModel.findById(id)
        res.status(200).json(postMessage);
    } catch (error) {
        console.error(`${error.message}!!`)
        res.status(404).send(`${error.message}!!`)
    }
}
export const createPost=async (req,res)=>{
    const post=req.body;
    try {
        const newPost=new PostModel(post);
        await newPost.save();
        res.status(201).json(newPost);
        
    } catch (error) {
        console.error(`${error.message}!!`)
        res.status(404).send(`${error.message}!!`)
    }
}
export const updatePost=async(req,res)=>{
    const id=req.params.id;
    const post=req.body;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post With this Id');
    PostModel.findByIdAndUpdate(id,post,{new:true},(err,updtdPos)=>{
        if (err){
            res.json(err.message)
        }
        else{
            res.json(updtdPos)
        }
    })
}
export const deletePost=(req,res)=>{
    const id=req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post With this Id');
    PostModel.findByIdAndDelete(id,(err,updtdPos)=>{
        if (err){
            res.json(err.message)
        }
        else{
            res.json({_id:updtdPos._id})
        }
    })
}
export const LikePost=async (req,res)=>{
    const id=req.params.id;
    if(!req.userId) return res.json({message:'Unauthenticated'})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post With this Id');
    const post=await PostModel.findById(id).exec()
    const index=post.likes.findIndex((id)=>{return id==String(req.userId)});
    if(index==-1){
        //like the post
        post.likes.push(req.userId)
    }else{
        //dislike the post
        post.likes=post.likes.filter((id)=>{return id!=String(req.userId)})
    }
    const updatePost=await PostModel.findByIdAndUpdate(id,post,{new:true});
    res.json({_id:id,likes:updatePost.likes});
}

export const fetchPostBySearch=async (req,res)=>{
    try {
        const {searchQuery,tags}=req.query;
        const title=new RegExp(searchQuery,'i');
        const posts=await PostModel.find({$or:[{title},{tags:{$in:tags.split(',')}}]})
        res.status(200).json({data:posts});
    } catch (error) {
        console.error(`${error.message}!!`)
        res.status(404).send(`${error.message}!!`)
    }
}