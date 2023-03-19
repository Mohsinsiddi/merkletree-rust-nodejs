const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

// List of 7 public Ethereum addresses
let addresses = [
  "3jnUmfGewsmm9V8p8iVU3wS2TtPoX3oAUjemWLiBmp4G",
  "7Tm4rRNYcuQs5t8GzKm19CzjSdoQPnw9HUPbDbXxGu6L",
  "9ybhjTNuHT5DcP9p5c91F7Kxtrrx1BUQSNivVqPu7r7P",
];

// Hash leaves
let leaves = addresses.map((addr) => keccak256(addr));

// Create tree
let merkleTree = new MerkleTree(leaves, keccak256, { sortPairs: true });
let rootHash = merkleTree.getRoot().toString("hex");

// Pretty-print tree
console.log(merkleTree.toString());
console.log("Root Hash", rootHash);

console.log(`---------------------Verification----------------------`);

let address = addresses[0];
let hashedAddress = keccak256(address);
let proof = merkleTree.getHexProof(hashedAddress);
console.log(proof);

let v = merkleTree.verify(proof, hashedAddress, rootHash);
console.log(v); // returns true
