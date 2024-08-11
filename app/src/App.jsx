import React, { useEffect, useState } from 'react'
import Item from './Components/Item'

const App = () => {
    const BASE_URL = 'http://localhost:9000/'
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filteredData, setFilteredData] = useState(null)

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await fetch(BASE_URL)
                const rawData = await res.json()
                setData(rawData)
                setFilteredData(rawData)
                setLoading(false)
            }
            catch (err) {
                setError('Unable to fetch data')
            }
        }
        getData()
    }, [])

    const searchItem = e => {
        const val = e.target.value
        if (val === '') {
            setFilteredData(data)
        }

        const filter = data?.filter((food) => (
            food.name.toLowerCase().includes(val.toLowerCase())
        ))
        setFilteredData(filter)
    }

    const filterFood = type => {
        if (type === 'all') {
            setFilteredData(data)
        }
        else {
            const filter = data?.filter((food) => (
                food.type.toLowerCase() === type.toLowerCase()
            ))
            setFilteredData(filter)
        }
    }

    if (error) return <div>{error}</div>
    if (loading) return <div>loading...</div>

    return (
        <>
            <nav className='w-screen bg-slate-700 text-white'>
                <div className='flex flex-col lg:flex-row justify-center lg:justify-around py-9 px-10'>
                    <img src='../public/logo.svg' alt='logo' className='p-10 lg:p-0' />
                    <input type='search' onChange={searchItem} placeholder='Search Food...' className='px-2 placeholder:text-white bg-slate-700 outline-none border border-red-600 rounded mx-10 lg:mx-0' />
                </div>
                <ul className='flex gap-3 justify-center py-4'>
                    <li className='btn' onClick={() => filterFood('all')}>All</li>
                    <li className='btn' onClick={() => filterFood('breakfast')}>Breakfast</li>
                    <li className='btn' onClick={() => filterFood('lunch')}>Lunch</li>
                    <li className='btn' onClick={() => filterFood('dinner')}>Dinner</li>
                </ul>
            </nav>

            <Item data={filteredData} />
        </>
    )
}

export default App

