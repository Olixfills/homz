import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import {db} from '../firebase.config'

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const { name, email, password, phone } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password, name, phone)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name
      })
      const formDataCopy = {...formData, }
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataCopy)


      navigate('/')


    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="pageContainer">
        <header className="formHeader">
          <p className="pageHeader">Welcome!</p>
        </header>
        <form onSubmit={onSubmit}>
          <div className="formDiv">
            <input
              type="text"
              name="name"
              className="nameInput"
              id="name"
              placeholder="Your Name"
              value={name}
              onChange={onChange}
            />
            <input
              type="email"
              name="email"
              className="emailInput"
              id="email"
              placeholder="email@email.com"
              value={email}
              onChange={onChange}
            />
          </div>
            <input
              type="phone"
              name="phone"
              className="emailInput"
              id="phone"
              placeholder="0700 0000 000"
              value={phone}
              onChange={onChange}
            />
            <div className="passwordInputDiv">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="passwordInput"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />

              <img
                src={visibilityIcon}
                alt="showPassword"
                onClick={() => setShowPassword((prev) => !prev)}
                className="showPassword"
              />
          </div>

          

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        <Link to="/login" className="registerLink">
          Allready registered? Sign In instead
        </Link>
      </div>
    </>
  );
};

export default SignUp;
