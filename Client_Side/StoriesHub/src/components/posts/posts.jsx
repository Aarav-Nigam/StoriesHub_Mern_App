import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Post } from "./post/post.jsx";
import { Grid,CircularProgress } from "@mui/material";
export const Posts=({setCurrId})=>{
    const posts=useSelector((state)=>{
        // console.log(state.AllPosts)
        return state.AllPosts.posts.postsArray})
    const isLoading=useSelector((state)=>state.AllPosts.isLoading);
    
    return (
        (isLoading)?(<div className="h-100 d-flex justify-content-center align-items-center">
        <CircularProgress color="success" size={100}/>
     </div>):(
            <Grid container alignItems='stretch' spacing={4}>
                {posts.map((post)=>{
                    return(
                    <Grid key={post._id} item xs={12} sm={4}>
                        <Post setCurrId={setCurrId} post={post}/>
                    </Grid>)
                })}
            </Grid>
        )
    )
}