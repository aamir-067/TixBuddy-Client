import React, { useContext, useRef } from 'react'
import { allContexts } from '../App';
import { formatUnixTimestamp } from './ShowEventDetails';
import { toast } from 'react-toastify';
import { showEventDetailsForOwner, withdrawEventFunds, checkCostumerTicketsById } from '../utils/ContractInteractions';
import { ethers } from 'ethers';
const OrgnizerPanel = () => {
    const { web3Api, orgnizerEventDetails, setOrgnizerEventDetails, tktsAmount, setTicketsAmount } = useContext(allContexts);
    const id = useRef(null);
    const name = useRef(null);

    window.ethereum.on('chainChanged', () => {
        setOrgnizerEventDetails(null);
        setTicketsAmount([]);
    });
    window.ethereum.on('accountsChanged', () => {
        setOrgnizerEventDetails(null);
        setTicketsAmount([]);
    });

    return (
        <div className='my-10 w-screen min-w-screen h-auto'>
            <div className='lg:w-5/12 md:w-7/12 my-0 mx-auto w-11/12 h-auto shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
                <h3 className='text-2xl font-bold text-center my-4'>Organizer Dashboard</h3>
                <form className='p-3' action=""
                    onSubmit={async (e) => {
                        e.preventDefault();
                        let eventId = id.current.value;
                        let eventName = name.current.value;
                        eventId = Number(eventId);

                        toast.promise(
                            new Promise(async (resolve, reject) => {
                                const response = await showEventDetailsForOwner({ eventId, eventName, web3Api })
                                if (response) {
                                    resolve(response);
                                    id.current.value = '';
                                    name.current.value = '';
                                    const temp = []
                                    for (let i = 0; i < response[9].length; i++) {
                                        const res = await checkCostumerTicketsById({ web3Api, eventId: ethers.toNumber(response[0]), address: response[9][i] })

                                        temp.push(res.tkts);
                                    }
                                    setTicketsAmount(temp);
                                    setOrgnizerEventDetails(response);
                                }
                                else { reject(undefined); }
                            }), {
                            success: 'Loading completed',
                            error: 'Unknown Error Ocurred',
                            pending: 'Processing please wait'
                        })
                    }}
                >
                    <div className='text-center'>
                        <input required ref={id} className='input_all_style' placeholder='Enter event id' type="number" />
                        <input required ref={name} className='input_all_style my-6' placeholder='Enter event Name' type="text" />
                    </div>
                    <div className='w-full flex align-center justify-end px-10'>
                        <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-4 rounded hover:scale-105 duration-300'>search</button>
                    </div>
                </form >
            </div>

            {orgnizerEventDetails ? <div>
                <div className='w-full flex justify-center items-center my-16'>
                    <div className=' w-11/12 md:w-8/12 lg:w-6/12 text-sm md:text-base'>
                        <div className='w-full h-full flex items-center justify-between  shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                            <div className='w-5/12 pl-2 h-full bg-slate-900 text-slate-200'>
                                <p className='p-1 font-bold md:text-lg text-md'>Id</p>
                                <p className='p-1 font-bold md:text-lg text-md'>Name</p>
                                <p className='p-1 font-bold md:text-lg text-md'>Venue</p>
                                <p className='p-1 font-bold md:text-lg text-md'>Date</p>
                                <p className='p-1 font-bold md:text-lg text-md'>Tickets purchased</p>
                                <p className='p-1 font-bold md:text-lg text-md'>Raised amount</p>
                            </div>
                            <div className='w-7/12 pl-2'>
                                <p className='p-1 md:text-lg text-md'>{ethers.toNumber(orgnizerEventDetails[0])}</p>
                                <p className='p-1 md:text-lg text-md'>{orgnizerEventDetails[1]}</p>
                                <p className='p-1 md:text-lg text-md'>{orgnizerEventDetails[2]}</p>
                                <p className='p-1 md:text-lg text-md'>{formatUnixTimestamp(ethers.toNumber(orgnizerEventDetails[3]))}</p>
                                <p className='p-1 md:text-lg text-md'>{ethers.toNumber(orgnizerEventDetails[4]) - ethers.toNumber(orgnizerEventDetails[5])}</p>
                                <p className='p-1 md:text-lg text-md'>{ethers.formatEther(ethers.toNumber(orgnizerEventDetails[6]) * (ethers.toNumber(orgnizerEventDetails[4]) - ethers.toNumber(orgnizerEventDetails[5])))} eth</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-center items-center'>
                            <button className='bg-slate-900 w-fit text-slate-200 px-4 py-2 uppercase my-8 rounded hover:scale-105 duration-300' onClick={() => {

                                toast.promise(
                                    new Promise(async (resolve, reject) => {
                                        const response = withdrawEventFunds({ web3Api, event: orgnizerEventDetails });
                                        response ? resolve(response) : reject(undefined);
                                    }), {
                                    success: 'Withdraw successfully',
                                    error: 'Unknown Error Ocurred',
                                    pending: 'Processing please wait'
                                })

                            }}>Withdraw funds</button>
                        </div>
                    </div>
                </div>

                <div className='w-full flex justify-center items-center mb-40'>
                    <div className=' w-11/12 md:w-8/12 lg:w-6/12'>
                        <h2 className='text-center'>Tickets holders</h2>
                        <table className='w-full table-auto text-sm md:text-base border-collapse shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
                            <thead className='bg-slate-900 text-slate-200'>
                                <tr className='text-left'>
                                    <th className='py-2 border-r-2 px-4 border-slate-400'>Address</th>
                                    <th className='py-2 px-4 border-slate-400'>Tickets</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orgnizerEventDetails[9].map((holder, index) => {
                                    return <tr id={index}>
                                        <td className='border  py-2 px-4 border-slate-400'>{holder}</td>
                                        <td className='border py-2 px-4 border-slate-400'>{tktsAmount[index]}</td>
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div> : <></>}

        </div >
    )
}

export default OrgnizerPanel
