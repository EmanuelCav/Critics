import React from 'react'
import { useSelector } from 'react-redux'
import { Reducer } from '../../interface/reducer'

import Response from '../response';

const CreateResponse = () => {

    const { response } = useSelector((state: Reducer) => state)

    return (
        <div>
            {
                response.responseCreate && <Response msg={response.responseCreate} />
            }
        </div>
    )
}

export default CreateResponse