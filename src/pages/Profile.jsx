import React, { useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth' 

const Profile = () => {
const auth = getAuth()
const [user, setUser] = useState({})

  useEffect(() => {
    setUser(auth.currentUser)
  
    
  }, [auth.currentUser])
  

  return user ? <h1>{user.displayName}</h1> : 'No User Logged In'


}

export default Profile