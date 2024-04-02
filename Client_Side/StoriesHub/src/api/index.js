import axios from "axios";
// const url='http://localhost:3000/api'
const url='https://zany-puce-spider-tam.cyclic.app/api/'
const API=axios.create({baseURL:url});

API.interceptors.request.use((req)=>{
  //This will attach token only if token is availaible
  req.headers.set("Access-Control-Allow-Origin", "*")
  req.headers.set("Referrer-Policy", "no-referrer")
  if(localStorage.getItem('StoryHubUser')){
    req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('StoryHubUser')).token}`
  }
  return req;
})
export const fetchPostAPI=(id)=>API.get(`/posts/post/${id}`)
export const fetchPosts=(page)=>API.get('/posts/page/'+page);
export const fetchPostBySearchAPI=(searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search||'none'}&tags=${searchQuery.tags}`)
export  const createPostapi= (newPost)=>API.post('/posts',newPost)
export const updatePostapi= (id,updatedPost)=>{return API.put('/posts/'+id,updatedPost);}
export const deletePostapi= (id)=>{return API.delete('/posts/'+id)}
export const LikePostapi=(id)=>{return API.patch('/posts/'+id)}

export const signInApi=(formData)=>API.post('/user/signin',formData)
export const signUpApi=(formData)=>API.post('/user/signup',formData)
export const existsApi=(id)=>API.get('/user/exist/'+id)
