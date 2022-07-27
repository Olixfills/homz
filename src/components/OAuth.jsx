import { useNavigate, useLocation } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { toast } from "react-toastify"
import googleIcon from '../assets/svg/googleIcon.svg'
import { db } from "../firebase.config"

const OAuth = () => {
    const location = useLocation()
    const navigate = useNavigate()

const onGoogleClick = async () => {
    try {
        const auth = getAuth()
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        const user = result.user

        const docRef = doc(db, 'users', user.uid)
        const docSnap = await getDoc(docRef)

        if(!docSnap.exists()){
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                timestamp: serverTimestamp(),
            })
        }
        toast.success(`Signed ${!docSnap.exists() ? 'Up' : 'In'} Successfully`, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
            });
        navigate('/')


    } catch (error) {
        console.log(error)
        toast.error('Something went wrong, please try again', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored'
            });
    }
}

  return (
    <div className="socialLogin">
        <p>Sign {location.pathname === '/signup' ? 'Up' : 'In'} with Google</p>
        <button className="socialIconDiv" onClick={onGoogleClick}>
            <img src={googleIcon} alt="google" className="socialIconImg" />
        </button>
    </div>
  )
}

export default OAuth