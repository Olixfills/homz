import React from 'react'
import {Link} from 'react-router-dom'



import {ReactComponent as DeleteIcon} from '../assets/svg/deleteIcon.svg'
import {ReactComponent as EditIcon} from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathIcon from '../assets/svg/bathtubIcon.svg'




function ListngItem({listing, id, onDelete, onEdit}) {
  return (
    <li className='categoryListing' >
        <Link to={`/category/${listing.type}/${id}`} className="categoryListingLink">
            <img src={listing.imageUrls[0]} alt={listing.name} className='categoryListingImg' />
            <div className="categoryListingDetails">
                <p className="categoryListingLocation">{listing.location}</p>
                <p className="categoryListingName">{listing.name}</p>
                
                <p className="categoryListingPrice">₦{listing.offer ? listing.discountedPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{listing.type === 'rent' && ' / month'}</p>
                {listing.offer && <p className="discountPrice">₦{listing.regularPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{listing.type === 'rent' && ' / month'}</p>}
                <div className="categoryListingInfoDiv">
                    <img src={bedIcon} alt="bed" />
                    <p className="categoryListingInfoText">
                        {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                    </p>
                    <img src={bathIcon} alt="bath" />
                    <p className="categoryListingInfoText">
                        {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                    </p>
                </div>
            </div>
        </Link>
        {onDelete && (
            <DeleteIcon fill='rgb(231,76,60)' className='removeIcon' onClick={() => onDelete()} />
        )}
        {onEdit && (
            <EditIcon fill='rgb(110,200,200)' className='editIcon' onClick={() => onEdit()} />
        )}
    </li>
  )
}

export default ListngItem