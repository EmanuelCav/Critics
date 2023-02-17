import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { Reducer } from '../../../interface/reducer'
import { logout } from '../../../server/features/user.feature'

const AuthHeader = () => {

  const dispatch = useDispatch()

  const { user } = useSelector((state: Reducer) => state)

  const signOff = () => {
    dispatch(logout())
  }

  return (
    <div className='container-auth-header'>
      {
        !user.isAuth ? (
          <Link to="/auth" className='redirect-login user-noselect'>Log in</Link>
        ) : (
          <div>
            <Link to="/profile" className='redirect-login user-noselect'>Profile</Link>
            <Link to="/" className='redirect-login user-noselect' onClick={signOff}>Sign off</Link>
          </div>
        )
      }
    </div>
  )
}

export default AuthHeader