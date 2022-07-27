import React, { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth' 
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import avatar from '../assets/png/avatar.png'

const Profile = () => {
const auth = getAuth()
const navigate = useNavigate()

const [updateDets, setUpdateDets] = useState(false)
const [formData, setFormData] = useState({
  name: auth.currentUser.displayName,
  email: auth.currentUser.email,
  phoneNumber: auth.currentUser.phoneNumber || '',
  photoURL: auth.currentUser.photoURL,
})
const {name, email, phoneNumber, photoURL} = formData


const onLogOut = () => {
  auth.signOut()
  navigate('/login')
  toast.info('Logout Successful', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored'
  })
}
  const onSubmit = async () => {
    try {
      if(auth.currentUser.displayName !== name || auth.currentUser.phoneNumber !== phoneNumber || auth.currentUser.photoURL !== photoURL){
        await updateProfile(auth.currentUser, {
          displayName: name,
          phoneNumber: phoneNumber,
          photoURL: photoURL,
        }) 
        
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
          phoneNumber,
          photoURL
        })
      }
      toast.success('Updated Successfully', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored'
        });
    } catch (error) {
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


  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <div className='profile'>
    <header className="profileHeader">
      <p className="pageHeader">My Profile</p>
        <button className="logOut" type='button' onClick={onLogOut}>Logout</button>
    </header>

    <main>
      <div className="profileDetailsHeader">
        <p className="profileDetailsText">Personal Details</p>
        <p className="changePersonalDetails" onClick={()=>{
          updateDets && onSubmit()
          setUpdateDets(prev=>!prev)
        }}>
          {updateDets ? 'Done' : 'Update'}
        </p>
      </div>

      <div className="profileCard">
        <form>
          <div className="avatar">
          <img src={auth.currentUser.photoURLURL !== null ? auth.currentUser.photoURL : avatar} alt="avatar" />
        

          </div>

          <input type="text" name="name" id="name" className={!updateDets ? 'profileName' : 'profileNameActive'} value={name} onChange={onChange} disabled={!updateDets} />
          <input type="text" name="phoneNumber" id="phoneNumber" className={!updateDets ? 'profileName' : 'profileNameActive'} value={phoneNumber} onChange={onChange} disabled={!updateDets} placeholder='Phone Number' />
          <input type="text" name="email" id="email" className='profileName' value={email} onChange={onChange} disabled={true} />
        </form>
      </div>
    </main>
    </div>
  )


}

export default Profile