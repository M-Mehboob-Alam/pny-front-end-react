import React from 'react'
import { Navigate, Outlet, } from 'react-router-dom';

const AuthPages = () => {

   const isLogin =  localStorage.getItem('user');
    console.log(isLogin);
  return         isLogin ? <Outlet/> : <Navigate to='/signup' />
       
  
}

export default AuthPages