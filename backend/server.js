// const { ethers } = require("ethers");
// const connectDB = require("./connect/connectDB");

// const RPC = "https://rpc.ankr.com/eth_sepolia";

// const provider = new ethers.JsonRpcProvider(RPC);

// const contractABI = [
//   {
//     inputs: [],
//     stateMutability: "nonpayable",
//     type: "constructor",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "_address",
//         type: "address",
//       },
//     ],
//     name: "AddressAdded",
//     type: "event",
//   },
//   {
//     anonymous: false,
//     inputs: [
//       {
//         indexed: true,
//         internalType: "address",
//         name: "_address",
//         type: "address",
//       },
//     ],
//     name: "AddressRemoved",
//     type: "event",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "addressMenber",
//         type: "address",
//       },
//     ],
//     name: "addWhiteList",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "deposit",
//     outputs: [],
//     stateMutability: "payable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address payable",
//         name: "receiver",
//         type: "address",
//       },
//     ],
//     name: "faucet",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "getContractBalance",
//     outputs: [
//       {
//         internalType: "uint256",
//         name: "",
//         type: "uint256",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [],
//     name: "owner",
//     outputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "addressMenber",
//         type: "address",
//       },
//     ],
//     name: "removeWhiteList",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "address",
//         name: "",
//         type: "address",
//       },
//     ],
//     name: "whiteList",
//     outputs: [
//       {
//         internalType: "bool",
//         name: "",
//         type: "bool",
//       },
//     ],
//     stateMutability: "view",
//     type: "function",
//   },
//   {
//     inputs: [
//       {
//         internalType: "uint256",
//         name: "amount",
//         type: "uint256",
//       },
//     ],
//     name: "withdraw",
//     outputs: [],
//     stateMutability: "nonpayable",
//     type: "function",
//   },
// ];

// const contractAddress = "0x3788cE71B9300F819E10Eb3dC527b7418f59997A";

// const contract = new ethers.Contract(contractAddress, contractABI, provider);

// connectDB();

// contract.on("AddressAdded", async (address) => {
//   try {
//     const addr = await client.query(
//       "SELECT * FROM white_list WHERE address = ($1)",
//       [address]
//     );
//     if (addr.rowCount == 0) {
//       await client.query("INSERT INTO white_list (address) VALUES ($1)", [
//         address,
//       ]);
//       console.log("Address saved to database:", address);
//     }
//   } catch (err) {
//     console.error("Error saving to database", err);
//   }
// });

// contract.on("AddressRemoved", async (address) => {
//   try {
//     await client.query("DELETE FROM white_list WHERE address = ($1)", [
//       address,
//     ]);
//     console.log("Address removed to database:", address);
//   } catch (err) {
//     console.error("Error removed to database", err);
//   }
// });

const express = require("express");
const app = express();
const port = 3000;
const eventListener = require("./services/eventListener");

eventListener();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
