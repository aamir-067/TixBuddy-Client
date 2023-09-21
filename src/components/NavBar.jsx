import React, { useContext } from 'react'
import { allContexts } from '../App'
import { initializeWeb3Api } from '../utils/ContractInteractions'

const NavBar = ({ setIsMenuOpen, isMenuOpen }) => {
    const handleMenu = (e) => {
        setIsMenuOpen(e.target.checked)
    }
    const { web3Api, setWeb3Api } = useContext(allContexts)

    const initialize = async () => {
        await initializeWeb3Api({ setWeb3Api });
    }

    return (
        <div className='w-screen h-20 md:mt-5 mt-0'>
            <div className='flex md:px-20 px-10 w-full h-full justify-between items-center'>

                <div className='relative w-14 h-14 rounded-full hover:bg-black duration-200 hover:border-slate-200 border-slate-900 ease-in-out transition-all px-3 py-4'>
                    <input className='absolute z-index-10 h-full w-11/12 opacity-0 -mt-3 -ml-2' onChange={(e) => { handleMenu(e) }} type="checkbox" name="menu" id="menu" />

                    <div className={`w-full h-1 border-b-2 rounded-3xl border-inherit transition-all ease-in-out border-solid 
                    ${isMenuOpen ? 'transform rotate-45 translate-y-1 duration-500 -mb-1 mt-2' : ''}`}></div>

                    <div className={`w-8/12 h-1 my-1 border-b-2 rounded-3xl border-inherit transition-all ease-in-out border-solid 
                    ${isMenuOpen ? 'opacity-0 duration-500' : ''}`}></div>

                    <div className={`w-full h-1 border-b-2 rounded-3xl border-inherit transition-all ease-in-out border-solid 
                    ${isMenuOpen ? 'transform -rotate-45 -translate-y-1 duration-500 -ml-0 -mt-1' : ''}`}></div>
                </div>

                <div className='md:text-3xl tracking-wider text-xl capitalize font-sans font-bold mr-3/6 md:mr-0'>
                    TixBuddy
                </div>
                <div className='hidden md:block'>
                    {web3Api.signer ?
                        <p className='font-bold text-lg'>{`${web3Api.signer.address}`.slice(0, 5) + '....' + `${web3Api.signer.address}`.slice(38, 43)}</p> :
                        <button onClick={async () => {
                            await initialize();
                        }} className='px-4 py-2 bg-slate-900 rounded hover:scale-105 duration-300 capitalize font-bold text-slate-200'>wallet Connect</button>}
                </div>
            </div>
        </div>
    )
}

export default NavBar