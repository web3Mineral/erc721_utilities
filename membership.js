const { ethers } = require("ethers");

const ALCHEMY_ID = 'UoinzN6RY6AQS3p0AOBSuyhNKNqqGndf'
const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`)

//Abstract Binary Interface
const ERC721_ABI = [
    // "function name() view returns (string)",
    // "function symbol() view returns (string)",
    // "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint256)",
    "function tokenOfOwnerByIndex(address, uint256) view returns (uint256)" // erc-721 표준이 아닌듯
];

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

const address = '0xf442459c8bb4b891b789e816775232b812eb2ccd' // NFT Contract
const contract = new ethers.Contract(address, ERC721_ABI, provider)
const wallet = '0xE96995006efC68f5eB9F9E46ABA26e9F1e3e967e';

const main = async () => {

    balance = 0

    while (balance == 0) {
        balance = await contract.balanceOf(wallet)
        await sleep(500); // polling rate(ms)
        process.stdout.write('.');
    }

    console.log(`\nThe number of tokens detected : ${balance}`)

    // for loop -> get index
    // if (balance > 0) {
    //     const tokenId = await contract.tokenOfOwnerByIndex(wallet, 0);
    //     console.log(`Token Id: ${tokenId}\n`)
    // }
}

main()