import React, { useRef, useContext } from 'react'
import { allContexts } from '../App';
import { searchByName } from '../utils/ContractInteractions';

const SearchByName = () => {
    const eveName = useRef(null);
    const { web3Api, setEventDetails } = useContext(allContexts)
    return (
        <div className='w-full h-auto'>
            <form className='flex justify-center flex-col items-center' onSubmit={async (e) => {
                let eventName = eveName.current.value;
                e.preventDefault();
                if (eventName === '') {
                    alert('Please enter a valid event name');
                    return;
                }
                const response = await searchByName({ eventName, web3Api });
                setEventDetails(response);
            }}>
                <input required ref={eveName} className='bg-slate-200 text-black px-4 mt-6 mb-3 py-2 rounded md:w-7/12 w-11/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                    placeholder='Enter event name' type="text" />
                <p className='text-left w-10/12 text-slate-700'>* Make sure that you write a correct Event name.</p>

                <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>Search</button>

            </form>
        </div>
    )
}

export default SearchByName