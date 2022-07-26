import  {useEffect, useState} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export const useAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [checkStatus, setCheckStatus] = useState(true)

    
    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setIsLoggedIn(true)
            }
            setCheckStatus(false)
        })
    
    
    })
    

    return {isLoggedIn, checkStatus}
}
