import React from 'react'
import { useSelector } from 'react-redux'
import { Reducer } from '../../interface/reducer'

import Response from '../response';

const RegisterResponse = () => {

    const { response } = useSelector((state: Reducer) => state)

    return (
        <div>
            {
                response.responseRegister && <Response msg={response.responseRegister} />
            }
        </div>
    )
}

export default RegisterResponse