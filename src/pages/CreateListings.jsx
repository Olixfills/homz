/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth';

const CreateListings = () => {
    const [geoLocationEnabled, setGeoLocationEnabled] = useState(true)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        address: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: [],
        latitude: 0,
        longitude: 0
    })


  return (
    <div>
        Create
    </div>
  )
}

export default CreateListings