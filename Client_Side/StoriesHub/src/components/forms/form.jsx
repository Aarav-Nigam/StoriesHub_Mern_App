import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/PostsSlice";
// import FileBase from 'react-file-base64'
// import Compress from "browser-image-compression";
import Compress from "react-image-file-resizer";

export const Form = ({ currId, setCurrId }) => {
    const user = useSelector((state) => { return state.AllPosts.user })
    const initialState = {
        author: (user == null ? "" : user.firstName), authorId: (user == null ? "" : user._id), title: '', story: '', tags: [], selectedFile: ''
    }
    const [postData, setPostData] = useState(initialState)

    const onImageChange = (e) => {
        const file = e.target.files[0];

        Compress.imageFileResizer(
            file, // the file from input
            480, // width
            480, // height
            "JPEG", // compress format WEBP, JPEG, PNG
            70, // quality
            0, // rotation
            (uri) => {
                // console.log(uri);
                // You upload logic goes here
                setPostData({...postData,selectedFile:uri})
            },
            "base64" // blob or base64 default base64
        );
    }
    const dispatch = useDispatch();
    const post = useSelector((state) => { return currId ? state.AllPosts.posts.postsArray.find((p) => { return p._id == currId }) : null })
    useEffect(() => {
        if (post) setPostData(post);
    }, [currId])
    useEffect(() => { setPostData(initialState) }, [user])
    const handleSubmit = (e) => {
        e.preventDefault();
        /*Add the logic to check password and confirm password are same while signing up*/
        if (currId) {
            dispatch(updatePost({ currId, postData }))
            clear()
        }
        else {
            dispatch(createPost(postData))
            clear()
        }
    }
    const clear = () => {
        setPostData(initialState)
        setCurrId(null)
    }
    if (!user) {
        return <Paper elevation={16} className='h-50 d-flex align-items-center mb-10'>
            <Typography variant="h5">
                Please Sign In to Write some awesome stories...
            </Typography>
        </Paper>
    }
    return (
        <>
        <Paper elevation={16} className='d-flex flex-column' style={{minHeight:'60vh'}}>
          <form autoComplete="off" noValidate onSubmit={(e) => handleSubmit(e)} className="flex-grow-1 d-flex flex-column">
            <h2 className="fw-bold text-center text-decoration-underline">Create Story</h2>
            <TextField name="title" variant="filled" label='Title' fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} />
            <div className="flex-grow-1">
              <TextField name="story" id="outlined-multiline-static" rows={15}  multiline variant="filled" label='Story' fullWidth value={postData.story} onChange={(e) => { setPostData({ ...postData, story: e.target.value }) }} />
            </div>
            <TextField name="tags" variant="filled" label='Tags' fullWidth value={postData.tags.join()} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(',') }) }} />
            <div>
              <input name="file" id="file" onChange={(e) => onImageChange(e)} type="file" />
            </div>
            <div className="d-flex flex-column mt-auto">
              <Button type="submit" variant="contained" color="success" size="large" fullWidth>Submit</Button>
              <Button variant="contained" color="warning" size="small" fullWidth onClick={() => clear()}>Clear</Button>
            </div>
          </form>
        </Paper>
      </>
    
    )
}