require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");

const { mnemonic } = require("./secretsManager");

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "mumbai",
  networks: {
    // rinkeby: {
    //   url: process.env.RINKBY_API_ENDPOINT,
    //   live: true,
    //   saveDeployments: true,
    // },
    mumbai: {
      chainId: 80001,
      url: "https://rpc-mumbai.maticvigil.com/v1",
      accounts: { mnemonic },
      // gasPrice: 1000000000,
      gas: 1000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      4: "0xA296a3d5F026953e17F472B497eC29a5631FB51B", // but for rinkeby it will be a specific address
      goerli: "0x84b9514E013710b9dD0811c9Fe46b837a4A0d8E0", //it can also specify a specific netwotk name (specified in hardhat.config.js)
    },
  },
};
