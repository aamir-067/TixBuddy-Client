const { ethers } = require('ethers');
const artifacts = require('../artifacts/Ticket.json');
let contractAddress = '0x62C362184f4207df6Aa4E88E84194Dc19801A234';
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
            const res = await web3Api.contract.createEvent(eveName, eveVenue, unixTime, eveTktsQuantity, tktPriceInWei, { value: ethers.parseEther('0.001') });
            console.log('response of event Creation ====>', res);
            return false;
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
            // alert('Please Connect Wallet First');
            return false;

        }
        else if (tktsCount <= 0) {
            return false;
        }
        else {
            const temp = await searchById({ eventId, web3Api });
            let eventPrice = ethers.toNumber(temp[6]);
            let totalPrice = eventPrice * tktsCount;
            const validEvent = await isValidEvent({ eventId, web3Api });
            if (ethers.toNumber(temp[5]) === 0) { return false }  // avail tkts == 0
            if (!validEvent) {  // its not a valid event
                return false;
            }
            await web3Api.contract.purchaseTkt(eventId, eventName, tktsCount, { value: ethers.toBigInt(totalPrice) });
            // console.log('response of purchasing event tickets==>', res);
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
            await web3Api.contract.TransferTickets(to, quantity, eventId, eventName);
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
            } else {
                alert('You entered a wrong event name');
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
