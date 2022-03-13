const { ethers } = require("hardhat");
const { TARGET_LONGSHORT_CONTRACT_ADDRESS } = require("../secretsManager");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const newLongShort = await deploy("LongShort", {
    from: deployer,
    gasLimit: 10000000,
    args: [],
  });
  console.log("deployed longShort");
  const { address } = newLongShort;

  const LongShortContractFactory = await ethers.getContractFactory("LongShort");

  const originalContract = LongShortContractFactory.attach(
    TARGET_LONGSHORT_CONTRACT_ADDRESS
  );
  console.log("Upgrading original");
  await originalContract.upgradeTo(address);
  console.log("Upgraded");
};
