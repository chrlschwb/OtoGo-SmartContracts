const { deployProxy } = require('@openzeppelin/truffle-upgrades');
const LaunchPool = artifacts.require("LaunchPool");
const LaunchToken = artifacts.require("LaunchToken");
const PoolFactory = artifacts.require("PoolFactory");
const web3 = require('web3');

module.exports = async function (deployer, network) {
  await deployer.deploy(LaunchPool);
  const poolInstance = await LaunchPool.deployed();
  await deployProxy(PoolFactory, [poolInstance.address], { deployer });
  if (network == 'development'){
    await deployer.deploy(LaunchToken, 'Test DAI', 'DAI', (10*(10**18)).toString());
    const tokenInstance = await LaunchToken.deployed();
    // await poolInstance.initialize(
    //   [tokenInstance.address],
    //   [web3.utils.toWei('100','ether'), web3.utils.toWei('5000000','ether'), parseInt(Date.now()*0.001) + 2, parseInt(Date.now()*0.001) + 1000],
    //   'Test Pool',
    //   'QmXE83PeG8xq8sT6GdeoYaAVVozAcJ4dN7xVCLuehDxVb1',
    // );
  }
};