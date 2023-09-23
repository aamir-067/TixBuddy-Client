import { Link, Outlet } from 'react-router-dom';
import ShowEventDetails from './ShowEventDetails';
import { allContexts } from '../App';
import { useContext } from 'react';

const SeeAllEvents = () => {
    const { eventDetails } = useContext(allContexts);
    return (
        <div className='w-screen h-auto flex justify-center'>

            <div className='h-auto w-11/12 md:w-10/12 md:max-w-3xl mt-11 justify-center'>
                <div className='h-auto w-11/12 md:w-10/12 md:max-w-3xl mt-11 justify-center shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]'>
                    <div className="w-full mb-3 " >
                        <h3 className='text-2xl font-bold text-center my-4'>Search Event</h3>
                        <nav className='md:w-10/12 w-11/12 h-3/6 flex justify-between mx-auto items-center bg-slate-900 text-slate-200 p-3'>
                            <Link className='w-6/12 hover:scale-105 ease-in-out duration-200 transition-all text-center font-bold capitalize text-xl ' to={'by-id'}>by id</Link>
                            <Link className='w-6/12 hover:scale-105 ease-in-out duration-200 transition-all text-center font-bold capitalize text-xl' to={'by-name'}>by Name</Link>
                        </nav>
                        <Outlet />
                    </div>
                </div>

                <div>
                    {eventDetails && (
                        <ShowEventDetails eventDetails={eventDetails} />
                    )}
                </div>
            </div>

        </div>
    )
}

export default SeeAllEvents