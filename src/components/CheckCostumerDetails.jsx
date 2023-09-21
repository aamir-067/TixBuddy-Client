import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { allContexts } from '../App'
import CostumerDetails from './CostumerDetails'

const CheckCostumerDetails = () => {
    const { costumerDetails } = useContext(allContexts);
    return (
        <div className='w-screen h-auto flex justify-center'>

            <div className='h-auto w-11/12 md:w-10/12 md:max-w-3xl mt-11 justify-center'>
                <div className='h-auto w-11/12 md:w-10/12 md:max-w-3xl mt-11 justify-center'>
                    <div className="w-full border-2 mb-3 border-slate-200" >
                        <h3 className='text-2xl font-bold text-center my-4'>Costumer Details</h3>
                        <nav className='md:w-10/12 w-11/12 h-3/6 flex justify-between mx-auto items-center bg-slate-900 text-slate-200 p-3'>
                            <Link className='w-6/12 hover:scale-105 ease-in-out duration-200 transition-all text-center font-bold capitalize text-xl ' to={'by-id'}>Search by Id</Link>
                            <Link className='w-6/12 hover:scale-105 ease-in-out duration-200 transition-all text-center font-bold capitalize text-xl' to={'by-name'}>Search by Name</Link>
                        </nav>
                        <Outlet />
                    </div>
                </div>

                {costumerDetails && (
                    <CostumerDetails details={costumerDetails} />
                )}


            </div>

        </div>
    )
}

export default CheckCostumerDetails