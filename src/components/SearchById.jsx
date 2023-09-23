import React, { useContext, useRef } from 'react'
import { allContexts } from '../App'
import { seeTotalEvents, searchById } from '../utils/ContractInteractions'

const SearchById = () => {
    const eveId = useRef(null);
    const { totalEvents, web3Api, setTotalEvents, setEventDetails } = useContext(allContexts)
    return (
        <div className='w-full h-auto'>
            <form className='flex justify-center flex-col items-center' onSubmit={async (e) => {
                e.preventDefault();

                let eventId = Number(eveId.current.value);
                if (eveId < 0) {
                    alert('Please enter a valid event Id');
                    return;
                }
                const response = await searchById({ web3Api, eventId })
                setEventDetails(response);
            }}>
                <input required ref={eveId} className='input_all_style mt-6' placeholder='Enter event id' type="number" />
                <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>Search</button>
            </form>
            <div className='p-4 mx-4'>
                <p className='text-left w-10/12 text-slate-700'>Enter the Event Id within the total Events Count.</p>
                <p className='text-left w-10/12 text-slate-700 py-2'> Enter an event id below the event count </p>
                <p className='text-left w-10/12 text-slate-700 text-lg'>Total Events Count <strong>{totalEvents}</strong> <span ><button onClick={async () => { await seeTotalEvents({ web3Api, setTotalEvents }) }} className='font-bold border-slate-900 mx-4 border-b-2'>refresh</button></span></p>
            </div>
        </div>
    )
}

export default SearchById