import React, {useState, useEffect} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCreative, A11y, Autoplay } from 'swiper';
import { doc, getDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'



import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";

const SingleListing = () => {
const [listing, setListing] = useState(null)
const [loading, setLoading] = useState(true)
const [shareLinkCopied, setShareLinkCopied] = useState(false)

const navigate = useNavigate()
const params = useParams()
const auth = getAuth()

useEffect(()=>{
    const fetchListing = async () => {
        const docRef = doc(db, 'listings', params.listingId)

        const  docSnap = await getDoc(docRef)

        if(docSnap.exists()){
            setListing(docSnap.data())
            setLoading(false)
        }
    }
    fetchListing()
},[params.listingId, navigate])

console.log(listing);
if (loading) {
    return <Spinner />
  }

  return (
    <main>
      {/* <Helmet> */}
        <title>{listing.name}</title>
      {/* </Helmet> */}
      <Swiper 
            slidesPerView={1}
            pagination={{
                dynamicBullets: true,
                clickable: true
            }}
            navigation={true}
            loop={true}
            effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        autoplay={{
            "delay": 2500,
            "disableOnInteraction": false
          }}
  
            modules={[Navigation, Pagination, EffectCreative, A11y, Autoplay]}
          >
        {listing.imageUrls.map((url, index) => (
            <SwiperSlide key={index}>
           {/* <div className="swiperSlideDiv">
            <img src={listing.imageUrls[index]} className='swiperSlideImg' alt="" />

           </div> */}
           <div
              style={{
                background: `url(${listing.imageUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
              className='swiperSlideDiv'
            ></div>
            
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(`please checkout this lovely home from HomzNG at: ${window.location.href}` )
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : listing.regularPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

    

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  )
}

export default SingleListing