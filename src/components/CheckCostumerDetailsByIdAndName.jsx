import React, { useContext, useRef } from 'react'
import { checkCostumerTicketsById, checkCostumerTicketsByName } from '../utils/ContractInteractions'
import { allContexts } from '../App';

const CheckCostumerDetailsById = () => {
    const { setCostumerDetails, web3Api } = useContext(allContexts)
    const add = useRef(null);
    const e = useRef(null);
    return (
        <div className='w-full h-auto'>
            <form className='flex justify-center flex-col items-center' onSubmit={async (event) => {
                event.preventDefault();
                const eventId = Number(e.current.value)
                const address = add.current.value;
                const response = await checkCostumerTicketsById({ web3Api, eventId, address });
                setCostumerDetails(response)
                console.log("response from checking the costumer details by id ", response);
            }}>
                <input required ref={e} className='input_all_style my-6' placeholder='Event id' type="number" />
                <input required ref={add} className='input_all_style mb-6' placeholder='Costumer Address' type="text" />

                <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>Search</button>
            </form>
            <div className='p-4'>
                <span className='font-bold text-left'>Note:</span>
                <p className='ml-2'>1. if you entered a wrong address it may will give you an error</p>
                <p className='ml-2'>2. Make sure that you have entered the correct event id</p>
                <p className='ml-2'>3. If you entered an invalid event id then it will shows you 0 tickets</p>
            </div>
        </div>
    )
}
const CheckCostumerDetailsByName = () => {
    const { setCostumerDetails, web3Api } = useContext(allContexts)
    const add = useRef(null);
    const n = useRef(null);
    return (
        <div className='w-full h-auto'>
            <form className='flex justify-center flex-col items-center' onSubmit={async (e) => {
                e.preventDefault();
                const eventName = n.current.value;
                const address = add.current.value;
                const response = await checkCostumerTicketsByName({ web3Api, eventName, address });
                setCostumerDetails(response)
                console.log("response from checking the costumer details by name ", response);
            }}>
                <input required ref={n} className='input_all_style mt-6' placeholder='Event name' type="text" />
                <input required ref={add} className='input_all_style my-6' placeholder='Costumer Address' type="text" />
                <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>Search</button>
            </form>
            <div className='p-4'>
                <span className='font-bold text-left'>Note:</span>
                <p className='ml-2'>1. if you entered a wrong address it may will give you an error</p>
                <p className='ml-2'>3. If you entered an invalid event id it may gives an error</p>
            </div>
        </div>
    )
}

export { CheckCostumerDetailsById, CheckCostumerDetailsByName };