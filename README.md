# Recover the funds!

My solution to a coding challenge for Float Capital

### Story

You are a malicious hacker! You were sitting in a co-working space and managed to look over the shoulder of a careless smart contract developer and copy down a 12 word key phrase that was showing on their screen - you quickly write this down.

You find out that this gives you admin/upgrader access to the `LongShort` contract of https//:float.capital on mumbai testnet. You hear that the payment token on mumbai testnet is worth a lot and want to get rich quick.

How do you implement this attack and drain all the funds?

### Details

We have deployed and upgraded multiple versions of our mumbai testnet smart contracts (the ones you can interact with [here](https://testnet.float.capital/)).

Our contracts use a proxy - implementation pattern for upgrade-ability, that means it is possible to upgrade the code in such a way that it allows us to grab the funds from these old testnet contracts.

We will give you (your ethereum address) upgrade permissions on the contracts so you can recover the funds.

You will need to upgrade the `LongShort` contract ([https://github.com/Float-Capital/contracts/blob/master/contracts/LongShort.sol](https://github.com/Float-Capital/contracts/blob/master/contracts/LongShort.sol)) with new code that will loop through all of yield managers ([https://github.com/Float-Capital/contracts/blob/master/contracts/YieldManagerAave.sol](https://github.com/Float-Capital/contracts/blob/master/contracts/YieldManagerAave.sol)) which are the contracts that hold the funds and withdraw the funds.

TLDR: get all of the funds out of the contract with the admin account that you sent us (we’ll make you an admin.

Things to note: 

- you can see the contracts and information on etherscan: [https://mumbai.polygonscan.com/address/0x51565F132c5B25BC9EA6e4D112ab6A680d553d2A#code](https://mumbai.polygonscan.com/address/0x51565F132c5B25BC9EA6e4D112ab6A680d553d2A#code)
- You can interact with the contracts via the “read as proxy” “write as proxy” tabs.
- The layout of your contract variables (the data of the contract) is crucial for upgradable contracts - do some research on proxy contracts and how they work (delegate call etc) (see resources below)
- You can use tools such as [remix](http://remix.ethereum.org/) (webbased IDE for writing and interacting with contracts) or you could use a established framework like [hardhat](http://hardhat.org/) or [truffle](https://trufflesuite.com/) (not recommended due to the setup complexity). Totally up to you. For something hacky and quick remix might be the easiest and quickest - you can copy all of the contracts from polygonscan (there are a lot due to inheritance...) into remix and interact with them from there.

Feel free to ask clarifications on this, but the task is intended as an exploration for you. There is no real value involved since it is on a testnet.

We will chat about it afterwards, we can discuss how you did it, what you could have done better, alternative approaches, clear up any outstanding confusion etc. We will probably ask you to repeat the process (with a different contract) during the interview, so make sure to save any code and remember your steps!

### Resources

- Learn basic solidity - [https://cryptozombies.io/](https://cryptozombies.io/)
- Learn how our code works - https://docs.float.capital/
- Learn basics of delegate call upgrade patterns - [https://fravoll.github.io/solidity-patterns/proxy_delegate.html](https://fravoll.github.io/solidity-patterns/proxy_delegate.html) , [https://blog.openzeppelin.com/proxy-patterns/](https://blog.openzeppelin.com/proxy-patterns/) , [https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies](https://docs.openzeppelin.com/upgrades-plugins/1.x/proxies)