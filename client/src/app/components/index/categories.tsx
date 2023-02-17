import React from 'react'
import CategoryIndex from './components/category.index'

const Categories = () => {

    const categories: string[] = ["TV", "Policy", "Business", "Sports", "Sciences and Disciplines", "Games", "Music", 
    "Pets", "Art and Literature", "Vehicles", "Food", "Fashion", "Religion", "World"]

    return (
        <div className='container-categories'>
            <p className='title-events user-noselect'>Categories</p>
            {
                categories.map((category: string, index: number) => {
                    return <CategoryIndex category={category} key={index} />
                })
            }
        </div>
    )
}

export default Categories