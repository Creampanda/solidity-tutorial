import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
    if (!typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        connectButton.innerHTML = "Connected";
    } else {
        connectButton.innerHTML = "Please install metamask!";
    }
}

async function fund() {
    const ethAmount = "1";
    console.log(`Funding with ${ethAmount}...`);
    if (!typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionRespone = await contract.fund({
                value: ethers.utils.parseEther(ethAmount),
            });
            await listenForTransactionMine(transactionRespone, provider);
            console.log("Done!");
        } catch (error) {
            console.log(error);
        }
    }
}

function listenForTransactionMine(transactionRespone, provider) {
    console.log(`Mining ${transactionRespone.hash}...`);
    return new Promise((resolve, reject) => {
        provider.once(transactionRespone.hash, (transactionReceipt) => {
            console.log(
                `Completed with ${transactionReceipt.confirmations} confirmations`
            );
            resolve();
        });
    });
}
