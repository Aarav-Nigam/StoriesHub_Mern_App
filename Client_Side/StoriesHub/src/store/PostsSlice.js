import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {fetchPosts,createPostapi,updatePostapi,deletePostapi,LikePostapi,signInApi,signUpApi,fetchPostBySearchAPI,fetchPostAPI} from '../api/index.js'
import decode from 'jwt-decode'
export const fetchAllPost = createAsyncThunk(
    "Allposts/fetch", async(page) => {
        try {
            const response = await fetchPosts(page);
            // console.log(response)
            return response;
        } catch (err) {
            return err.message;
        }
    }
)
export const fetchPostBySearch = createAsyncThunk(
    "posts/fetch", async(searchQuery) => {
        try {
            const response = await fetchPostBySearchAPI(searchQuery);
            // console.log(response)
            return response;
        } catch (err) {
            return err.message;
        }
    }
)
export const createPost=createAsyncThunk(
    "posts/create",async(data)=>{
        try{
            const res=await createPostapi(data)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
export const updatePost=createAsyncThunk(
    "posts/update",async(arg)=>{
        const id=arg.currId;
        const data=arg.postData;
        try{
            const res=await updatePostapi(id,data)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
export const deletePost=createAsyncThunk(
    "posts/del",async(id)=>{
        try{
            const res=await deletePostapi(id)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
export const incLike=createAsyncThunk(
    "posts/like",async(id)=>{
        try{
            const res=await LikePostapi(id)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
export const signIn=createAsyncThunk(
    /* Need to add some logic so that if user logout during its session, It has to detect it */
    "user/signIn",async(formData)=>{
        try{
            const res=await signInApi(formData)
            if(formData.imgUrl){
                res.data={...res.data,imgUrl:formData.imgUrl}
            }
            // console.log(res.data)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
export const signUp=createAsyncThunk(
    "user/signUp",async(formData)=>{
        try{
            const res=await signUpApi(formData)
            if(formData.imgUrl){
                res.data={...res.data,imgUrl:formData.imgUrl}
            }
            // console.log(res.data)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
const setUserInitial=()=>{
    const obj=JSON.parse(localStorage.getItem('StoryHubUser'));
    if(obj===null) return null;
    // console.log(obj)
    const decodedToken=decode(obj.token);
    if(decodedToken.exp*1000<new Date().getTime()){
        localStorage.removeItem('StoryHubUser');
        return null
    }
    else return obj;
}
export const fetchPost=createAsyncThunk(
    "post/fetch",async(id)=>{
        try{
            const res=await fetchPostAPI(id)
            return res;
        }
        catch(err){
            return err.message;
        }
    }
)
export const postSlice=createSlice({
    name:'Posts',
    initialState:{
        posts:{postsArray:[]},
        user:setUserInitial(),
        isLoading:false,
        post:null,
    },
    reducers:{
        signOut(state){
            state.user=null;
            localStorage.removeItem('StoryHubUser');
        },
        addImg(state,action){
            // console.log(state.user)
            state.user={...state.user,imgUrl:action.payload.data}
            localStorage.setItem('StoryHubUser',JSON.stringify(state.user))
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllPost.pending, (state, action) => {
                state.isLoading=true;
            })
            .addCase(fetchAllPost.fulfilled, (state, action) => {
                // console.log(action.payload.data)
                state.posts = action.payload.data;
                state.isLoading=false;
            })
            .addCase(fetchAllPost.rejected, (state, action) => {
                state.posts = {postsArray:[]};
            })
            .addCase(createPost.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(createPost.fulfilled,(state,action)=>{
                state.posts.postsArray=[action.payload.data,...state.posts.postsArray];
                if(state.posts.postsArray.length>6){
                    state.posts.postsArray.pop();
                    //Make some logic to increase pagination to increase no of pages if overflow
                }
                // console.log(state.posts);
                state.isLoading=false;
            })
            .addCase(createPost.rejected,(state,action)=>{

            })
            .addCase(updatePost.rejected,(state,action)=>{
                
            })
            .addCase(updatePost.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(updatePost.fulfilled,(state,action)=>{
                const post=action.payload.data;
                var temp=[];
                for(var i=0;i<state.posts.postsArray.length;i++){
                    if(state.posts.postsArray[i]._id==post._id){
                        temp.push(post);
                    }else{
                        temp.push(state.posts.postsArray[i])
                    }
                }
                state.posts.postsArray=temp;
                state.isLoading=false;
            })
            .addCase(deletePost.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(deletePost.fulfilled,(state,action)=>{
                state.posts.postsArray=state.posts.postsArray.filter((post)=>{return post._id!=action.payload.data._id});
                // console.log(state.posts);
                state.isLoading=false;
            })
            .addCase(deletePost.rejected,(state,action)=>{

            })
            .addCase(incLike.pending,(state,action)=>{

            })
            .addCase(incLike.fulfilled,(state,action)=>{
                const post=action.payload.data;
                for(var i=0;i<state.posts.postsArray.length;i++){
                    if(state.posts.postsArray[i]._id==post._id){
                        state.posts.postsArray[i]={...state.posts.postsArray[i],likes:post.likes};
                    }
                }
            })
            .addCase(incLike.rejected,(state,action)=>{
            
            })
            .addCase(signIn.pending,(state,action)=>{

            })
            .addCase(signIn.fulfilled,(state,action)=>{
                var userData=action.payload.data;
                localStorage.setItem('StoryHubUser',JSON.stringify(userData))
                state.user=userData;
            })
            .addCase(signIn.rejected,(state,action)=>{
            
            })
            .addCase(signUp.pending,(state,action)=>{

            })
            .addCase(signUp.fulfilled,(state,action)=>{
                var userData=action.payload.data;
                localStorage.setItem('StoryHubUser',JSON.stringify(userData))
                state.user=userData;
            })
            .addCase(signUp.rejected,(state,action)=>{
            
            })
            .addCase(fetchPostBySearch.pending,(state,action)=>{
                state.isLoading=true;
            })
            .addCase(fetchPostBySearch.fulfilled,(state,action)=>{
                // console.log(action.payload.data.data)
                state.posts.postsArray=action.payload.data.data;
                state.isLoading=false;
            })
            .addCase(fetchPostBySearch.rejected,(state,action)=>{
            
            })
            .addCase(fetchPost.pending,(state,action)=>{
            })
            .addCase(fetchPost.fulfilled,(state,action)=>{
                // console.log(action.payload)
                state.post=action.payload.data;
            })
            .addCase(fetchPost.rejected,(state,action)=>{
            
            })
    }
})
export const {signOut,addImg}=postSlice.actions;
//THe above line will be used when we use simple reducers instead of extrareducers
export default postSlice.reducer