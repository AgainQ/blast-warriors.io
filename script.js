"use strict";

// Notification functionality
const notificationEl = document.querySelector(".notification");
const notificationBtnCloseEl = document.querySelector(
  ".notification__btn--close"
);
const headerEl = document.querySelector("header");

function hideNotification() {
  notificationEl.classList.add("hidden");
  headerEl.classList.add("header-height");
}

notificationBtnCloseEl.addEventListener("click", hideNotification);

// FAQ functionality
const faqItems = document.querySelectorAll(".faq__item");

faqItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Toggle the 'hidden' class on the answer within this FAQ item
    const answer = item.querySelector(".faq__answer");
    answer.classList.toggle("hidden");

    // Toggle the rotation class on the icon within this FAQ item
    const icon = item.querySelector(".faq__icon");
    icon.classList.toggle("faq__icon--rotate");
  });
});

const connectBtnEl = document.querySelector(".btn--connect");

async function switchToBlastSepoliaNetwork() {
  try {
    // Convert the decimal chain ID to hexadecimal
    const chainIdHex = "0x" + parseInt(81457).toString(16);

    // Parameters for the Blast Sepolia Network
    const blastSepoliaParams = {
      chainId: chainIdHex, // Hexadecimal string of the chain ID, prefixed with 0x
      chainName: "Blast",
      nativeCurrency: {
        name: "Ethereum", // Name of the native currency
        symbol: "ETH", // Symbol of the native currency
        decimals: 18,
      },
      rpcUrls: ["https://rpc.ankr.com/blast"], // Array of RPC URLs
      blockExplorerUrls: ["https://blastscan.io/"], // Array of block explorer URLs
    };

    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [blastSepoliaParams],
    });
  } catch (error) {
    console.error("Failed to switch to the Blast Sepolia Network:", error);
  }
}

function shortenAddress(address) {
  const firstPart = address.slice(0, 6); // Take the first 6 characters
  const lastPart = address.slice(-5); // Take the last 4 characters
  return `${firstPart}...${lastPart}`; // Concatenate with ellipsis in the middle
}

const mint_bears_tx = document.querySelector(".btn--bear");
const mint_bulls_tx = document.querySelector(".btn--bull");

// Extend the connect button event listener to include network switching
connectBtnEl.addEventListener("click", async () => {
  if (window.ethereum) {
    try {
      await ethereum.request({ method: "eth_requestAccounts" });
      if (ethereum.selectedAddress) {
        console.log(ethereum.selectedAddress);
        const shortenedAddress = shortenAddress(ethereum.selectedAddress);
        connectBtnEl.textContent = shortenedAddress;

        // After successfully connecting, prompt to switch to the Blast Sepolia Network
        await switchToBlastSepoliaNetwork();
      }
    } catch (err) {
      console.error(err);
    }
  }
});

let accounts = [];

// Send Ethereum to an address
mint_bulls_tx.addEventListener("click", async () => {
  await getAccount();
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          data: "0x14f710fe",
          to: "0x24e78259fea1838182bd07eE3293B7CeeedF76CB",
          value: "0x9184E72A000",
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error(error));
});

//

mint_bears_tx.addEventListener("click", async () => {
  await getAccount();
  ethereum
    .request({
      method: "eth_sendTransaction",
      params: [
        {
          from: accounts[0],
          data: "0x14f710fe",
          to: "0xE837A4B49aaB0adF36cf9EDC0Db6Dd271392A79e",
          value: "0x9184E72A000", // 0.00001
        },
      ],
    })
    .then((txHash) => console.log(txHash))
    .catch((error) => console.error(error));
});

async function getAccount() {
  accounts = await ethereum.request({ method: "eth_requestAccounts" });
}
