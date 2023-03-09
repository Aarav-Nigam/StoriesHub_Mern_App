import React from "react";
import Home from "./components/Home/Home";
import { useSelector } from "react-redux";
import { Navbar } from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
function App() {
  const user = useSelector((state) => { return state.AllPosts.user })
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
       {/* To make "/posts" as your default page instead of "/" */}
      <Route path="/" exact element={ <Navigate to={'/posts'} />}/> 
      <Route path="/posts" exact element={<Home/>} />
      <Route path='/posts/search' exact element={<Home/>}/> 
      {/* We created this user routing, so that if we search something and we want to share this search, we can easily do that by sharing url */}
      <Route path="/posts/:id" exact element={<PostDetails/>} />
      <Route path='/auth' exact element={!user?<Auth/>:<Navigate to={'/posts'} />}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
