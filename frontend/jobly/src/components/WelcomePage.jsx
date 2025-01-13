import React from 'react'

const WelcomePage = ({ currentUser }) => {
    return (
        <div>
            <p>Welcome to Raact-Jobly</p>
            <p>All the jobs in one convenient place</p>
            {!currentUser && <p>PLease sign up or login to continue.</p>
            }
            {currentUser && <p>Welcome Back, {currentUser.username}</p>}
        </div>
    )
}

export default WelcomePage