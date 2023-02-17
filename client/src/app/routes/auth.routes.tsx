import React, { useState } from 'react'

import LogoAuth from '../components/auth/logo.auth'
import SignIn from '../components/auth/signin'
import SignUp from '../components/auth/signup'


const Auth = () => {

  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  
  return (
    <div className='container-auth'>
      <LogoAuth />
      <SignIn setIsSignUp={setIsSignUp} />
      {
        isSignUp && <SignUp setIsSignUp={setIsSignUp} />
      }
    </div>
  )
}

export default Auth