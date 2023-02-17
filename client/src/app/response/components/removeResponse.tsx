import React from 'react'
import { useSelector } from 'react-redux'
import { Reducer } from '../../interface/reducer'

import Response from '../response';

const RemoveResponse = () => {

  const { response } = useSelector((state: Reducer) => state)

    return (
        <div>
            {
                response.responseRemove && <Response msg={response.responseRemove} />
            }
        </div>
    )
}

export default RemoveResponse