const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const WalletModule = buildModule("WalletModule", (m) => {
  const wallet = m.contract("Wallet");

  return { wallet };
});

module.exports = WalletModule;
