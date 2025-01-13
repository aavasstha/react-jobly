import React from 'react'
import { Link } from 'react-router-dom'


const NavBar = ({ currentUser, logOut }) => {
    return (
        <nav>
            <p><Link to={"/"}>Jobly</Link></p>
            {!currentUser &&
                <>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Log In</Link></li>
                </>}
            {currentUser &&
                <>
                    <li><Link to="/companies">Companies</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button onClick={() => { logOut() }}>LOGOUT</button></li>
                </>}
        </nav>
    )
}

export default NavBar