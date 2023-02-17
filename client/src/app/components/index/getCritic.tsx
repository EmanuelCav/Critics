import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SlOptionsVertical } from 'react-icons/sl'

import { Critic } from '../../interface/critic'

import { removeCriticAction } from '../../server/features/critic.feature'
import { responseRemoveAction } from '../../server/features/response.feature'
import { removeCriticApi } from '../../server/api/critics.api'

import Update from './components/update'

const GetCriticComponent = ({ critic, user }: { critic: Critic, user: any }) => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isOption, setIsOption] = useState(false)
  const [isUpdate, setisUpdate] = useState(false)

  const remove = async () => {

    try {

      const { data } = await removeCriticApi(critic._id, user.user.token)
      dispatch(removeCriticAction(data._id as any))
      dispatch(responseRemoveAction(data.message))

    } catch (error) {
      console.log(error);
    }

    navigate('/profile')

  }

  const showOptions = () => {
    setIsOption(!isOption)
  }
  const update = () => {
    setisUpdate(!isUpdate)
    setIsOption(false)
  }

  return (
    <div className='container-critic-getcritic'>
      {
        isUpdate && <Update setIsUpdate={setisUpdate} critic={critic} user={user} />
      }
      {
        user.user.user?._id === critic.userId && <SlOptionsVertical className='options-getcritic user-noselect' onClick={showOptions} />
      }
      {
        isOption &&
        <div className="container-actions-getcritic">
          <p className='text-action-getcritic user-noselect' onClick={remove}>Remove</p>
          <p className='text-action-getcritic user-noselect' onClick={update}>Update</p>
        </div>
      }
      <h1 className='title-getcritic'>{critic.issue}</h1>
      <p className='description-getcritic'>{critic.description}</p>
      <p className='content-getcritic'>{critic.content}</p>
    </div>
  )
}

export default GetCriticComponent