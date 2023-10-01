import React, { useContext, useRef } from 'react';
import { ticketTransfer } from '../utils/ContractInteractions';
import { allContexts } from '../App';
import { toast } from 'react-toastify';

const TransferTicket = () => {
    const { web3Api } = useContext(allContexts);
    const toAddress = useRef(null);
    const quan = useRef(null);
    const id = useRef(null);
    const name = useRef(null);
    return (
        <div>
            <div className='my-10 w-screen h-auto mb-96'>
                <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
                    <h3 className='text-2xl font-bold text-center my-4'>Transfer Event Ticket</h3>
                    <form className='p-3' action="" onSubmit={async (e) => {
                        e.preventDefault();
                        const to = toAddress.current.value;
                        const quantity = quan.current.value;
                        const eventId = id.current.value;
                        const eventName = name.current.value;

                        toast.promise(new Promise(async (resolve, reject) => {
                            if (!eventName || Number(eventId) < 0) {
                                // alert('Enter a valid event name and event id');
                                reject();
                            } else {
                                let res = await ticketTransfer({ quantity, eventId, eventName, web3Api, to });
                                // console.log('transferring tickets res ==>', res);
                                res ? resolve() : reject();
                            }
                        }), {
                            success: 'transfer successfully',
                            error: 'unknown error occurred',
                            pending: 'processing'
                        })


                    }}>
                        <div className='text-center'>

                            <input required ref={toAddress} className='input_all_style'
                                placeholder='Receiver Address' type="text" />

                            <input required ref={quan} className='input_all_style my-6' placeholder='Quantity' type="number" />

                            <input required ref={id} className='input_all_style' placeholder='Event Id' type="number" />

                            <input required ref={name} className='input_all_style my-6' placeholder='Event Name' type="text" />


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