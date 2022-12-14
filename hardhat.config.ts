import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';

import '@nomiclabs/hardhat-ethers';
import '@tenderly/hardhat-tenderly';
import '@typechain/hardhat';
import 'hardhat-deploy';
import 'hardhat-deploy-tenderly';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

import {node_url, accounts} from './utils/network';

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.4.24',
        settings: {
          optimizer: {
            enabled: true,
            runs: 10000,
          },
        },
      },
    ],
  },
  namedAccounts: {
    deployer: 0,
    simpleERC20Beneficiary: 1,
  },
  networks: {
    hardhat: {
      // process.env.HARDHAT_FORK will specify the network that the fork is made from.
      // this line ensure the use of the corresponding accounts
      accounts: accounts(process.env.HARDHAT_FORK),
      forking: process.env.HARDHAT_FORK
        ? {
            url: node_url(process.env.HARDHAT_FORK),
            blockNumber: process.env.HARDHAT_FORK_NUMBER
              ? parseInt(process.env.HARDHAT_FORK_NUMBER)
              : undefined,
          }
        : undefined,
    },
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    production: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    mainnet: {
      url: node_url('mainnet'),
      accounts: accounts('mainnet'),
    },
    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },
    kovan: {
      url: node_url('kovan'),
      accounts: accounts('kovan'),
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
    },
    xdai: {
      url: node_url('xdai'),
      accounts: accounts('xdai'),
    },
    polygon: {
      url: node_url('polygon'),
      accounts: accounts('polygon'),
    },
    mumbai: {
      url: node_url('mumbai'),
      accounts: accounts('mumbai'),
    },
    arbtest: {
      url: node_url('arbtest'),
      accounts: accounts('arbtest'),
    },
    frame: {
      url: 'http://localhost:1248',
      httpHeaders: {origin: 'hardhat'},
      timeout: 0,
      gas: 0,
    },
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 0,
  },
  external: process.env.HARDHAT_FORK
    ? {
        deployments: {
          // process.env.HARDHAT_FORK will specify the network that the fork is made from.
          // these lines allow it to fetch the deployments from the network being forked from both for node and deploy task
          hardhat: ['deployments/' + process.env.HARDHAT_FORK],
          localhost: ['deployments/' + process.env.HARDHAT_FORK],
        },
      }
    : {
        contracts: [
          {
            artifacts: 'node_modules/@1hive/minime/artifacts',
          },
        ],
        deployments: {
          goerli: [
            'node_modules/@1hive/deployments-aragon-os/deployments/goerli',
          ],
          polygon: [
            'node_modules/@1hive/deployments-aragon-os/deployments/polygon',
          ],
          mumbai: [
            'node_modules/@1hive/deployments-aragon-os/deployments/mumbai',
          ],
          arbtest: [
            'node_modules/@1hive/deployments-aragon-os/deployments/arbtest',
          ],
        },
      },
};

export default config;
