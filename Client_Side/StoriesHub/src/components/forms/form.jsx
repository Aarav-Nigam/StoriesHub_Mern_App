import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../store/PostsSlice";
import FileBase from 'react-file-base64'
export const Form = ({ currId, setCurrId }) => {
    const user = useSelector((state) => { return state.AllPosts.user })
    const initialState = {
        author: (user == null ? "" : user.firstName), authorId: (user == null ? "" : user._id), title: '', story: '', tags: [], selectedFile: ''
    }
    const [postData, setPostData] = useState(initialState)
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
        return <Paper elevation={16} className='h-50 d-flex align-items-center'>
            <Typography variant="h5">
                Please Sign In to Write some awesome stories...
            </Typography>
        </Paper>
    }
    return (
        <>
            <Paper elevation={16}>
                <form autoComplete="off" noValidate onSubmit={(e) => handleSubmit(e)}>
                    <h2 className="fw-bold text-center text-decoration-underline ">Create Story</h2>
                    <TextField name="title" variant="filled" label='Title' fullWidth value={postData.title} onChange={(e) => { setPostData({ ...postData, title: e.target.value }) }} />
                    <TextField name="story" id="outlined-multiline-static" minRows={5} multiline variant="filled" label='Story' fullWidth value={postData.story} onChange={(e) => { setPostData({ ...postData, story: e.target.value }) }} />
                    <TextField name="tags" variant="filled" label='Tags' fullWidth value={postData.tags.join()} onChange={(e) => { setPostData({ ...postData, tags: e.target.value.split(',') }) }} />
                    <div>
                        <FileBase type='file' multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>
                    <Button type="submit" variant="contained" color="success" size="large" fullWidth>Submit</Button>
                    <Button variant="contained" color="warning" size="small" fullWidth onClick={() => clear()}>Clear</Button>
                </form>
            </Paper>
        </>
    )
}