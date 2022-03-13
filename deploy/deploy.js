module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  console.log(deployer);
  // the following will only deploy "GenericMetaTxProcessor" if the contract was never deployed or if the code changed since last deployment
  const testDeploy = await deploy("Greeter", {
    from: deployer,
    gasLimit: 4000000,
    args: ["Hi friend!"],
  });

  console.log(testDeploy);
};
