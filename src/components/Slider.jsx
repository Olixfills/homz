import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCreative, A11y, Autoplay } from 'swiper';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";

import Spinner from './Spinner'

function Slider() {
  const [loading, setLoading] = useState(true)
  const [listings, setListings] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, 'listings')
      const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
      const querySnap = await getDocs(q)

      let listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings(listings)
      setLoading(false)
    }

    fetchListings()
  }, [])

  if (loading) {
    return <Spinner />
  }

  if (listings.length === 0) {
    return <></>
  }

  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>

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
        >          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                  width: '100%'
                }}
                className='swiperSlideDiv'
              >
              
              
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  )
}


export default Slider