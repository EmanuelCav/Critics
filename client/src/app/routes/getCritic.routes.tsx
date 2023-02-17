import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCategoryApi, getCriticApi } from '../server/api/critics.api'
import { getCriticAction, criticsTrendsAction } from '../server/features/critic.feature'

import { Reducer } from '../interface/reducer'

import GetCriticComponent from '../components/index/getCritic'
import Trend from '../components/index/trend.index'

const GetCritic = () => {

  const { critics, user } = useSelector((state: Reducer) => state)

  const params = useParams()
  const dispatch = useDispatch()

  const getData = async () => {
    const { data } = await getCriticApi(params.id as string)
    dispatch(getCriticAction(data))
    const res = await getCategoryApi(data.category)
    dispatch(criticsTrendsAction(res.data))
  }

  useEffect(() => {
    getData()
  }, [])
  

  return (
    <div className='container-getcritic'>
      <Trend />
      <GetCriticComponent critic={critics.critic} user={user} />
    </div>
  )
}

export default GetCritic