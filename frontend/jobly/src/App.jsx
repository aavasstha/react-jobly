import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import JoblyApi from './Api/api'
import useLocalStorage from './hooks/UseLocalStorage'
import UserContext from './components/UserContext'
import { jwtDecode } from 'jwt-decode'
import RoutesList from './Routes/RouteLists'
import { useNavigate } from 'react-router-dom'

export const TOKEN_STORAGE_ID = "jobly-token";


const App = () => {
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)
  const navigate = useNavigate();


  useEffect(
    function loadUserInfo() {
      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token)
            // put the token on the Api class so it can use it to call the API.
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);

            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
            setApplicationIds(new Set(currentUser.applications));


          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );


  // signup handler
  async function signup(signupData) {
    let token = await JoblyApi.signup(signupData);
    setToken(token);
  }

  // login handler
  async function login(loginData) {
    let token = await JoblyApi.login(loginData);
    setToken(token);
    navigate("/")
  }

  // logout handler
  function logout() {
    setApplicationIds(new Set([]));
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
    navigate("/");

  }

  // Check if jopb has been applied for
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  // Apply to a job
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  return (
    <>
      <UserContext.Provider value={{
        currentUser: currentUser.data,
        setCurrentUser,
        hasAppliedToJob,
        applyToJob,
      }}>
        <NavBar currentUser={currentUser.data} logOut={logout} />
        <RoutesList currentUser={currentUser.data} login={login} signup={signup} />
      </UserContext.Provider>
    </>
  )
}

export default App