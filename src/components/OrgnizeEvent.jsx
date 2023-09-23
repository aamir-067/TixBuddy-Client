import React, { useContext, useRef } from 'react';
import { allContexts } from '../App';
import { EventOrgnize, seeTotalEvents } from '../utils/ContractInteractions';
import { toast } from 'react-toastify';
// import { ethers } from 'ethers';


const OrgnizeEvent = () => {
    const { setTotalEvents, web3Api, setWeb3Api } = useContext(allContexts);

    const name = useRef(null);
    const venue = useRef(null);
    const time = useRef(null);
    const tktQuantity = useRef(null);
    const tktPrice = useRef(null);


    return (
        <div className='my-10 w-screen h-auto mb-96 '>
            <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto  shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
                <h3 className='text-2xl font-bold text-center my-4'>Organize Event</h3>
                <form className='p-3' action="" onSubmit={async (e) => {
                    e.preventDefault();
                    let eveName = name.current.value;
                    if (eveName === "") {
                        alert('Enter a valid event name');
                        return;
                    }
                    let eveVenue = venue.current.value;
                    let eveTime = time.current.value;

                    const date = new Date(eveTime);
                    if (isNaN(date.getTime())) {
                        alert("Invalid date. Please enter a valid datetime.");
                        return;
                    }
                    const unixTime = date.getTime() / 1000;

                    let eveTktsQuantity = tktQuantity.current.value;
                    let tktPriceInWei = tktPrice.current.value;

                    // console.log(eveName, eveVenue, unixTime, eveTktsQuantity, tktPriceInWei);

                    toast.promise(new Promise(async (resolve, reject) => {
                        const res = await EventOrgnize({ web3Api, eveName, eveVenue, unixTime, eveTktsQuantity, tktPriceInWei })
                        res ? resolve() : reject();
                    }), {
                        success: 'Event organized successfully',
                        pending: 'processing',
                        error: 'Error occurred'
                    })

                    setTimeout(async () => {   // to update the total events count. (not necessary)
                        const res = await seeTotalEvents({ web3Api, setWeb3Api });
                        await setTotalEvents(Number(res));
                    }, 5000)

                }}>
                    <div className='text-center'>

                        <input required ref={name} className='bg-slate-200 text-black px-4 rounded-sm py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Name' type="text" />

                        <input required ref={venue} className='bg-slate-200 my-6 text-black px-4 rounded py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Venue' type="text" />

                        <input required ref={time} className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Time (in Unix timestamp)' type="datetime-local" />

                        <input required ref={tktQuantity} className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Enter total ticket quantity' type="number" />

                        <input required ref={tktPrice} className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                            placeholder='Price per ticket in wei' type="number" />

                    </div>
                    <p className='text-left w-10/12 text-slate-700'>* Make sure that you read the terms and conditions.</p>
                    <div className='w-full flex align-center justify-end px-10'>
                        <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300' >confirm</button>
                    </div>
                </form >
            </div>
            <div className='w-11/12 h-auto flex flex-col justify-between my-6 md:mx-16 mx-6'>
                <h3 className='font-bold text-xl capitalize'>Terms And conditions</h3>
                <div className='my-4 mx-4'>
                    <p><strong>1. </strong>To organize and register an event you must have a <strong>1000000 gwei</strong> excluding transaction fee in your wallet.</p>
                    <p><strong>2. </strong>Make sure you entered the correct and valid information.</p>
                    <p><strong>3. </strong>To withdraw the amount of the tickets you have to wait until the event you registered is ended.</p>
                </div>
            </div>
        </div >
    )
}

export default OrgnizeEvent