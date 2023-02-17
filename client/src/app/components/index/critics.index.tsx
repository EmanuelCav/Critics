import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";

import { criticsAction, criticsTrendsAction } from "../../server/features/critic.feature";
import { criticsApi } from '../../server/api/critics.api'

import { Critic } from '../../interface/critic';
import { Reducer } from '../../interface/reducer';

import CriticIndex from './components/critic.index';

const CriticsIndex = () => {

  const { critics } = useSelector((state: Reducer) => state)

  const dispatch = useDispatch()

  const getData = async () => {
    const { data } = await criticsApi()
    dispatch(criticsAction(data)) 
    dispatch(criticsTrendsAction(data))
  }

  useEffect(() => {
    getData()
  }, [dispatch])

  return (
    <div className='container-critics-index'>
      {
        critics.critics?.map((critic: Critic) => {
          return <CriticIndex critic={critic} key={critic._id} />
        })
      }
    </div>
  )
}

export default CriticsIndex