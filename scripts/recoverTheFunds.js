const { ethers } = require("hardhat");
const { TARGET_LONGSHORT_CONTRACT_ADDRESS } = require("../secretsManager");

const recoverTheFunds = async () => {
  const LongShortContractFactory = await ethers.getContractFactory("LongShort");

  const targetContract = LongShortContractFactory.attach(
    TARGET_LONGSHORT_CONTRACT_ADDRESS
  );
  console.log("recovering the funds");
  await targetContract.recoverTheFunds();
  console.log("Successfully recovered");
};

recoverTheFunds()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
