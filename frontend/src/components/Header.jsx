import {FaSignInAlt, FaSignOutAlt, FaUser, FaBook , FaBookOpen, FaUserPlus} from 'react-icons/fa'

import {Link , useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout , reset} from '../features/auth/authSlice'


function Header() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

   



  return (
    
    <header className='header'>

        <div className='logo'>
        <Link to='/courses'>
            <FaBook/>Courses</Link> 
            &nbsp;
            &nbsp;
        {/* <Link to ='/search'><FaBook/>Search</Link>
        &nbsp;
            &nbsp; */}
        {user && (user.role =="instructor" || user.role =="admin") ? (
             <Link to='/addcourse'>
             <FaBookOpen/> Add Course
         </Link>
        ): (<></>)}
            &nbsp;
            &nbsp;
        {user && (user.role =="admin") ? (
             <Link to='/newusers'>
             <FaUserPlus/> Add New Users
         </Link>
        ): (<></>)}
         {user && (user.role =="instructor") ? (
             <Link to='/viewmyCoursesIns'>
             <FaBook/> View My Courses
         </Link>
        ): (<></>)}


        </div>
                
        <ul>
            {user ? (
            
            
            
            <li>
            <button className='btn' onClick={onLogout}>
                <FaSignOutAlt/> Logout
                </button>
            
        </li>) : (<>
            <li>
            <Link to='/login'>
                <FaSignInAlt/> Login
            </Link>
        </li>
        <li>
            <Link to='/register'>
                <FaUser/> Register
            </Link>
        </li></>)}
            
        </ul>
        </header>
  )
}

export default Header