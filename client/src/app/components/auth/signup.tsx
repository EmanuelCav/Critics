import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { SignUpUser } from '../../interface/user'

import { signUpApi } from '../../server/api/user.api'
import { registerAction } from '../../server/features/user.feature'
import { responseRegisterAction } from '../../server/features/response.feature'

import RegisterResponse from '../../response/components/registerResponse'

const SignUp = ({ setIsSignUp }: { setIsSignUp: any }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const initialState: SignUpUser = {
    name: "",
    surname: "",
    email: "",
    tag: "",
    password: "",
    confirm: ""
  }

  const [userData, setUserData] = useState(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  const getData = async () => {

    try {

      const { data } = await signUpApi(userData)
      dispatch(registerAction(data))

    } catch (error: any) {
      dispatch(responseRegisterAction(error.response.data.message))
      return
    }

    navigate('/')
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getData()
  }

  const cancel = () => {
    setIsSignUp(false)
  }

  return (
    <div className='container-black-form'>
      <form className='container-form' style={{ maxWidth: '37%', boxShadow: 'none' }} onSubmit={handleSubmit}>
        <RegisterResponse />
        <div className="separator-form">
          <p className='title-form-auth user-noselect'>Sign up</p>
        </div>
        <div className="separator-form">
          <input type="text" name='name' placeholder='NAME' className='input-form' value={userData.name} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <input type="text" name='surname' placeholder='SURNAME' className='input-form' value={userData.surname} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <input type="text" name='tag' placeholder='TAG NAME' className='input-form' value={userData.tag} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <input type="text" name='email' placeholder='EMAIL' className='input-form' value={userData.email} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <input type="password" name='password' placeholder='PASSWORD' className='input-form' value={userData.password} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <input type="password" name='confirm' placeholder='CONFIRM PASSWORD' className='input-form' value={userData.confirm} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <button className='button-signin user-noselect'>Sign up</button>
        </div>
        <div className="separator-form">
          <button className='button-danger user-noselect' onClick={cancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}

export default SignUp