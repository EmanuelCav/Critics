import React from 'react'
import { useSelector } from 'react-redux'
import { Reducer } from '../../interface/reducer'

import Response from '../response';

const LoginResponse = () => {

    const { response } = useSelector((state: Reducer) => state)

    return (
        <div>
            {
                response.responseLogin && <Response msg={response.responseLogin} />
            }
        </div>
    )
}

export default LoginResponse