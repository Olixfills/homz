import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStatus } from '../hooks/useAuthStatus'
import Spinner from './Spinner'

const PrivateRoute = () => {
    const {isLoggedIn, checkStatus} = useAuthStatus()


    if(checkStatus){
        return <Spinner />
    }

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute