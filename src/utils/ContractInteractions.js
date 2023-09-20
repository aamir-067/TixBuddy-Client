const { ethers } = require('ethers');
const artifacts = require('../artifacts/Ticket.json');
let contractAddress = '0xa85c2779438411E22a220594e08031497abE648d';
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
        } else {
            console.error('please install metamask');
            process.exit(1);
        }
    } catch (e) {
        console.error(e);
    }
}


const EventOrgnize = async ({ web3Api, eveName, eveVenue, unixTime, eveTktsQuantity, tktPriceInWei }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect Wallet first')
        } else {
            console.log('web3Api.contract ==> ', web3Api.contract);
            const res = await web3Api.contract.createEvent(eveName, eveVenue, unixTime, eveTktsQuantity, tktPriceInWei, { value: ethers.parseEther('0.001') });
            console.log('response of event Creation ====>', res);
        }
    } catch (e) {
        console.error('error in Event Orgnization', e);
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
            console.log('response of searching event ===>', res);
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
            console.log('response of searching event', res);
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
        if (ethers.toNumber(temp[5]) === 0) { return false }  // avail tkts
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

        }
        else if (tktsCount <= 0) {
            alert('You must have to purchase at least one ticket');
        }
        else {
            const temp = await searchById({ eventId, web3Api });
            let eventPrice = ethers.toNumber(temp[6]);
            let totalPrice = eventPrice * tktsCount;
            const validEvent = await isValidEvent({ eventId, web3Api });
            if (!validEvent) {  // its not a valid event
                alert('This event is not valid');
                return;
            }

            const res = await web3Api.contract.purchaseTkt(eventId, eventName, tktsCount, { value: ethers.toBigInt(totalPrice) });
            console.log('response of purchasing event tickets==>', res);
            return res;
        }
    } catch (e) {
        console.error(e);
    }
}


// for transferring ticket to each other.

const ticketTransfer = async ({ to, quantity, eventId, eventName, web3Api }) => {

    try {
        if (!web3Api.contract) {
            alert('Please Connect Wallet First');

        }
        if (!ethers.isAddress(to)) {
            alert('The Given address is not valid');
        } else {
            const res = await web3Api.contract.TransferTickets(to, quantity, eventId, eventName);
            console.log('response of transfer tickets ==>', res);
        }
    } catch (e) {
        console.error(e);
    }
}

// For Checking the Costumer details means the costumer available tickets for the specific event.

// byId
const checkCostumerTicketsById = async ({ web3Api, eventId, address }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect wallet first');
        } else {
            let temp = await isValidEvent({ web3Api, eventId });
            if (!temp) {
                alert("This event is not valid please try again");
            } else {
                let res = await web3Api.contract.tktHolders(address, eventId);
                console.log('response of searching Costumer Event tickets details ==>', res);
                return ethers.toNumber(res);
            }
        }
    } catch (e) {
        console.error(e);
    }
}

// searching costumer ticket by name.
const checkCostumerTicketsByName = async ({ web3Api, eventName, address }) => {
    try {
        if (!web3Api.contract) {
            alert('Please connect wallet first');
        } else {
            let tempEvent = await searchByName({ eventName, web3Api });
            if (tempEvent[1]) {  // ==> eventName != '' ==> valid event
                let eventId = ethers.toNumber(tempEvent[0]);
                let res = await checkCostumerTicketsById({ web3Api, eventId, address });
                return res;
            }
        }
    } catch (e) {
        console.error(e);
    }
}





export {
    initializeWeb3Api, EventOrgnize, seeTotalEvents, searchById, searchByName, tktPurchase, ticketTransfer,
    checkCostumerTicketsById, checkCostumerTicketsByName
};
