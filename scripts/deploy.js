// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const Greeter = await hre.ethers.getContractFactory("Greeter");
  // const greeter = await Greeter.deploy("yo");
  // await greeter.deployed();
  
  const Token = await hre.ethers.getContractFactory("Token");
  const token = await Token.deploy("DugCoin", "DUGC");
  
  console.log(`contract successfully deployed to ${token.address}`);
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
