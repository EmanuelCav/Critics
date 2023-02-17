import React from 'react'
import { useSelector } from 'react-redux'
import { Reducer } from '../../interface/reducer'

import Response from '../response';

const UpdateResponse = () => {

    const { response } = useSelector((state: Reducer) => state)

    return (
        <div>
            {
                response.responseUpdate && <Response msg={response.responseUpdate} />
            }
        </div>
    )
}

export default UpdateResponse