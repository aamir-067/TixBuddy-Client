import React from 'react'
import illustrator from '../pics/illustrations/404.png'
import { Link } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <div className='w-full h-full flex justify-center'>
            <div className='w-8/12 md:w-5/12 lg:w-4/12 max-h-72 text-center'>
                <img className='w-full object-cover' src={illustrator} alt="representing 404 error" />
                <h2 className='text-2xl md:text-3xl font-bold text-slate-900  '>404 Not found</h2>
                <div className='w-full flex md:justify-evenly mt-5 justify-between'>
                    <Link to={-1} className='bg-slate-900 text-slate-200 py-2 rounded px-4 font-bold hover:scale-105 duration-300 ease-in-out'> Go Back</Link>
                    <Link className='bg-slate-900 text-slate-200 py-2 rounded px-4 font-bold hover:scale-105 duration-300 ease-in-out'>Retry</Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage