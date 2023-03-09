import React from "react";
import { Card, CardActions, CardMedia, Button } from "@mui/material";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, incLike } from "../../../store/PostsSlice";
import { useNavigate } from "react-router-dom";
import './postStyles.css'
export const Post = ({ setCurrId, post }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => { return state.AllPosts.user })
    return (
        <>
            <Card className="hover-zoom" elevation={10}>
                <CardMedia  onClick={() => { navigate(`/posts/${post._id}`) }} component="img" height={"150"} image={post.selectedFile} title={post.title} />
                <div className="d-flex flex-row justify-content-between">
                    <div>
                        <h5 className="fw-bold">{post.author}</h5>
                        <h6 className="text-decoration-underline">{post.title}</h6>
                        <p>{moment(post.createdAt).fromNow()}</p>
                    </div>
                    <div >
                        <Button size="small" disabled={(user == null) || (user && (post.authorId != user._id))} onClick={() => { setCurrId(post._id) }}>
                            <EditRoundedIcon />
                        </Button>
                    </div>
                </div>

                <div >
                    <p>{post.tags.map((tag) => `#${tag} `)}</p>
                </div>
                <CardActions className="d-flex flex-row justify-content-between">
                    <Button size="small" disabled={user == null} onClick={() => { dispatch(incLike(post._id)) }}>
                        {(user == null || post.likes.includes(user._id)) ? <ThumbUpRoundedIcon /> : <ThumbUpOffAltIcon />}
                        &nbsp;
                        Like
                        &nbsp;
                        {post.likes.length}
                    </Button>
                    <Button size="small" disabled={(user == null) || (user && (post.authorId != user._id))} onClick={() => { dispatch(deletePost(post._id)) }}>
                        <DeleteRoundedIcon />
                    </Button>
                </CardActions>
            </Card>
        </>
    )
}