import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Reducer } from '../../interface/reducer'
import { Critic } from '../../interface/critic';

import CriticIndex from './components/critic.index';

const Trend = () => {

    const { critics, user } = useSelector((state: Reducer) => state)

    const navigate = useNavigate()
    const location = useLocation()
    const params = useParams()

    const redirectCreate = () => {
        navigate('/create')
    }    

    return (
        <div className='container-trend'>
            {
                location.pathname !== '/create' && user.isAuth && <button className='button-share user-noselect' onClick={redirectCreate}>SHARE A CRITIC</button>
            }
            {
                params.id ? (
                    <p className='title-events user-noselect'>It may interest you</p>
                ) : (
                    <p className='title-events user-noselect'>Trends</p>
                )
            }
            <div className="container-trends">
                {
                    critics.trends?.slice(0,3).map((critic: Critic) => {
                        return <CriticIndex critic={critic} key={critic._id} />
                    })
                }
            </div>
        </div>
    )
}

export default Trend