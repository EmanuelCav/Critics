import react from 'react'
import { useDispatch } from 'react-redux';

import { getCategoryApi } from '../../../server/api/critics.api'
import { getCategoryAction } from '../../../server/features/critic.feature'

const CategoryIndex = ({ category }: { category: string }) => {

    const dispatch = useDispatch()

    const getCriticsCategory = async () => {
        const { data } = await getCategoryApi(category)
        dispatch(getCategoryAction(data))
    }

    return (
        <div className='container-text-category'>
            <p className='text-category user-noselect' onClick={getCriticsCategory}>{category}</p>
        </div>
    )
}

export default CategoryIndex
