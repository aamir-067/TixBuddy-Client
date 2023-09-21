import React from 'react'
import { ethers } from 'ethers'

const ShowEventDetails = ({ eventDetails }) => {

    function formatUnixTimestamp(unixTimestamp) {
        if (unixTimestamp === 0) {
            return 'Undefined'
        }
        const date = new Date(unixTimestamp * 1000);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedDate = `${day}-${month}-${year}`;
        const formattedTime = `${formattedHours}:${minutes} ${amOrPm}`;
        return `${formattedDate} ${formattedTime}`;
    }


    return (
        <div className='h-auto w-11/12 md:w-10/12 md:max-w-3xl mt-11 justify-center border-2 border-slate-200'>
            <div className='w-full h-full flex items-center justify-between'>
                <div className='w-5/12 pl-2 h-full bg-slate-900 text-slate-200'>
                    <p className='p-1 font-bold md:text-lg text-md'>Id</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Name</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Venue</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Date</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Avail Tickets</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Ticket Price</p>
                    <p className='p-1 font-bold md:text-lg text-md'>Organizer</p>
                </div>
                <div className='w-7/12 pl-2'>
                    <p className='p-1 md:text-lg text-md'>{ethers.toNumber(eventDetails[0])}</p>
                    <p className='p-1 md:text-lg text-md'>{eventDetails[1] ? eventDetails[1] : 'undefined'}</p>
                    <p className='p-1 md:text-lg text-md'>{eventDetails[2] ? eventDetails[2] : 'undefined'}</p>
                    <p className='p-1 md:text-lg text-md'>{formatUnixTimestamp(ethers.toNumber(eventDetails[3]))}</p>
                    <p className='p-1 md:text-lg text-md'>{ethers.toNumber(eventDetails[5])}</p>
                    <p className='p-1 md:text-lg text-md'>{ethers.formatUnits(eventDetails[6], "gwei")} gwei</p>
                    <p className='p-1 md:text-lg text-md'>{`${[...eventDetails[7]].slice(0, 5).join('')}.......${[...eventDetails[7]].slice(eventDetails[7].length - 5, eventDetails[7].length).join('')}`}</p>
                </div>
            </div>
        </div>

    )
}

export default ShowEventDetails