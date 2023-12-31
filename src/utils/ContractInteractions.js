import { ethers } from 'ethers';
import artifacts from '../artifacts/Ticket.json';
let contractAddress = '0xB420c03Ef2480Dd903E4f51e2670425DFdCFf576';
// let acc = "b3e5b1136f7e6ad214a07566d8d8a4d4853ae7dd9e10c696b177b637f53a88fb";
// let url = "https://eth-sepolia.g.alchemy.com/v2/-swbKwsMm_2b92TCKf5i_HTgEUbbcqEk";



const createContract = async ({ signer }) => {
    const contract = await new ethers.Contract(contractAddress, artifacts.abi, signer);
    return contract;
}
const initializeWeb3Api = async ({ setWeb3Api }) => {
    try {
        if (window.ethereum) {
            const provider = await new ethers.BrowserProvider(window.ethereum);
            // const provider = await new ethers.JsonRpcProvider(url);
            const signer = await provider.getSigner();
            const contract = await createContract({ signer })
            await setWeb3Api({ provider: provider, signer: signer, contract: contract });
            window.ethereum.on('chainChanged', async () => {
                await initializeWeb3Api({ setWeb3Api });
            });
            window.ethereum.on('accountsChanged', async () => {
                await initializeWeb3Api({ setWeb3Api });
            });
            return true;
        } else {
            console.error('please install metamask');
            return false;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

const EventOrgnize = async ({ web3Api, eveName, eveVenue, unixTime, eveTktsQuantity, tktPriceInWei }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect Wallet first');
            return false;
        } else {
            console.log('web3Api.contract ==> ', web3Api.contract);
            let pp = ethers.parseEther(tktPriceInWei);
            pp = ethers.toNumber(pp);
            const res = await web3Api.contract.createEvent(eveName, eveVenue, unixTime, eveTktsQuantity, pp, { value: ethers.parseEther('0.001') });
            await res.wait();
            console.log('response of event Creation ====>', res);
            return true;
        }
    } catch (e) {
        console.error('error in Event Organization', e);
        return false;
    }
}

const seeTotalEvents = async ({ web3Api, setTotalEvents }) => {
    try {
        if (!web3Api.contract) {
            alert('Please Connect Wallet First');
        } else {
            const res = await web3Api.contract.totalEvents();
            setTotalEvents(Number(res));
        }

    } catch (e) {
        console.error('error in seeTotalEvents', e);
    }
}



// to check event by id
const searchById = async ({ eventId, web3Api }) => {
    try {
        if (!web3Api.contract) {
            alert('Please Connect Wallet First');

        } else {
            const res = await web3Api.contract.searchEventById(eventId);
            // console.log('response of searching event ===>', res);
            return res;
        }
    } catch (e) {
        console.error(e);
    }
}


const searchByName = async ({ eventName, web3Api }) => {
    try {
        if (!web3Api.contract) {
            alert('Please Connect Wallet First');

        } else {
            const res = await web3Api.contract.searchEventByName(eventName);
            // console.log('response of searching event', res);
            return res;
        }
    } catch (e) {
        console.error(e);
    }
}



// only for internal use only
async function isValidEvent({ eventId, web3Api }) {
    try {
        let temp = await searchById({ eventId, web3Api });
        if (temp[1] === '') { return false }   // name === ''
        if (ethers.toNumber(temp[3]) <= Math.floor(Date.now() / 1000)) { return false } // event is expired
        if (ethers.toNumber(temp[6]) === 0) { return false } // tktPrice === 0 
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}

async function tktPurchase({ eventId, eventName, tktsCount, web3Api }) {
    try {
        if (!web3Api.contract) {
            alert('Please Connect Wallet First');
            return false;

        }
        else if (tktsCount <= 0) {
            alert('Tickets must be greater the 0')
            return false;
        }
        else {
            const temp = await searchById({ eventId, web3Api });
            let eventPrice = ethers.toNumber(temp[6]);
            let totalPrice = eventPrice * tktsCount;
            const validEvent = await isValidEvent({ eventId, web3Api });
            if (ethers.toNumber(temp[5]) === 0) { return false }  // avail tkts == 0
            if (!validEvent) {  // its not a valid event
                alert('its not a valid event')
                return false;
            }
            const res = await web3Api.contract.purchaseTkt(eventId, eventName, tktsCount, { value: totalPrice });
            await res.wait();
            return true;
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}


// for transferring ticket to each other.
// todo : on successful it will return true so manage in accordingly.
const ticketTransfer = async ({ to, quantity, eventId, eventName, web3Api }) => {

    try {
        if (!web3Api.contract) {
            alert('Please Connect Wallet First');
            return false;

        }
        if (!ethers.isAddress(to)) {
            alert('The Given address is not valid');
            return false;
        } else {
            const validEvent = await isValidEvent({ eventId, web3Api });
            if (!validEvent) { return false; }
            const availTkts = await checkCostumerTicketsById({ web3Api, eventId, address: web3Api.signer.address });
            if (availTkts.tkts < quantity) { return false; } // not enough tickets.
            const res = await web3Api.contract.TransferTickets(to, quantity, eventId, eventName);
            await res.wait();
            return true;
        }
    } catch (e) {
        console.error(e);
        return true;
    }
}

// For Checking the Costumer details means the costumer available tickets for the specific event.

// byId
const checkCostumerTicketsById = async ({ web3Api, eventId, address }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect wallet first');
            return undefined;
        } else {
            let temp = await searchById({ web3Api, eventId });
            if (!temp[1]) {   // eventName != "" 
                alert("This event is not valid please try again");
                return undefined;
            } else {
                let res = await web3Api.contract.tktHolders(address, eventId);
                console.log('response of searching Costumer Event tickets details ==>', res);
                return { tkts: ethers.toNumber(res), eventName: temp[1], eventId: eventId, address: address };
            }
        }
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

// searching costumer ticket by name.
const checkCostumerTicketsByName = async ({ web3Api, eventName, address }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect wallet first');
            return false;
        } else {
            let tempEvent = await searchByName({ eventName, web3Api });
            if (tempEvent[1]) {  // ==> eventName != '' ==> valid event
                let eventId = ethers.toNumber(tempEvent[0]);
                let res = await checkCostumerTicketsById({ web3Api, eventId, address });
                return res;
            } else {
                alert('You entered a wrong event name');
                return false;
            }
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}


// Event Organizer Functions.
const showEventDetailsForOwner = async ({ web3Api, eventId, eventName }) => {
    try {
        if (!web3Api.contract) {
            alert("Please connect wallet first");
            return false;
        } else {
            let res = await searchById({ web3Api, eventId });
            if (res[1] !== eventName) {  // event name is not matching.
                alert('This event does not exist');
                return false;
            }

            // check if caller is owner or not.
            if (res[7] !== web3Api.signer.address) {
                alert('you are not owner of this event');
                return false;
            }
            return res;

        }
    } catch (e) {
        console.error(e);
        return false;
    }
}

const withdrawEventFunds = async ({ web3Api, event }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect wallet first');
            return false;
        } else {
            let tempEvent = await searchByName({ eventName: event[1], web3Api });
            if (tempEvent[7] === web3Api.signer.address) {  // ==> the real owner
                if (ethers.toNumber(tempEvent[3]) < (Date.now() / 1000)) {  // ==> event is passed.

                    const res = await web3Api.contract.getSoldtktAmount(ethers.toNumber(tempEvent[0]), tempEvent[1]);
                    await res.wait();
                    return true;
                } else {
                    alert(`You can't withdraw funds right now`);
                    return false;
                }
            } else {
                alert('You are not the owner of this event.');
                return false;
            }
        }
    } catch (e) {
        console.error(e);
        return false;
    }
}



export {
    initializeWeb3Api, EventOrgnize, seeTotalEvents, searchById, searchByName, tktPurchase, ticketTransfer,
    checkCostumerTicketsById, checkCostumerTicketsByName, showEventDetailsForOwner, withdrawEventFunds
};
