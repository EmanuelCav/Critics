import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Critic, CriticUpdate } from '../../../interface/critic'

import { updateCriticApi } from '../../../server/api/critics.api'
import { updateCriticAction } from '../../../server/features/critic.feature'
import { responseUpdateAction } from '../../../server/features/response.feature'
import UpdateResponse from '../../../response/components/updateResponse'

const Update = ({ setIsUpdate, critic, user }: { setIsUpdate: any, critic: Critic, user: any }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const initialState: CriticUpdate = {
        issue: critic.issue,
        description: critic.description,
        content: critic.content,
        category: critic.category
    }

    const [criticData, setDriticData] = useState(initialState)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setDriticData({...criticData, [name]: value})
    }

    const getData = async () => {

        try {

            const { data } = await updateCriticApi(criticData, critic._id, user.user.token)
            dispatch(updateCriticAction(data))
            
        } catch (error: any) {
            dispatch(responseUpdateAction(error.response.data.message))
            return
        }

        navigate('/profile')
    }

    const handleSumbit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        getData()
    }

    const cancel = () => {
        setIsUpdate(false)
    }

    return (
        <div className='container-black-form'>
            <form className='container-form' style={{ boxShadow: 'none' }} onSubmit={handleSumbit}>
                <UpdateResponse />
                <div className="separator-form">
                    <p className='title-form-auth user-noselect'>Update a critic</p>
                </div>
                <div className="separator-form">
                    <input type="text" name='issue' placeholder='NAME' className='input-form' value={criticData.issue} onChange={handleChange} autoComplete="off" />
                </div>
                <div className="separator-form">
                    <input name='description' placeholder='DESCRIPTION' className='input-form' value={criticData.description} onChange={handleChange} autoComplete="off" />
                </div>
                <div className="separator-form">
                    <textarea name="content" placeholder='CONTENT' className='input-form' value={criticData.content} onChange={handleChange}
                        style={{ resize: 'none', height: '210px', fontSize: '20px' }} />
                </div>
                <div className="separator-form">
                    <button className='button-signin user-noselect'>Update</button>
                </div>
                <div className="separator-form">
                    <button className='button-danger user-noselect' onClick={cancel}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Update