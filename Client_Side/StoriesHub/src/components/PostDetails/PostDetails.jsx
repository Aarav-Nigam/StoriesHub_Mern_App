import React,{useEffect} from 'react';
import { Button } from "@mui/material";
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch, useSelector } from "react-redux";
import { deletePost, incLike } from "../../store/PostsSlice";
import { CircularProgress } from "@mui/material";
import { useParams } from 'react-router-dom';
import { fetchPost } from '../../store/PostsSlice';
const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  // console.log(id);
  const user = useSelector((state) => { return state.AllPosts.user })
  const post = useSelector((state) => state.AllPosts.post)
  useEffect(()=>{dispatch(fetchPost(id))},[]) 
  if (post == null) return (<div className="h-100 d-flex justify-content-center align-items-center">
    <CircularProgress color="success" size={100} />
  </div>)
  return (
    <>
      <section style={{ backgroundColor: '#eee' }}>
        <div className="container">
          <div className="row bg-light rounded-3 mb-2" aria-label="breadcrumb" >
            <div className="col-10">
              <nav className="p-1 mb-2">
                <p><u><span className='h4'>Tags:  </span></u>{post.tags.map((tag) => `#${tag} `)}</p>
              </nav>
            </div>
            <div className='col-2'>
              <a href='/'><Button className='mt-2' size='medium' variant="contained">Back</Button></a>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <img src={post.selectedFile} alt="avatar" className=" img-fluid" style={{ width: '260px' }} />
                  <div className="d-flex justify-content-center mb-2">
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
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-3 ">
                      <h1 className='font-weight-bold'>Author:</h1>
                    </div>
                    <div className="col-sm-9">
                      <h1 className="text-muted mb-0">{post.author}</h1>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3 ">
                      <h1 className='font-weight-bold'>Title:</h1>
                    </div>
                    <div className="col-sm-9">
                      <h1 className="text-muted mb-0">{post.title}</h1>
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3 ">
                      <h2 className='font-weight-bold'>Created At:</h2>
                    </div>
                    <div className="col-sm-9">
                      <h3 className="text-muted mb-0"> {new Date(post.createdAt).toDateString()}</h3>
                    </div>
                  </div>
                  <hr />
                </div>
              </div>

            </div>
          </div>
          <div className="card mb-4 mb-lg-0">
            <div className="card-body p-0">
              <h2>Story:</h2>
              <p>{post.story}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PostDetails