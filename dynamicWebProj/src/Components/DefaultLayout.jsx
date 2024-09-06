import axios from "axios";
import { useStateContext } from "../contexts/contextprovider";
import { useContext, useEffect } from "react";
import axiosClient from "../axiosClient";
import { Navigate, Outlet } from "react-router-dom";

export default function DefaultLayout() {
  const {user, token, setUser, setToken} = useStateContext();
  if (!token) {
   return  <Navigate to='/login'/>
  }

  const onLogout = ev => {
    ev.preventDefault();
    axiosClient.get('/logout')
    .then(({}) => {
       setUser(null)
       setToken(null)
    })
  }

  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])


  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
          <div>
            <a href="#" className="logo">
            React x Laravel
            </a>
         
          </div>
          <div>
         <div className="nav_lists">
          <span className="name"> {user.name}</span>
         <a href="#" onClick={onLogout} className="btn btn-logout">Logout</a>
         </div>
          </div>
        </header>
        <main>
        <Outlet />
      </main>
      </div>
    </div>
  )
}