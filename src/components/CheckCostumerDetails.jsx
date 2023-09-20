import React from 'react'

const CheckCostumerDetails = () => {
    return (
        <div className='my-10 w-screen h-auto mb-96'>
            <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto border-2 border-slate-200 border-solid'>
                <h3 className='text-2xl font-bold text-center my-4'>Check Costumer Details</h3>
                <form className='p-3' action="">
                    <div className='text-center'>
                        <input required className='bg-slate-200 text-black px-4 rounded-sm py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter event id' type="text" />
                        <input required className='bg-slate-200 my-6 text-black px-4 rounded py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter event Name' type="text" />
                        <input required className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter Costumer Address' type="text" />
                    </div>
                    <p className='text-left w-10/12 text-slate-700 ml-4'>Make sure you entered teh correct address</p>
                    <div className='w-full flex align-center justify-end px-10'>
                        <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>Search</button>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default CheckCostumerDetails