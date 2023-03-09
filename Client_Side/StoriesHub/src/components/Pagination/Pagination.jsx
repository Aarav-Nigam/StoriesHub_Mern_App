import React ,{useEffect} from "react";
import { fetchAllPost } from "../../store/PostsSlice";
import { Pagination,PaginationItem } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';


const Paginate=({page,setPage})=>{
    const No_Of_Pages=useSelector((state)=>state.AllPosts.posts.numberOfPage)
    const navigate = useNavigate();
    const handlePageChange=(e,p)=>{
        navigate(`/posts?page=${p}`)
        setPage(p);
    }
    const dispatch=useDispatch();
    useEffect(()=>{dispatch(fetchAllPost(page))},[page]) 
    return (
        <>
        <Pagination 
            count={No_Of_Pages}
            page={Number(page) || 1}
            variant='outlined'
            color="primary"
            onChange={handlePageChange}
        />
        </>
        

    )
}
export default Paginate;