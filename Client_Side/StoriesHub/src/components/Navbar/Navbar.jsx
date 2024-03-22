import { AppBar, Avatar, Button, Typography, Toolbar } from "@mui/material"
import { signOut } from "../../store/PostsSlice"
import { useSelector,useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom'
import Book from '../../assets/stories.png'
export const Navbar = () => {
    const dispatch=useDispatch();
    const user=useSelector((state)=>{return state.AllPosts.user})
    const navigate=useNavigate();
    const handleLogOut=()=>{
        dispatch(signOut())
        navigate('/')
    }
    return (
        <AppBar position='sticky' className="rounded shadow-lg mb-2" color="primary"  >
            <div className="d-flex flex-row justify-content-between">
                <a href="/" className="text-dark">
                    <div className="d-flex flex-row">
                        <div>
                        <h1 className="fw-bold"> Stories</h1>
                        </div>
                    </div>
                </a>
                <Toolbar>
                    {user ? (
                        <div className="d-flex flex-row align-items-center">
                            <Avatar alt={user.firstName} src={user.imgUrl}>{user.firstName.charAt(0)}</Avatar>
                            &nbsp;&nbsp;
                            <Typography variant="h5" >
                            {user.firstName + " " + user.lastName}
                            </Typography>
                            &nbsp;&nbsp;
                            <Button variant="contained" color="secondary" onClick={handleLogOut}>LogOut</Button>
                        </div>
                    ) : (
                        <Button component={Link} to='/auth' variant="contained" color="primary">Sign-In</Button>
                    )}
                </Toolbar>
            </div>
        </AppBar>
    )
}