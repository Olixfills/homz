import React, { useState, useEffect } from 'react'
import { getAuth, updateProfile } from 'firebase/auth' 
import { doc, updateDoc, collection, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


import avatar from '../assets/png/avatar.png'
import arrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListngItem from '../components/ListngItem';

const Profile = () => {
const auth = getAuth()
const navigate = useNavigate()

const [loading, setLoading] = useState(true)
const [listings, setListings] = useState(true)
const [updateDets, setUpdateDets] = useState(false)
const [formData, setFormData] = useState({
  name: auth.currentUser.displayName,
  email: auth.currentUser.email,
  phoneNumber: auth.currentUser.phoneNumber || '',
  photoURL: auth.currentUser.photoURL,
})
const {name, email, phoneNumber, photoURL} = formData

useEffect(()=>{
  const fetchUserListings = async ()=>{
    const listingsRef = collection(db, 'listings')
    const q = query(listingsRef, where('userRef', '==', auth.currentUser.uid), orderBy('timestamp', 'desc'))
    const querySnap = await getDocs(q)

    let listings = []

    querySnap.forEach((doc)=> {
      return listings.push({
        id: doc.id,
        data: doc.data()
      })
    })

    setListings(listings)
    setLoading(false)


  }


  fetchUserListings()
}, [auth.currentUser.uid])



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

  const onDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', listingId))
      const updatedListings = listings.filter(
        (listing) => listing.id !== listingId
      )
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => navigate(`/edit-listing/${listingId}`)





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
          <img src={auth.currentUser.photoURL !== null ? auth.currentUser.photoURL || photoURL : avatar} alt="avatar" />
        

          </div>

          <input type="text" name="name" id="name" className={!updateDets ? 'profileName' : 'profileNameActive'} value={name} onChange={onChange} disabled={!updateDets} />
          <input type="text" name="phoneNumber" id="phoneNumber" className={!updateDets ? 'profileName' : 'profileNameActive'} value={phoneNumber || auth.currentUser.phoneNumber || ''} onChange={onChange} disabled={!updateDets} placeholder='Phone Number' />
          <input type="text" name="email" id="email" className='profileName' value={email} onChange={onChange} disabled={true} />
        </form>
      </div>


      <Link to='/create-listing' className='createListing'>
        <img src={homeIcon} alt="home" />
        <p>Rent or Sell your home</p>
        <img src={arrowRightIcon} alt="arrow right" />

      </Link>


      {!loading && listings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
              {listings.map((listing) => (
                <ListngItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
    </main>
    </div>
  )


}

export default Profile