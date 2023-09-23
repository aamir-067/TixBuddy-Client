import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { allContexts } from '../App';

const Menu = () => {
    const { isDeveloper, isMenuOpen, setIsMenuOpen } = useContext(allContexts);
    return (
        <div className={`absolute w-screen h-screen z-index-999 duration-1000 transition-all ease-in-out
        ${isMenuOpen ? 'right-0' : 'right-full'}`}>
            <div className='bg-slate-900 w-11/12 max-w-xs h-5/6 '>
                <ul className='h-full w-full flex flex-col justify-start mx-6 gap-4'>
                    <li className='text-slate-200 text-xl mx mt-6 hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/'} onClick={() => { setIsMenuOpen(false) }}>Home</Link>
                    </li>
                    <li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/purchase-tkt'} onClick={() => { setIsMenuOpen(false) }}>Purchase Ticket</Link>
                    </li>
                    <li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/transfer-tkt'} onClick={() => { setIsMenuOpen(false) }}>Transfer Ticket</Link>
                    </li>
                    <li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/organize-event'} onClick={() => { setIsMenuOpen(false) }}>Organize Event</Link>
                    </li>
                    <li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/search-events'} onClick={() => { setIsMenuOpen(false) }}>Search Event</Link>
                    </li>
                    <li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/costumer-details'} onClick={() => { setIsMenuOpen(false) }}>Costumer Details</Link>
                    </li>
                    <li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/orgnizer-panel'} onClick={() => { setIsMenuOpen(false) }}>Orgnizer Page</Link>
                    </li>
                    {isDeveloper && (<li className='text-slate-200 text-xl mx hover:scale-125 hover:font-bold hover:ml-8 ease-in-out duration-300'>
                        <Link to={'/admin-panel'} onClick={() => { setIsMenuOpen(false) }}>Admin Panel</Link>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}

export default Menu