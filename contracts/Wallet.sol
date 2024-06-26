//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Wallet {
    address public owner;
    event AddressAdded(address indexed _address);
    event AddressRemoved(address indexed _address);

    mapping(address => bool) public whiteList;

    constructor() {
        owner = msg.sender;
        whiteList[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addWhiteList(address addressMenber) external onlyOwner{
        whiteList[addressMenber] = true;
        emit AddressAdded(addressMenber);
    }

    function removeWhiteList(address addressMenber) external onlyOwner{
        whiteList[addressMenber] = false;
        emit AddressRemoved(addressMenber);
    }

    function deposit() external payable {
    }

    function faucet(address payable receiver) external {
        require(receiver != address(0), "Invalid receiver address");
        require(whiteList[receiver], "Not in whitelist");
        require(address(this).balance >= 0.01 ether, "Insufficient contract balance");

        (bool sent, ) = receiver.call{value: 0.01 ether}("");
        require(sent, "Failed to send Ether");
    }

     function withdraw(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient contract balance");

        (bool sent, ) = payable(owner).call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}