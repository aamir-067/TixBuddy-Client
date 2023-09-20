import React, { useContext, useRef } from 'react';
import { ticketTransfer } from '../utils/ContractInteractions';
import { allContexts } from '../App';

const TransferTicket = () => {
    const { web3Api } = useContext(allContexts);
    const toAddress = useRef(null);
    const quan = useRef(null);
    const id = useRef(null);
    const name = useRef(null);
    return (
        <div>
            <div className='my-10 w-screen h-auto mb-96'>
                <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto border-2 border-slate-200 border-solid'>
                    <h3 className='text-2xl font-bold text-center my-4'>Transfer Event Ticket</h3>
                    <form className='p-3' action="" onSubmit={async (e) => {
                        e.preventDefault();
                        const to = toAddress.current.value;
                        const quantity = quan.current.value;
                        const eventId = id.current.value;
                        const eventName = name.current.value;
                        if (!eventName || Number(eventId) < 0) {
                            alert('Enter a valid event name and event id');
                        } else {
                            let res = await ticketTransfer({ quantity, eventId, eventName, web3Api, to });
                            console.log('transferring tickets res ==>', res);
                            // ! ======= Handle the response here accordingly and determine that its transfer or not. ========
                        }

                    }}>
                        <div className='text-center'>

                            <input required ref={toAddress} className='bg-slate-200 text-black px-4 rounded-sm py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                                placeholder='Receiver Address' type="text" />

                            <input required ref={quan} className='bg-slate-200 my-6 text-black px-4 rounded py-2 w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                                placeholder='Quantity' type="number" />

                            <input required ref={id} className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                                placeholder='Event Id' type="number" />

                            <input required ref={name} className='bg-slate-200 text-black px-4 mb-6 py-2 rounded w-10/12 focus:outline-none focus:border-2 focus:border-black focus:border-solid'
                                placeholder='Event Name' type="text" />


                        </div>
                        <p className='text-left w-10/12 text-slate-700'>* Make sure that you read the terms and conditions.</p>
                        <div className='w-full flex align-center justify-end px-10'>
                            <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>confirm</button>
                        </div>
                    </form >
                </div>
                <div className='w-11/12 h-auto flex flex-col justify-between my-6 md:mx-16 mx-6'>
                    <h3 className='font-bold text-xl capitalize'>Terms And conditions</h3>
                    <div className='my-4 mx-4'>
                        <p><strong>1. </strong>To transfer tickets of the event to other address make sure you have purchased enough tickets before sending it.</p>
                        <p><strong>2. </strong>Double Check the recipient address before sending the tickets.</p>
                        <p><strong>3. </strong>Make sure you send the valid Event tickets to the address.</p>
                        <p><strong>4. </strong>You can't send the tickets of the past event to anyone. it will show in your account but its useless.</p>
                        <p><strong>5. </strong>If you try to transfer tickets less then zero or in minus then the transaction maybe failed.</p>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default TransferTicket