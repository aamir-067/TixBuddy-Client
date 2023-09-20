import React, { useState, createContext, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TicketPurchase from './components/TicketPurchase';
import Footer from './components/Footer';
import CheckCostumerDetails from './components/CheckCostumerDetails';
import SeeAllEvents from './components/SeeAllEvents';
import Hero from './components/Hero';
import SupportDeveloper from './components/SupportDeveloper';
import TransferTicket from './components/TransferTicket';
import ErrorPage from './components/ErrorPage';
import Menu from './components/Menu';
import OrgnizeEvent from './components/OrgnizeEvent';
import SearchById from './components/SearchById';
import SearchByName from './components/SearchByName';
import AdminPanel from './components/AdminPanel';
import './App.css';
import OrgnizerPanel from './components/OrgnizerPanel';
// import artifacts from './artifacts/Ticket.json'
// import { ethers } from 'ethers';

const allContexts = createContext();
function App() {
    const developer = "0x575cA73E642983fF8818F0cb0Fa692A788Bc45A4";
    const [isDeveloper, setIsDeveloper] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [web3Api, setWeb3Api] = useState({ provider: null, signer: null, contract: null });
    const [totalEvents, setTotalEvents] = useState(0);
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        function temp() {
            developer === web3Api.signer.address ? setIsDeveloper(true) : setIsDeveloper(false);
        }

        web3Api.signer && temp();
    }, [web3Api])

    return (
        <allContexts.Provider
            value={{ web3Api, setWeb3Api, totalEvents, isDeveloper, setTotalEvents, eventDetails, setEventDetails }}>
            <HashRouter>
                <div className="w-screen min-h-screen overflow-x-hidden">
                    <NavBar setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
                    <Menu isOpen={isMenuOpen} />
                    <Routes>
                        <Route path='/' element={<Hero isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />} />
                        <Route path='purchase-tkt' element={<TicketPurchase />} />
                        <Route path='transfer-tkt' element={<TransferTicket />} />
                        <Route path='organize-event' element={< OrgnizeEvent />} />
                        <Route path='search-events' element={< SeeAllEvents />}>
                            <Route index element={<SearchById />} />
                            <Route path='by-id' element={<SearchById />} />
                            <Route path='by-name' element={<SearchByName />} />
                        </Route>

                        <Route path='costumer-details' element={< CheckCostumerDetails />} />
                        <Route path='support-developer' element={< SupportDeveloper />} />
                        <Route path='orgnizer-panel' element={< OrgnizerPanel />} />
                        <Route path='admin-panel' element={< AdminPanel />} />
                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
                </div>
                <Footer />
            </HashRouter>
        </allContexts.Provider>
    );
}

export default App;
export { allContexts };