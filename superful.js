const { ethers } = require("ethers");

var url = "wss://eth-mainnet.g.alchemy.com/v2/UoinzN6RY6AQS3p0AOBSuyhNKNqqGndf";
var customWsProvider = new ethers.providers.WebSocketProvider(url);

const ALCHEMY_ID = 'UoinzN6RY6AQS3p0AOBSuyhNKNqqGndf'
const provider = new ethers.providers.JsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`)

MAX_SUPPLY = 1337;

const SUPERFUL_ABI = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address) view returns (uint)"
];

const address = '0xc97a4C9773EBfBBA0f32fF147b9B29972AbA0b38' // ESION contract 
const contract= new ethers.Contract(address, SUPERFUL_ABI, provider)

const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

const main = async () => {

    totalSupply = 0;

    while (totalSupply != MAX_SUPPLY) {
        const name = await contract.name()
        const symbol = await contract.symbol()
        totalSupply = await contract.totalSupply()

        // console.log(`\nReading from ${address}\n`)
        // console.log(`Name: ${name}`)
        // console.log(`Symbol: ${symbol}`)
        console.log(`Total Supply: ${totalSupply}`)
        await sleep(2000);
    }
    console.log('SOLD OUT!');
}

main()
	.then(() => process.exit(0))
	.catch(error => {
		console.error(error);
		process.exit(1);
	});