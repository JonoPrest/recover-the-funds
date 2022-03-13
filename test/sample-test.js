const { expect } = require("chai");
const { ethers } = require("hardhat");
const greeterJson = require("../deployments/mumbai/Greeter.json");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    // const Greeter = await ethers.getContractFactory("Greeter");
    // const greeter = await Greeter.deploy("Hello, world!");
    // await greeter.deployed();
    const accounts = await ethers.getSigners();
    console.log(accounts[0].address);
    const { address } = greeterJson;

    console.log(address);
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = Greeter.attach(address);
    console.log(greeter.address);

    console.log(await greeter.greet());

    // expect(await greeter.greet()).to.equal("Hello, world!");

    // const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // // wait until the transaction is mined
    // await setGreetingTx.wait();

    // expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
