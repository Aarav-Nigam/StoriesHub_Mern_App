import express from "express";
import { getPosts,createPost,updatePost,deletePost,LikePost,fetchPostBySearch,getPost} from "../controllers/posts.js";
const router=express.Router();
import auth from "../middleware/auth.js";


//Remeber the order in which the routes are written are very important
//Query Routes should be above 
//If you interchange line 10,11 then fetchPostBySearch will not be called

router.get('/page/:page', getPosts)
router.get('/search',fetchPostBySearch)
router.get('/post/:id',getPost)
router.post('/',auth,createPost)
router.put('/:id',auth, updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id',auth,LikePost)
export default router;