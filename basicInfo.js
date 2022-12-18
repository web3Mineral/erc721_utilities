const { ethers, BigNumber } = require('ethers');
const INFURA_ID = '7075cf6acf224e56b313752477e77010'
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
const {privateKey} = require('./conf/secret.json');
const readlineSync = require('readline-sync');

const ERC20_ABI = [
    "function balanceOf(address owner) public view returns (uint256 balance)",
    "function ownerOf(uint256 tokenId) public view returns (address owner)",
    "function maxSupply() public view returns (uint256)", // view 가 붙어야 wallet connect 없이 호출 가능
    "function totalSupply() public view returns (uint256)",
    "function owner() public view returns (address)"

];

const main = async () => {
    
    var address = readlineSync.question('Enter the contract address of NFT :');
    // Ecotars : 0x9d10d24c65959e817cf7d514d804d49b1c3d32fb
     
    const contract = new ethers.Contract(address, ERC20_ABI, provider);

    const maxSupply = await contract.maxSupply()
    console.log(`max supply : ${maxSupply.toNumber()}`)

    const totalSupply = await contract.totalSupply()
    console.log(`total supply : ${totalSupply.toNumber()}`)

    const owner = await contract.owner()
    console.log(`owner : ${owner}`)

}

main()