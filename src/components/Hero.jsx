import React from 'react'
import HeroImage from '../pics/hero1.jpg'
import { Link } from 'react-router-dom'

const Hero = ({ setIsMenuOpen, isMenuOpen }) => {
    return (
        <div className='w-screen h-auto my-4 mx-10 mt-16'>
            <div className='w-full h-full flex flex-col md:flex-row md:justify-between items-center '>
                <div className=' h-full md:w-6/12 md:flex md:flex-col md:justify-evenly md:items-center mx-20 ml-0 mb-20 md:mb-0 md:ml-20'>
                    <div className='w-full'>
                        <h2 className='md:text-4xl text-2xl font-bold capitalize '>Get Ready for Hassle-Free Event Access</h2>
                        <h4 className='text-md md:text-xl font-bold text-left my-4'>Plan Your Next Adventure</h4>
                        <p>"Welcome to TixBuddy, where event enthusiasts effortlessly discover and purchase tickets, while also having the freedom to securely share them with friends. Join us for a simplified, community-driven approach to event experiences."</p>
                        <div className='md:flex gap-20 mt-6 items-center'>
                            <Link to={'/purchase-tkt'}>   <button className='py-1 px-4 text-lg font-bold text-slate-200 capitalize hover:scale-105 transition-all ease-in-out duration-300 rounded bg-slate-900 '>get started</button> </Link>
                        </div>
                    </div>
                    <div className='temp hidden md:block'></div>
                </div>
                <div className='h-full md:w-6/12 w-full md:flex justify-between items-center md:mr-20'>
                    <img className='h-10/12 w-10/12  md:w-full md:h-full object-cover' src={HeroImage} alt="two peoples hand exchanging a file or ticket" />
                </div>
            </div>
        </div>
    )
}

export default Hero