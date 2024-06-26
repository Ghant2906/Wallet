const { ethers } = require("ethers");
const contractABI = require("../ABI/faucetAbi.json");
const RPC = "https://rpc.ankr.com/eth_sepolia";
const contractAddress = "0x5fe341AE02dee5b78B76478E0226Fd7F3e81f268";

function connectContract() {
  const provider = new ethers.JsonRpcProvider(RPC);

  const contract = new ethers.Contract(contractAddress, contractABI, provider);

  return contract;
}

module.exports = connectContract;
