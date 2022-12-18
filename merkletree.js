const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');
const {whitelistAddresses} = require('./whitelist/crypt_2.json');

const leafNodes = whitelistAddresses.map(addr => keccak256(addr));
const merkleTree = new MerkleTree(leafNodes, keccak256, {sortPairs: true});

//const merkleTree = new MerkleTree(whitelistAddresses, keccak256, {sortPairs: true});

claimingAddress = "0xa0d33d8F7CAd1d75A1121DB06e6DD6ADc9dc53a5";

// console.log('hash : 0x' + keccak256(claimingAddress).toString('hex') + '\n');

const rootHash = merkleTree.getRoot();
console.log('Merkle Root : ', rootHash.toString('hex'));
console.log('Wallet Address : ', claimingAddress);

// console.log('\nWhitelist Merkle Tree\n', merkleTree.toString());
// const claimingAddress = leafNodes[0]; // proof 를 구할 EOA
// {inputs:[{internalType:"uint256",name:"amount_",type:"uint256"},{internalType:"bytes32[]",name:"proof_",type:"bytes32[]"}],name:"whitelistMint",outputs:[],stateMutability:"nonpayable",type:"function"}

const hexProof = merkleTree.getHexProof(keccak256(claimingAddress));

console.log('Proof : ' + hexProof);
// console.log(hexProof);
