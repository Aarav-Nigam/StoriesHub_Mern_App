import React, { useState } from "react"
import { Container, Grow, Grid, Paper } from '@mui/material'
import { Posts } from "../posts/posts.jsx"
import Paginate from "../Pagination/Pagination.jsx"
import { Form } from '../forms/form'
import { useLocation } from "react-router-dom"
import Search from "../Search/Search.jsx"
import { useDispatch } from "react-redux"
import { fetchPostBySearch } from "../../store/PostsSlice.js"
const Home = () => {
  const dispatch = useDispatch()
  const [currId, setCurrId] = useState(null);
  const query = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  if (query.searchQuery || query.tags) {
    dispatch(fetchPostBySearch({ search: query.searchQuery, tags: query.tags }))
  }
  // console.log(query.searchQuery)
  // console.log(query.tags)
  const [page, setPage] = useState(query.page || 1); //Default as page 1

  return (<>
      <Grow in>
          <Grid container padding={2} spacing={3}>
            <Grid className="px-2" item xs={12} sm={4} md={3}>
              <Search />
              {/* RightNow It is not allowing pagination in search, but we can allow it by changing some backend api */}
              {(!query.searchQuery && !query.tags) && (
                <Paper elevation={6}>
                  <Paginate page={page} setPage={setPage} />
                </Paper>
              )}
              <br/>
              <Form currId={currId} setCurrId={setCurrId} />
              
            </Grid>
            <Grid item xs={12} sm={8} md={9} alignItems='stretch'>
              <Posts setCurrId={setCurrId} />
            </Grid>
          </Grid>
      </Grow>
  </>
  )
}

export default Home