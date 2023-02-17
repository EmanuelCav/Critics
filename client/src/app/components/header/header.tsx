import React from 'react'
import { useLocation } from 'react-router-dom'

import AuthHeader from './components/auth.header'
import Logo from './components/logo'


const Header = () => {
  
  const location = useLocation()

  return (
    <div className='container-header'>
        <Logo />
        {
          location.pathname !== "/auth" && <AuthHeader />
        }
    </div>
  )
}

export default Header