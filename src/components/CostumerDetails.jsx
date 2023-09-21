import React from 'react'

const CostumerDetails = ({ details }) => {
    return (
        <div className='h-auto w-11/12 md:w-10/12 md:max-w-3xl mt-11 justify-center border-2 border-slate-200'>
            <div className='w-full h-full flex items-center justify-between'>
                <div className='w-5/12 pl-2 h-full bg-slate-900 text-slate-200'>
                    <p className='p-1 font-bold md:text-lg text-md'>Event id</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Name</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Costumer</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Tickets</p>
                </div>
                <div className='w-7/12 pl-2'>
                    <p className='p-1 md:text-lg text-md'>{details.eventId}</p>
                    <p className='p-1 md:text-lg text-md'>{details.eventName}</p>
                    <p className='p-1 md:text-lg text-md'>{`${[...details.address].slice(0, 5).join('')}.......${[...details.address].slice(details.address.length - 5, details.address.length).join('')}`}</p>
                    <p className='p-1 md:text-lg text-md'>{details.tkts}</p>
                </div>
            </div>
        </div>
    )
}

export default CostumerDetails