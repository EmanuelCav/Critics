import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import RemoveResponse from '../response/components/removeResponse'

import { Reducer } from '../interface/reducer';
import { myCriticsApi } from '../server/api/critics.api';
import { criticsAction } from '../server/features/critic.feature';
import { Critic } from '../interface/critic';

import CriticIndex from '../components/index/components/critic.index';

const Profile = () => {

  const { user, critics } = useSelector((state: Reducer) => state)

  const dispatch = useDispatch()

  const getData = async () => {
    const { data } = await myCriticsApi(user.user.token)
    dispatch(criticsAction(data))
  }

  useEffect(() => {
    getData()
  }, [dispatch])


  return (
    <div className='container-profile'>
      <h1 className='user-profile user-noselect'>{user.user.user.tag}</h1>
      <div className='container-amount-posts'>
        {critics.critics === null ? (
          <p className='amount-posts user-noselect'>POSTS: 0</p>
        ) : (
          <p className='amount-posts user-noselect'>POSTS: {critics.critics?.length}</p>
        )}
      </div>
      <RemoveResponse />
      <div className='container-critics-index'>
        {
          critics.critics?.map((critic: Critic) => {
            return <CriticIndex critic={critic} key={critic._id} />
          })
        }
      </div>
    </div>
  )
}

export default Profile