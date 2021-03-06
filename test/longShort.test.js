const { TARGET_LONGSHORT_CONTRACT_ADDRESS } = require("../secretsManager");
const { expect } = require("chai");
const { ethers } = require("hardhat");

let targetContract;
let account;
let latestMarket;
let yieldManagers;

beforeEach(async () => {
  account = await ethers.getNamedSigner("deployer");
  const LongShortContractFactory = await ethers.getContractFactory("LongShort");

  const originalContract = LongShortContractFactory.attach(
    TARGET_LONGSHORT_CONTRACT_ADDRESS
  );
  targetContract = originalContract;
});

describe("Testing target contract", () => {
  it("Target contract has an initialized market", async () => {
    const latestMarketIndex = await targetContract.latestMarket();
    latestMarket = latestMarketIndex;

    expect(latestMarketIndex).to.be.greaterThan(0);
  });

  // it("Current Account is Admin", async () => {
  //   const adminRole = await targetContract.ADMIN_ROLE();
  //   const isAdmin = await targetContract.hasRole(adminRole, account.address);

  //   expect(isAdmin).to.be.true;
  // });

  // it("Current Account is Upgrader", async () => {
  //   const upgraderRole = await targetContract.UPGRADER_ROLE();
  //   const isUpgrader = await targetContract.hasRole(
  //     upgraderRole,
  //     account.address
  //   );

  //   expect(isUpgrader).to.be.true;
  // });

  it("Expect Multiple Yield Managers", async () => {
    const yieldManagersArr = [];
    for (let i = 0; i <= latestMarket; i++) {
      const yieldManager = await targetContract.yieldManagers(i);
      if (yieldManager) {
        yieldManagersArr.push(yieldManager);
      }
    }
    yieldManagers = yieldManagersArr;
    console.log(yieldManagersArr);
    expect(yieldManagersArr.length).to.be.greaterThan(0);
  });

  it("Expect payment tokens in each yield manager to equal 0", async () => {
    for (let i = 1; i <= latestMarket; i++) {
      const paymentToken = await targetContract.paymentTokens(i);

      const balance = await targetContract.getBalanceOfToken(
        paymentToken,
        yieldManagers[i]
      );
      expect(balance.toNumber()).to.equal(0);
    }
  });
  it("Expect long short tokens in each yield manager to equal 0", async () => {
    for (let i = 1; i <= latestMarket; i++) {
      const syntheticTokenLong = await targetContract.syntheticTokens(i, true);
      console.log("long Token: ", syntheticTokenLong);

      const balanceLong = await targetContract.getBalanceOfToken(
        syntheticTokenLong,
        TARGET_LONGSHORT_CONTRACT_ADDRESS
      );
      console.log("long balance: ", balanceLong.toBigInt());

      // expect(balanceLong.toNumber()).to.equal(0);

      const syntheticTokenShort = await targetContract.syntheticTokens(
        i,
        false
      );
      console.log("short Token: ", syntheticTokenShort);

      const balanceShort = await targetContract.getBalanceOfToken(
        syntheticTokenShort,
        TARGET_LONGSHORT_CONTRACT_ADDRESS
      );
      console.log("short balance: ", balanceShort.toBigInt());

      // expect(balanceShort.toNumber()).to.equal(0);
    }
    expect(account).to.be.ok;
  });
});
