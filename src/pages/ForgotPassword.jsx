import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'

import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'


const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')


  const onChange = (e) => {
    setEmail(e.target.value)
    }
    
    const onSubmit = async (e) => {
      e.preventDefault()
    
      try {
        const auth = getAuth()
        await sendPasswordResetEmail(auth, email);

        
        toast.success(`A mail has been sent to ${email}`, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored'
          });
    
    
        navigate('/login') 
    
    
    } catch (error) {
      toast.error('Something went wrong', {
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
    <div className='pageContainer'>
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input type="email" name="email" id="email" value={email} onChange={onChange} className='emailInput' placeholder='Enter your Email' />
          <Link to='/login' className='forgotPasswordLink'>Sign In</Link>

          <div className="signInBar">
            <div className="signInText">Send Reset Password Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword