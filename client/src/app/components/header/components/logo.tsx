import React from 'react'
import { useNavigate } from 'react-router-dom';

const Logo = () => {

  const navigate = useNavigate()

  const redirectIndex = () => {
    navigate('/')
  }

  return (
    <div className='container-logo-header user-noselect'>
      <img src="hand.png" alt="critic-logo" className='logo-header' onClick={redirectIndex} />
      <p className='text-header' onClick={redirectIndex}>Critics</p>
    </div>
  )
}

export default Logo