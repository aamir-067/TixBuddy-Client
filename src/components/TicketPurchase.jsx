import React, { useContext, useRef } from 'react'
import { allContexts } from '../App';
import { tktPurchase } from '../utils/ContractInteractions';
import { Link } from 'react-router-dom';
const TicketPurchase = () => {
    const { web3Api } = useContext(allContexts);
    const id = useRef(null)
    const name = useRef(null)
    const quantity = useRef(null)
    return (
        <div className='my-10 w-screen h-auto mb-96'>
            <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto border-2 border-slate-200 border-solid'>
                <h3 className='text-2xl font-bold text-center my-4'>Purchase Ticket</h3>
                <form className='p-3' action="" onSubmit={async (e) => {
                    e.preventDefault();
                    let eventId = id.current.value;
                    let eventName = name.current.value;
                    let tktsCount = quantity.current.value;
                    eventId = Number(eventId);
                    tktsCount = Number(tktsCount);
                    const response = await tktPurchase({ eventId, eventName, tktsCount, web3Api });
                    if (response) {
                        alert('Tickets a purchased Successfully')
                        id.current.value = '';
                        name.current.value = '';
                        quantity.current.value = '';
                    } else { alert('Tickets are Not Successfully purchased.') }
                }}>
                    <div className='text-center'>
                        <input required ref={id} className='bg-slate-200 text-black px-4 rounded-sm py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter event id' type="number" />
                        <input required ref={name} className='bg-slate-200 my-6 text-black px-4 rounded py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter event Name' type="text" />
                        <input required ref={quantity} className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter ticket quantity' type="number" />
                    </div>
                    <p className='text-left w-10/12 text-slate-700'>i suggest to check available Event first.
                        <Link className='border-b-2 border-slate-900 mx-2 font-bold' to={'/search-events'}>click here</Link></p>
                    <div className='w-full flex align-center justify-end px-10'>
                        <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>confirm</button>
                    </div>
                </form >
            </div>
        </div >
    )
}

export default TicketPurchase