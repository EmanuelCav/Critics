import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { SignInUser } from '../../interface/user'

import { signInApi } from '../../server/api/user.api'
import { loginAction } from '../../server/features/user.feature'
import { responseLoginAction } from '../../server/features/response.feature'

import LoginResponse from '../../response/components/loginResponse'

const SignIn = ({ setIsSignUp }: { setIsSignUp: any }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState: SignInUser = {
    email: "",
    password: ""
  }

  const [userData, setUserData] = useState(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const getData = async () => {

    try {

      const { data } = await signInApi(userData)
      dispatch(loginAction(data))

    } catch (error: any) {
      dispatch(responseLoginAction(error.response.data.message))
      return
    }

    navigate('/')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getData()
  }

  const register = () => {
    setIsSignUp(true)
  }

  return (
    <div className="container-form-auth">
      <form className='container-form' onSubmit={handleSubmit}>
        <LoginResponse />
        <div className="separator-form">
          <p className='title-form-auth user-noselect'>Sign in</p>
        </div>
        <div className="separator-form">
          <input type="text" name='email' placeholder='EMAIL' className='input-form' value={userData.email} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <input type="password" name='password' placeholder='PASSWORD' className='input-form' value={userData.password} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <button className='button-signin user-noselect'>Sign in</button>
        </div>
        <div className="separator-form">
          <p className='text-to-register user-noselect'>
            <span className='text-register' onClick={register}>
              Register
            </span> if you have not an account
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignIn