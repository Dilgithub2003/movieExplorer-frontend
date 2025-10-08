import React from 'react'
import { Navigate } from 'react-router'
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({children}) {
    function isTokenValid(token) {
  try {
    const { exp } = jwtDecode(token);
    return exp * 1000 > Date.now(); // Check expiry
  } catch (err) {
    return false;
  }
}
    const token = localStorage.getItem("token");
    if(!token || !isTokenValid(token)){
        setTimeout(()=>{
            toast.error("Please login first");
        },2000)
        return <Navigate to={"/login"} replace></Navigate>
    }
    return (
        children
    )
}

export default ProtectedRoute
