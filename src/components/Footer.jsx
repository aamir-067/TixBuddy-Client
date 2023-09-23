import React from 'react'
// import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='mt-20'>
            <footer className='w-screen h-24'>
                <div
                    className='w-full h-full bg-slate-900 text-slate-200 flex justify-around items-center'>
                    <ul className='hidden md:flex gap-10'>
                        <li className='text-xl hover:cursor-pointer'><a href="https://www.linkedin.com/in/i-aamir-khan/" target='_blank' rel='noreferrer'><i class="fa-brands fa-linkedin-in"></i></a></li>
                        <li className='text-xl hover:cursor-pointer'><a href="https://portfolio-of-aamir.netlify.app" target='_blank' rel='noreferrer'><i class="fa-solid fa-link"></i></a></li>
                        <li className='text-xl hover:cursor-pointer'><a href="https://wa.me/qr/UTQ77REDUBC7N1" target='_blank' rel='noreferrer'><i class="fa-brands fa-whatsapp"></i></a></li>
                    </ul>
                    <h2 className='text-slate-200 font-bolder capitalize'>made by Aamir with <i className="fa-solid fa-heart text-slate-200"></i></h2>

                    <div className=' hidden md:block hover:scale-105 ease-in-out duration-300'>
                        {/* <Link to={'/support-developer'} className='bg-slate-200 text-slate-900 px-4 py-2 font-bold rounded'>Support developer</Link> */}
                    </div>
                </div>

            </footer>
        </div>
    )
}

export default Footer