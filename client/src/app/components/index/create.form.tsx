import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CriticCreate } from '../../interface/critic'
import { createCriticApi } from '../../server/api/critics.api'
import { createCriticAction } from '../../server/features/critic.feature'
import { responseCreateAction } from '../../server/features/response.feature'

import CreateResponse from '../../response/components/createResponse'
import { Reducer } from '../../interface/reducer'

const CreateForm = () => {

  const { user } = useSelector((state: Reducer) => state)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const initialState: CriticCreate = {
    issue: "",
    description: "",
    content: "",
    category: ""
  }

  const [criticData, setCriticData] = useState(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCriticData({ ...criticData, [name]: value })
  }

  const getData = async () => {

    try {

      const { data } = await createCriticApi(criticData, user.user.token)
      dispatch(createCriticAction(data))

    } catch (error: any) {
      if (error.data) {
        dispatch(responseCreateAction(error.response.data.message))
        return
      }
    }

    navigate('/profile')

  }

  const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    getData()
  }

  return (
    <div className='container-create-form'>
      <form className='container-form' style={{ boxShadow: 'none' }} onSubmit={handleSumbit}>
        <CreateResponse />
        <div className="separator-form">
          <p className='title-form-auth user-noselect'>Share a critic</p>
        </div>
        <div className="separator-form">
          <input type="text" name='issue' placeholder='ISSUE' className='input-form' value={criticData.issue} onChange={handleChange} autoComplete="off" />
        </div>
        <div className="separator-form">
          <input type="text" name='description' placeholder='DESCRIPTION' className='input-form' value={criticData.description} onChange={handleChange} autoComplete="off" />
        </div>
        <div className="separator-form">
          <textarea name="content" placeholder='CONTENT' className='input-form'
            style={{ resize: 'none', height: '210px', fontSize: '20px' }} value={criticData.content} onChange={handleChange} />
        </div>
        <div className="separator-form">
          <select name="category" value={criticData.category} className="input-form" onChange={handleChange}>
            <option value="" disabled>Select a category</option>
            <option value="TV">TV</option>
            <option value="Policy">Policy</option>
            <option value="Business">Business</option>
            <option value="Sports">Sports</option>
            <option value="Sciences and Disciplines">Sciences and Disciplines</option>
            <option value="Games">Games</option>
            <option value="Music">Music</option>
            <option value="Pets">Pets</option>
            <option value="Art and Literature">Art and Literature</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Food">Food</option>
            <option value="Fashion">Fashion</option>
            <option value="Religion">Religion</option>
            <option value="World">World</option>
          </select>
        </div>
        <div className="separator-form">
          <button className='button-signin user-noselect'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateForm