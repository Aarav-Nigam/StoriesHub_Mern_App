import React,{useState} from 'react'
import { MuiChipsInput } from 'mui-chips-input'
import { AppBar,TextField,Button } from '@mui/material'
import { fetchPostBySearch } from '../../store/PostsSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Search = () => {
  const navigate=useNavigate()
    const dispatch=useDispatch()
    const [search,setSearch]=useState('')
    const [tags, setTags] = useState([])
    const handleSearchChange=(e)=>{
      setSearch(e.target.value)
    }
    const handleKeyDown=(e)=>{
      if(e.keyCode==13){ //code of enter key=13
        searchPost()
      }
    }
    const handleTagChange = (newChips) => {
      setTags(newChips)
    }
    const searchPost=()=>{
      if(search.trim() || tags.length){
        // dispatch(fetchPostBySearch({search:search.trim(),tags:tags.join(',')}))
        navigate(`/posts/search?searchQuery=${search.trim()||'none'}&tags=${tags.join(',')}`)
      }
      else{
        navigate('/')
      }
    }
  return (
    <AppBar position="static" color="inherit">
                    <h3 className="fw-bold text-center text-decoration-underline ">Search Posts</h3>
                <TextField
                  variant="outlined"
                  name='search'
                  label='Search Stories'
                  fullWidth
                  onKeyDown={handleKeyDown}
                  value={search}
                  autoFocus
                  onChange={(e)=>{handleSearchChange(e)}}
                />
                <MuiChipsInput
                className="bg-light" 
                label='Search Tags' 
                variant="outlined" 
                fullWidth value={tags} 
                onChange={handleTagChange} 
                />
                <Button onClick={searchPost} color='primary' variant="contained">Search</Button>
              </AppBar>
  )
}

export default Search