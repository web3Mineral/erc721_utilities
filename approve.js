const { ethers, BigNumber } = require('ethers');
const INFURA_ID = '7075cf6acf224e56b313752477e77010'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
const {privateKey} = require('./conf/secret.json');
const readlineSync = require('readline-sync');

// exchange contract address
const seaport = '0x1E0049783F008A0085193E00003D00cd54003c71'
const looksRare = '0xf42aa99F011A1fA7CDA90E5E98b277E306BcA83e'
const x2y2 = '0xF849de01B080aDC3A814FaBE1E2087475cF2E354'
const sudoSwap = '0x2B2e8cDA09bBA9660dCA5cB6233787738Ad68329'
const blur = '0x00000000000111AbE46ff893f3B2fdF1F759a8A8'

const wallet = new ethers.Wallet(privateKey, provider)

const ERC20_ABI = [
    "function balanceOf(address owner) public view returns (uint256 balance)",
    "function setApprovalForAll(address operator, bool _approved)",
    "function maxSupply() public view returns (uint256)" // view 가 붙어야 wallet connect 없이 호출 가능한듯
];

const main = async () => {
    
    var address = readlineSync.question('Enter the contract address of NFT :');

    const contract = new ethers.Contract(address, ERC20_ABI, provider);
    const contractWithWallet = contract.connect(wallet)

    console.log('OpenSea :', seaport);
    console.log('LooksRare :', looksRare);
    console.log('X2Y2 :', x2y2);
    console.log('SudoSwap :', sudoSwap);
    console.log('Blur :', blur);
    var marketplace = readlineSync.question('Enter the delegate contract address of marketplace :');

    const tx = await contractWithWallet.setApprovalForAll(marketplace, true)
    await tx.wait()

    console.log(tx)
}

main()