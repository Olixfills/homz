import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',

  })
  // eslint-disable-next-line no-unused-vars
  const {name, email, password, phone, address} = formData;
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate()

const onChange = (e) => {
setFormData((prev => ({
  ...prev,
  [e.target.id]: e.target.value
})))
}


  return (
    <>
      <div className="pageContainer">
        <header className='formHeader'>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form>          
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

export default SignUp;