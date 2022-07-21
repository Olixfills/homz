import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import visibilityIcon from '../assets/svg/visibilityIcon.svg'


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',

  })
  const {name, email, password, phone, address} = formData;
  const navigate = useNavigate()

const onChange = (e) => {

}


  return (
    <>
      <div className="pageContainer">
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <form>
          <div className='formDiv'>
          <input type="email" name="email" className='emailInput' id='email' placeholder='Email@email.com' value={email} min={6} onChange={onChange} />
          <input type="email" name="email" className='emailInput' id='email' placeholder='Email@email.com' value={email} min={6} onChange={onChange} />
          </div>
        </form>
      </div>
    </>
  )
}

export default Login;