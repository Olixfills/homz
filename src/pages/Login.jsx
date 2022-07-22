import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    

  })
  const { email, password,} = formData;
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()

const onChange = (e) => {
setFormData((prev => ({
  ...prev,
  [e.target.id]: e.target.value
})))
}

const onSubmit = async (e) => {
  e.preventDefault()

  try {
    const auth = getAuth()
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    // if (user) {
    //   navigate('/')
    // }
    user && navigate('/') 
} catch (error) {
    console.log(error);
  }


}



  return (
    <>
      <div className="pageContainer">
        <header className='formHeader'>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form onSubmit={onSubmit}>          
          <input 
          type="email" 
          name="email" 
          className='emailInput' 
          id='email' 
          placeholder='email@email.com' 
          value={email}  
          onChange={onChange} />

          <div className="passwordInputDiv">
            <input 
            type={showPassword ? "text" : "password"} 
            name="password" 
            id="password" 
            className='passwordInput' 
            placeholder='Password'
            value={password} 
            onChange={onChange}/>

            <img src={visibilityIcon} 
            alt="showPassword" 
            onClick={()=> setShowPassword(prev => !prev)}
            className='showPassword'/>
          </div>

          <Link to='/reset-password' className='forgotPasswordLink'>Forgot Password?</Link>

          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill='#fff' width='34px' height='34px' />
            </button>
          </div>
        </form>
        <Link to='/signup' className='registerLink'>Not a member? Sign Up instead</Link>

      </div>
    </>
  )
}

export default Login;