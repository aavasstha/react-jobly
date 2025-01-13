import React from "react";
import { Routes, Route} from "react-router-dom";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import WelcomePage from "../components/WelcomePage";
import Companies from "../components/Companies";
import CompanyDetail from "../components/CompanyDetail";
import JobList from "../components/JobList";
import UserProfile from "../components/UserProfile";


function RoutesList({ login, signup, currentUser }) {


    return (
        <div >
            <Routes>
                <Route path="/login" element={<LoginForm login={login} />} />
                <Route path="/signup" element={<SignUpForm signup={signup} />} />
                <Route path="/" element={<WelcomePage currentUser={currentUser} />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/jobs" element={<JobList />} />
                <Route path="/companies/:handle" element={<CompanyDetail />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </div>
    );
}

export default RoutesList;
