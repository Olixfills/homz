import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'

const PrivateRoute = () => {
    const {isLoggedIn, checkStatus} = useAuthStatus()


    if(checkStatus){
        return <h3>Loading...</h3>
    }

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute