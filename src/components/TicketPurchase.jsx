import React, { useContext, useRef } from 'react'
import { allContexts } from '../App';
import { tktPurchase } from '../utils/ContractInteractions';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const TicketPurchase = () => {
    const { web3Api } = useContext(allContexts);
    const id = useRef(null)
    const name = useRef(null)
    const quantity = useRef(null)
    return (
        <div className='my-10 w-screen h-auto mb-96'>
            <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
                <h3 className='text-2xl font-bold text-center my-4'>Purchase Ticket</h3>
                <form className='p-3' action="" onSubmit={async (e) => {
                    e.preventDefault();
                    let eventId = id.current.value;
                    let eventName = name.current.value;
                    let tktsCount = quantity.current.value;
                    eventId = Number(eventId);
                    tktsCount = Number(tktsCount);


                    toast.promise(
                        new Promise(async (resolve, reject) => {
                            const response = await tktPurchase({ eventId, eventName, tktsCount, web3Api })
                            if (response) {
                                // toast.success('Successfully Purchased Tickets');
                                resolve(response);
                                id.current.value = '';
                                name.current.value = '';
                                quantity.current.value = '';
                            }
                            else reject(undefined);
                        }), {
                        success: 'Successfully Purchased Tickets',
                        error: 'Unknown Error Ocurred',
                        pending: 'Processing please wait'
                    })
                    // const response = await tktPurchase({ eventId, eventName, tktsCount, web3Api })
                    // if (response) {
                    //     toast.success('Successfully Purchased Tickets');
                    //     id.current.value = '';
                    //     name.current.value = '';
                    //     quantity.current.value = '';
                    // }
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