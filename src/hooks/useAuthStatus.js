import  {useEffect, useState, useRef} from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export const useAuthStatus = () => {
    const isMounted = useRef(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [checkStatus, setCheckStatus] = useState(true)

    
    useEffect(() => {
        if(isMounted){
            const auth = getAuth()
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setIsLoggedIn(true)
                }
                setCheckStatus(false)
            })
        }
    
        return ()=>{
            isMounted.current = false
        }
    
    },[isMounted])
    

    return {isLoggedIn, checkStatus}
}
