import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'


import { ReactComponent as ExploreIcon } from '../assets/svg/exploreIcon.svg'
import { ReactComponent as OffersIcon } from '../assets/svg/localOfferIcon.svg'
import { ReactComponent as ProfileIcon } from '../assets/svg/personIcon.svg'


const NavigationBar = () => {
    const navigate = useNavigate()
    const location = useLocation()


    const activePath = (path) => {
        if (path === location.pathname){
            return true
        }
        return false
    }

return (
    <footer className='navbar'>
        <nav className='navbarNav'>
            <ul className='navbarListItems'>
                <li className='navbarListItem' onClick={() => navigate('/')}>
                    <ExploreIcon fill={activePath('/') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                    <p className={activePath('/') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Explore</p>
                </li>
                <li className='navbarListItem' onClick={() => navigate('/offers')}>
                    <OffersIcon fill={activePath('/offers') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                    <p className={activePath('/offers') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Offers</p>
                </li>
                <li className='navbarListItem' onClick={() => navigate('/profile')}>
                    <ProfileIcon fill={activePath('/profile') ? '#2c2c2c' : '#8f8f8f'} width='36px' height='36px' />
                    <p className={activePath('/profile') ? 'navbarListItemNameActive' : 'navbarListItemName'}>Profile</p>
                </li>
            </ul>
        </nav>
    </footer>
)
}

export default NavigationBar;