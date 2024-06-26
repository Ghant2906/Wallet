const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Wallet", function () {
  let wallet;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    wallet = await ethers.deployContract("Wallet");
    [owner, addr1, addr2] = await ethers.getSigners();
  });

  it("Should deposit ETH to the contract", async function () {
    const depositAmount = ethers.parseEther("1.0");
    await wallet.connect(addr1).deposit({ value: depositAmount });

    const totalETHReceived = await wallet.getContractBalance();
    expect(totalETHReceived).to.equal(depositAmount);
  });

  it("Should rejected because it is not exits in whitelist", async function () {
    await expect(wallet.faucet(addr1.address)).to.be.revertedWith(
      "Not in whitelist"
    );
  });

  it("Should add address to whitelist", async function () {
    await wallet.addWhiteList(addr1.address);
    expect(await wallet.whiteList(addr1.address)).to.equal(true);
  });

  it("Should send 0.01 ETH from contract to address", async function () {
    await wallet.addWhiteList(addr2.address);
    const depositAmount = ethers.parseEther("1.0");
    await wallet.connect(addr1).deposit({ value: depositAmount });
    const faucetAmount = ethers.parseEther("0.01");

    const addr2Balance = await ethers.provider.getBalance(addr2.address);

    await wallet.faucet(addr2.address);

    const finalBalance = await ethers.provider.getBalance(addr2.address);
    expect(finalBalance).to.equal(addr2Balance + faucetAmount);
  });

  it("should remove address from whitelist", async function () {
    await wallet.addWhiteList(addr1.address);
    await wallet.removeWhiteList(addr1.address);
    expect(await wallet.whiteList(addr1.address)).to.equal(false);
  });

  it("Should withdraw ETH from contract to owner", async function () {
    const initialBalance = await ethers.provider.getBalance(owner.address);

    const depositAmount = ethers.parseEther("1.0");
    await wallet.connect(addr1).deposit({ value: depositAmount });

    const withdrawAmount = ethers.parseEther("0.5");

    const tx = await wallet.connect(owner).withdraw(withdrawAmount);
    const receipt = await tx.wait();

    const gasUsed = receipt.gasUsed;
    const gasPrice = receipt.gasPrice;
    const gasCost = gasUsed * gasPrice;

    const finalBalance = await ethers.provider.getBalance(owner.address);
    expect(finalBalance).to.equal(withdrawAmount + initialBalance - gasCost);
  });

  it("Should withdraw ETH from contract to unowner", async function () {
    const depositAmount = ethers.parseEther("1.0");
    await wallet.connect(addr2).deposit({ value: depositAmount });

    const withdrawAmount = ethers.parseEther("0.5");

    await expect(
      wallet.connect(addr1).withdraw(withdrawAmount)
    ).to.be.revertedWith("Only owner can call this function");
  });
});
