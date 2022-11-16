import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, get, read, log} = deployments;

  const {deployer} = await getNamedAccounts();

  const daoFactory = await get('DAOFactory');
  log('Reusing DAOFactory deployment:', daoFactory.address);
  const ensAddress = await read('APMRegistryFactory', {from: deployer}, 'ens');
  log('Using ENS:', ensAddress);
  const minimeFactory = await get('MiniMeTokenFactory');
  log('Reusing MiniMeTokenFactory deployment:', minimeFactory.address);
  const aragonID = await get('FIFSResolvingRegistrar');
  log('Reusing AragonID deployment:', aragonID.address);

  await deploy('BaseTemplate', {
    from: deployer,
    args: [
      daoFactory.address,
      ensAddress,
      minimeFactory.address,
      aragonID.address,
    ],
    log: true,
    deterministicDeployment: true,
  });
};

export default func;

func.tags = ['BaseTemplate'];

func.dependencies = ['MiniMeTokenFactory'];
