import React from 'react'
import Categories from '../components/index/categories'
import CriticsIndex from '../components/index/critics.index'
import Trend from '../components/index/trend.index'

const Index = () => {
    return (
        <div className='container-index'>
            <Trend />
            <CriticsIndex />
            <Categories />
        </div>
    )
}

export default Index