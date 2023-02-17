import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Critic } from '../../../interface/critic'

const CriticIndex = ({ critic }: { critic: Critic }) => {

  const navigate = useNavigate()

  const getCritic = () => {
    navigate(`/${critic._id}`)
  }

  return (
    <div className="container-critic-index">
      <h1 className='title-critic' onClick={getCritic}>{critic.issue}</h1>
      <p className='description-critic'>{critic.description}</p>
    </div>
  )
}

export default CriticIndex