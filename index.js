const bip39 = require("bip39");
const ethers = require("ethers");
const fs = require("fs");
const path = require("path");

const WALLET_AMOUNT = process.argv[3] || 100;
const FILE_NAME = process.argv[2] || new Date().getTime();

function maker() {
  const mnemonic = bip39.generateMnemonic();
  const seed = ethers.Wallet.fromMnemonic(mnemonic);
  return {
    privateKey: seed.privateKey,
    publicKey: seed.publicKey,
    address: seed.address,
    mnemonic,
  };
}

let accounts = [];

for (let i = 0; i < WALLET_AMOUNT; i++) {
  accounts.push(maker());
}

fs.writeFileSync(
  path.resolve(__dirname, `./files/${FILE_NAME}.json`),
  JSON.stringify(accounts, null, 2),
  { encoding: "utf-8" }
);
